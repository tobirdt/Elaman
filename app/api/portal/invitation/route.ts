import { NextResponse } from "next/server";

import { redeemInvitation } from "@/lib/auth/login";
import { requestContext } from "@/lib/auth/session";
import { describeError } from "@/lib/http/log";
import { checkRateLimit, clientKey } from "@/lib/http/rate-limit";
import type { PasswordProblem } from "@/lib/auth/policy";
import {
  isForbiddenOrigin,
  readJsonObject,
  readSecretField,
  readStringField,
} from "@/lib/http/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxRequestBytes = 4_000;

/**
 * Redeeming an invitation hashes a password, so it carries the same cost as a
 * sign-in and needs the same bound. Tighter, because this is something a
 * person does once: fifteen attempts in a quarter of an hour covers a few
 * mistyped codes and nothing else.
 */
const rateLimit = { windowMs: 15 * 60 * 1000, max: 15 } as const;

export type InvitationApiResponse =
  | { ok: true }
  | {
      ok: false;
      error: "weak_password" | "wrong_code" | "invalid_token" | "bad_request";
      problem?: PasswordProblem;
    };

function json(body: InvitationApiResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/**
 * Redeeming an invitation: the password and the first authenticator code, in
 * one request.
 *
 * Both together on purpose. An account that went active on the password alone
 * would be an account whose owner finds out at the next sign-in that their
 * app was never actually connected, and the only way out of that is an admin
 * issuing a new invitation.
 *
 * The confirmation field is checked in the browser rather than here: it exists
 * to catch a typo the person can see, and the server has no use for a second
 * copy of the same secret.
 */
export async function POST(request: Request) {
  if (isForbiddenOrigin(request)) {
    return json({ ok: false, error: "bad_request" }, 403);
  }

  const budget = checkRateLimit(clientKey(request, "portal-invitation"), rateLimit);

  if (budget.limited) {
    return NextResponse.json(
      { ok: false, error: "bad_request" } satisfies InvitationApiResponse,
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(budget.retryAfterSeconds),
        },
      },
    );
  }

  const body = await readJsonObject(request, maxRequestBytes);

  if (!body.ok) {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const token = readStringField(body.value, "token");
  const password = readSecretField(body.value, "password");
  const code = readSecretField(body.value, "code");

  if (!token) {
    return json({ ok: false, error: "invalid_token" }, 400);
  }

  try {
    const result = await redeemInvitation(token, password, code, requestContext(request));

    if (result.status === "redeemed") {
      return json({ ok: true }, 200);
    }

    if (result.status === "weak_password") {
      return json({ ok: false, error: "weak_password", problem: result.problem }, 400);
    }

    if (result.status === "wrong_code") {
      return json({ ok: false, error: "wrong_code" }, 400);
    }

    return json({ ok: false, error: "invalid_token" }, 410);
  } catch (error) {
    // Two people redeeming the same invitation at once: the loser is told the
    // link is spent, which is true.
    if (error instanceof Error && error.message === "invitation_already_redeemed") {
      return json({ ok: false, error: "invalid_token" }, 410);
    }

    console.error("Invitation redemption failed unexpectedly.", describeError(error));

    return json({ ok: false, error: "bad_request" }, 500);
  }
}
