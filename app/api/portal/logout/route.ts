import { NextResponse } from "next/server";

import { recordAudit } from "@/lib/auth/audit";
import {
  clearLoginChallenge,
  currentSession,
  destroySession,
  requestContext,
} from "@/lib/auth/session";
import { isForbiddenOrigin } from "@/lib/http/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Signing out. POST rather than GET, so a link on someone else's page cannot
 * sign a visitor out by being loaded, and no body at all: there is nothing to
 * say beyond the cookie already attached.
 *
 * The pending challenge is cleared too. Someone who abandons a half-finished
 * sign-in and then signs out of another tab should not leave a live challenge
 * behind.
 */
export async function POST(request: Request) {
  if (isForbiddenOrigin(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const session = await currentSession();

  await destroySession();
  await clearLoginChallenge();

  if (session) {
    await recordAudit({
      action: "logout",
      actorUserId: session.user.id,
      actorEmail: session.user.email,
      ip: requestContext(request).ip,
    });
  }

  // Always ok: a caller with no session is in exactly the state they asked to
  // be in, and saying so differently would be noise.
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
