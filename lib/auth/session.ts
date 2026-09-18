import { cookies } from "next/headers";

import { generateToken, hashToken } from "@/lib/auth/crypto";
import {
  judgeSession,
  loginChallengeLifetimeMs,
  maxChallengeAttempts,
  sessionLifetime,
  shouldTouchSession,
} from "@/lib/auth/policy";
import { query, queryOne, transaction } from "@/lib/db/client";

/**
 * Sessions, and the short-lived challenge that sits between the password and
 * the authenticator code.
 *
 * The browser only ever holds random bytes. What the database holds is their
 * SHA-256, so a copy of the session table cannot be replayed: there is nothing
 * in it anyone could present. The same discipline covers invitations and
 * challenges.
 */

/**
 * One name for both reading and writing, so the two cannot drift apart.
 *
 * Not the `__Host-` prefix, which would be a little stronger but has to be
 * spelled differently over plain HTTP, and a cookie whose name depends on the
 * environment is a cookie that works in development and vanishes in
 * production. The prefix defends against a cookie planted from a sibling
 * subdomain; that requires already controlling one, which is a larger
 * compromise than this would contain.
 */
export const sessionCookieName = "elaman_session";
export const challengeCookieName = "elaman_login_challenge";

export type PortalRole = "admin" | "customer";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: PortalRole;
  companyId: string | null;
  companyName: string | null;
};

export type ActiveSession = {
  id: string;
  user: SessionUser;
  createdAt: Date;
  expiresAt: Date;
};

type SessionRow = {
  session_id: string;
  created_at: Date;
  last_seen_at: Date;
  expires_at: Date;
  user_id: string;
  email: string;
  name: string;
  role: PortalRole;
  company_id: string | null;
  company_name: string | null;
  status: string;
};

/**
 * Cookie attributes. `Secure` is off only where the browser would refuse the
 * cookie outright, which is plain HTTP on localhost during development.
 *
 * `SameSite=Lax` rather than `Strict`: Lax already withholds the cookie from
 * cross-site POST requests, which is the CSRF case, while Strict would also
 * withhold it when someone follows an ordinary link into the portal and would
 * show them a signed-out page they have to click through twice.
 */
function cookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export type RequestContext = {
  ip: string | null;
  userAgent: string | null;
};

/**
 * On Vercel the client address arrives in `x-forwarded-for`, left-most entry.
 * Stored for the audit trail only; nothing is authorised by it.
 */
export function requestContext(request: Request): RequestContext {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return {
    ip: forwarded || request.headers.get("x-real-ip") || null,
    userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
  };
}

/**
 * Starts a signed-in session. Only ever called once both factors have been
 * proven, and it returns the raw token exactly once — it is never stored and
 * cannot be recovered afterwards.
 */
export async function createSession(
  userId: string,
  context: RequestContext,
): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + sessionLifetime.absoluteMs);

  await query(
    `insert into sessions (user_id, token_hash, expires_at, ip, user_agent)
     values ($1, $2, $3, $4, $5)`,
    [userId, hashToken(token), expiresAt, context.ip, context.userAgent],
  );

  const store = await cookies();
  store.set(
    sessionCookieName,
    token,
    cookieOptions(Math.floor(sessionLifetime.absoluteMs / 1000)),
  );

  return token;
}

/**
 * Resolves the session cookie to a user, or to null.
 *
 * A row that fails either lifetime limit is deleted rather than merely
 * ignored, so an abandoned session does not sit in the table until someone
 * runs a cleanup. The session of a user who has since been disabled goes the
 * same way — this one, on its next use; the others when they are next used,
 * because each is checked here on every request.
 */
export async function currentSession(): Promise<ActiveSession | null> {
  const store = await cookies();
  const token = store.get(sessionCookieName)?.value;

  if (!token) {
    return null;
  }

  const tokenHash = hashToken(token);
  const row = await queryOne<SessionRow>(
    `select s.id as session_id, s.created_at, s.last_seen_at, s.expires_at,
            u.id as user_id, u.email, u.name, u.role, u.company_id, u.status,
            c.name as company_name
       from sessions s
       join users u on u.id = s.user_id
       left join companies c on c.id = u.company_id
      where s.token_hash = $1`,
    [tokenHash],
  );

  if (!row) {
    return null;
  }

  const now = new Date();
  const verdict = judgeSession(
    {
      createdAt: row.created_at,
      lastSeenAt: row.last_seen_at,
      expiresAt: row.expires_at,
    },
    now,
  );

  if (verdict !== "valid" || row.status !== "active") {
    await query("delete from sessions where token_hash = $1", [tokenHash]);
    return null;
  }

  if (shouldTouchSession(row.last_seen_at, now)) {
    await query("update sessions set last_seen_at = $2 where token_hash = $1", [
      tokenHash,
      now,
    ]);
  }

  return {
    id: row.session_id,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
    user: {
      id: row.user_id,
      email: row.email,
      name: row.name,
      role: row.role,
      companyId: row.company_id,
      companyName: row.company_name,
    },
  };
}

