import { NextResponse } from "next/server";

import { beginLogin } from "@/lib/auth/login";
import { isValidPortalEmail } from "@/lib/auth/policy";
import { requestContext } from "@/lib/auth/session";
import {
  isForbiddenOrigin,
  readJsonObject,
  readSecretField,
  readStringField,
} from "@/lib/http/request";

export const runtime = "nodejs";
/** Reads cookies and the database; nothing here may be cached or prerendered. */
export const dynamic = "force-dynamic";

const maxRequestBytes = 4_000;

export type LoginApiResponse =
  | { ok: true; next: "code" }
  | {
      ok: false;
      error: "invalid_email" | "missing_password" | "rejected" | "locked" | "bad_request";
    };

function json(body: LoginApiResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/**
 * Step one of signing in: the password.
 *
 * A correct password does not produce a session here, only a two-minute
 * challenge. Every refusal answers `rejected` with the same status, whether
 * the address is unknown, the password is wrong or the account is not active —
 * the endpoint is not an account-existence oracle.
 */
export async function POST(request: Request) {
  if (isForbiddenOrigin(request)) {
    return json({ ok: false, error: "bad_request" }, 403);
  }

  const body = await readJsonObject(request, maxRequestBytes);

  if (!body.ok) {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const email = readStringField(body.value, "email");
  const password = readSecretField(body.value, "password");

  if (!isValidPortalEmail(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  if (password.length === 0) {
    return json({ ok: false, error: "missing_password" }, 400);
  }

  try {
    const result = await beginLogin(email, password, requestContext(request));

    if (result.status === "challenge") {
      return json({ ok: true, next: "code" }, 200);
    }

    if (result.status === "locked") {
      // 429 rather than 403: this is "not now", not "not ever".
      return json({ ok: false, error: "locked" }, 429);
    }

    return json({ ok: false, error: "rejected" }, 401);
  } catch (error) {
    console.error("Portal sign-in failed unexpectedly.", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return json({ ok: false, error: "bad_request" }, 500);
  }
}
