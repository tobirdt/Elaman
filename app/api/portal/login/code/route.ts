import { NextResponse } from "next/server";

import { completeLogin } from "@/lib/auth/login";
import { requestContext } from "@/lib/auth/session";
import { isForbiddenOrigin, readJsonObject, readSecretField } from "@/lib/http/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxRequestBytes = 1_000;

export type LoginCodeApiResponse =
  | { ok: true; role: "admin" | "customer" }
  | { ok: false; error: "rejected" | "code_used" | "no_challenge" | "bad_request" };

function json(body: LoginCodeApiResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/**
 * Step two: the authenticator code, against the challenge opened by step one.
 *
 * `no_challenge` is a separate answer from `rejected` because it means
 * something different to the person in front of the form — the two minutes ran
 * out and they need to start over — and it reveals nothing: anyone who reaches
 * this endpoint already knows whether they submitted a password.
 */
export async function POST(request: Request) {
  if (isForbiddenOrigin(request)) {
    return json({ ok: false, error: "bad_request" }, 403);
  }

  const body = await readJsonObject(request, maxRequestBytes);

  if (!body.ok) {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  try {
    const result = await completeLogin(
      readSecretField(body.value, "code"),
      requestContext(request),
    );

    if (result.status === "signed_in") {
      return json({ ok: true, role: result.role }, 200);
    }

    if (result.status === "no_challenge") {
      return json({ ok: false, error: "no_challenge" }, 409);
    }

    if (result.status === "code_used") {
      return json({ ok: false, error: "code_used" }, 401);
    }

    return json({ ok: false, error: "rejected" }, 401);
  } catch (error) {
    console.error("Portal code check failed unexpectedly.", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return json({ ok: false, error: "bad_request" }, 500);
  }
}