/**
 * Signs out. Deletes the row, so the cookie cannot be replayed afterwards.
 *
 * The cookie is cleared in a `finally`: if the delete fails, the caller is
 * still shown a signed-out page, and leaving them holding a live cookie while
 * telling them they are signed out is the one outcome worth ruling out. The
 * row then ages out on its own limits.
 */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(sessionCookieName)?.value;

  try {
    if (token) {
      await query("delete from sessions where token_hash = $1", [hashToken(token)]);
    }
  } finally {
    store.delete(sessionCookieName);
  }
}

/**
 * Every session of one user. Used when a password changes and when an account
 * is disabled: the new credential should not leave the old sessions standing.
 */
export async function destroyAllSessions(userId: string): Promise<number> {
  const rows = await query<{ id: string }>(
    "delete from sessions where user_id = $1 returning id",
    [userId],
  );

  return rows.length;
}

export type PendingChallenge = {
  id: string;
  userId: string;
  /** Wrong codes this challenge has already absorbed. */
  attempts: number;
};

/**
 * Records that a password was accepted, and hands the browser a token for the
 * second step. Any earlier challenge for the same user is dropped first, so a
 * person who restarts the login does not leave a usable one behind.
 */
export async function createLoginChallenge(
  userId: string,
  context: RequestContext,
): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + loginChallengeLifetimeMs);

  await transaction(async (client) => {
    await client.query(
      "delete from login_challenges where user_id = $1 and consumed_at is null",
      [userId],
    );
    await client.query(
      `insert into login_challenges (user_id, token_hash, expires_at, ip, user_agent)
       values ($1, $2, $3, $4, $5)`,
      [userId, hashToken(token), expiresAt, context.ip, context.userAgent],
    );
  });

  const store = await cookies();
  store.set(
    challengeCookieName,
    token,
    cookieOptions(Math.floor(loginChallengeLifetimeMs / 1000)),
  );

  return token;
}

/**
 * Reads the pending challenge without consuming it. An expired or already
 * consumed row resolves to null, and a wrong code therefore cannot be retried
 * against a stale challenge.
 */
export async function pendingChallenge(): Promise<PendingChallenge | null> {
  const store = await cookies();
  const token = store.get(challengeCookieName)?.value;

  if (!token) {
    return null;
  }

  const row = await queryOne<{ id: string; user_id: string; attempts: number }>(
    `select id, user_id, attempts
       from login_challenges
      where token_hash = $1
        and consumed_at is null
        and expires_at > now()`,
    [hashToken(token)],
  );

  return row ? { id: row.id, userId: row.user_id, attempts: row.attempts } : null;
}

/**
 * Counts a wrong code against the challenge, and says whether that was the
 * last one it will take.
 *
 * The increment is done in SQL rather than read-modify-write, so guesses fired
 * in parallel all count — which is exactly the case this exists for.
 */
export async function recordChallengeFailure(id: string): Promise<boolean> {
  const rows = await query<{ attempts: number }>(
    `update login_challenges
        set attempts = attempts + 1
      where id = $1 and consumed_at is null
      returning attempts`,
    [id],
  );

  const attempts = rows[0]?.attempts ?? maxChallengeAttempts;

  if (attempts >= maxChallengeAttempts) {
    await query("delete from login_challenges where id = $1", [id]);
    const store = await cookies();
    store.delete(challengeCookieName);

    return true;
  }

  return false;
}

/**
 * Marks the challenge used and clears the cookie. Called once the code has
 * been accepted; the update is conditional, so two requests racing the same
 * challenge cannot both win.
 */
export async function consumeLoginChallenge(id: string): Promise<boolean> {
  const rows = await query<{ id: string }>(
    `update login_challenges
        set consumed_at = now()
      where id = $1 and consumed_at is null and expires_at > now()
      returning id`,
    [id],
  );

  const store = await cookies();
  store.delete(challengeCookieName);

  return rows.length === 1;
}

export async function clearLoginChallenge(): Promise<void> {
  const store = await cookies();
  const token = store.get(challengeCookieName)?.value;

  if (token) {
    await query(
      "delete from login_challenges where token_hash = $1 and consumed_at is null",
      [hashToken(token)],
    );
  }

  store.delete(challengeCookieName);
}
