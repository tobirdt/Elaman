import { hashPassword, hashToken, needsRehash, verifyPassword } from "@/lib/auth/crypto";
import {
  lockoutFor,
  pruneExpired,
  recordAudit,
  recordLoginAttempt,
} from "@/lib/auth/audit";
import {
  checkPassword,
  isWellFormedTotpCode,
  normalizeTotpCode,
  type PasswordProblem,
} from "@/lib/auth/policy";
import {
  clearLoginChallenge,
  consumeLoginChallenge,
  createLoginChallenge,
  createSession,
  destroyAllSessions,
  pendingChallenge,
  recordChallengeFailure,
  type RequestContext,
} from "@/lib/auth/session";
import { generateTotpSecret, totpUri, verifyTotp } from "@/lib/auth/totp";
import { query, queryOne, transaction } from "@/lib/db/client";

/**
 * The two halves of signing in, and the redemption of an invitation.
 *
 * Nothing here tells a caller whether an account exists. Every refusal on the
 * first step answers the same way, and the work done is the same either way,
 * so neither the message nor the timing distinguishes an unknown address from
 * a wrong password. The portal's users are named on invoices; confirming who
 * has an account is itself worth withholding.
 */

/**
 * Cost-matched decoy so an unknown address takes as long as a known one.
 *
 * The lengths are spelled as `repeat` rather than as a literal run of letters
 * because they have to be exact: `verifyPassword` derives scrypt's key length
 * from the stored key, so a decoy a few characters off would hash a different
 * amount of work than a real hash and reintroduce the timing difference it
 * exists to remove. 22 base64url characters are 16 bytes of salt, 86 are the
 * 64-byte key.
 */
const decoyHash = `scrypt$65536$8$1$${"A".repeat(22)}$${"A".repeat(86)}`;

export type BeginLoginResult =
  | { status: "challenge" }
  | { status: "rejected" }
  | { status: "locked"; retryAt: Date | null };

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
  status: string;
  password_hash: string | null;
  totp_secret: string | null;
  totp_enrolled_at: Date | null;
  totp_last_step: string | null;
};

/**
 * Step one: the password. On success this opens a challenge rather than a
 * session — the account is not signed in until the authenticator has answered
 * too, and there is no state in between that any other code could mistake for
 * a session.
 */
export async function beginLogin(
  email: string,
  password: string,
  context: RequestContext,
): Promise<BeginLoginResult> {
  const trimmed = email.trim();
  const lock = await lockoutFor(trimmed);

  if (lock.locked) {
    await recordAudit({
      action: "login.locked_out",
      actorEmail: trimmed,
      ip: context.ip,
      detail: { failures: lock.failures },
    });

    return { status: "locked", retryAt: lock.retryAt };
  }

  const user = await queryOne<UserRow>(
    `select id, email, name, role, status, password_hash,
            totp_secret, totp_enrolled_at, totp_last_step
       from users
      where lower(email) = lower($1)`,
    [trimmed],
  );

  // The decoy keeps the failure path as expensive as the success path. Without
  // it, an unknown address would answer in a millisecond and a known one in
  // half a second, which is a reliable account-existence oracle.
  const stored = user?.password_hash ?? decoyHash;
  const passwordMatches = await verifyPassword(password, stored);

  const usable =
    user !== null &&
    user.status === "active" &&
    user.password_hash !== null &&
    user.totp_secret !== null &&
    user.totp_enrolled_at !== null;

  if (!usable || !passwordMatches) {
    await recordLoginAttempt(trimmed, false, context.ip);
    await recordAudit({
      action: !user
        ? "login.unknown_account"
        : user.status !== "active"
          ? "login.inactive_account"
          : "login.password_rejected",
      actorUserId: user?.id ?? null,
      actorEmail: trimmed,
      ip: context.ip,
    });

    return { status: "rejected" };
  }

  // Raising the scrypt cost later leaves old hashes verifying; this is where
  // they are quietly brought up to date, while the correct password is in hand.
  if (needsRehash(stored)) {
    await query("update users set password_hash = $2, updated_at = now() where id = $1", [
      user.id,
      await hashPassword(password),
    ]);
  }

  await createLoginChallenge(user.id, context);

  return { status: "challenge" };
}

export type CompleteLoginResult =
  | { status: "signed_in"; role: "admin" | "customer" }
  | { status: "rejected" }
  | { status: "locked"; retryAt: Date | null }
  /**
   * The code is right but was already spent — the ordinary case for someone
   * who just enrolled their authenticator and signed in within the same
   * thirty seconds. The challenge is left standing so they can simply enter
   * the next code.
   */
  | { status: "code_used" }
  | { status: "no_challenge" };

/**
 * Step two: the authenticator code.
 *
 * Three separate bounds, because the time limit is not one. Two minutes is
 * thousands of requests, and a six-digit code inside a three-step window falls
 * to roughly one guess in 333,000 — so a challenge that accepted unlimited
 * guesses would hand the whole second factor to anyone who already had the
 * password. That was the state this code was in, and the comment here used to
 * claim a lockout it never consulted.
 *
 * Now: the account lockout is read before anything is compared, five wrong
 * codes end the challenge, and the route in front of this carries a request
 * budget. A code that is right but already spent is exempt from the count —
 * that is the ordinary case for someone who just enrolled, not a guess.
 */
export async function completeLogin(
  code: string,
  context: RequestContext,
): Promise<CompleteLoginResult> {
  const challenge = await pendingChallenge();

  if (!challenge) {
    return { status: "no_challenge" };
  }

  const user = await queryOne<UserRow>(
    `select id, email, name, role, status, password_hash,
            totp_secret, totp_enrolled_at, totp_last_step
       from users
      where id = $1`,
    [challenge.userId],
  );

  if (!user || user.status !== "active" || !user.totp_secret) {
    await clearLoginChallenge();
    return { status: "rejected" };
  }

  // Read, not merely written to. The failures recorded below feed this, and
  // without the read they fed nothing.
  const lock = await lockoutFor(user.email);

  if (lock.locked) {
    await clearLoginChallenge();
    await recordAudit({
      action: "login.locked_out",
      actorUserId: user.id,
      actorEmail: user.email,
      ip: context.ip,
      detail: { failures: lock.failures, step: "totp" },
    });

    return { status: "locked", retryAt: lock.retryAt };
  }

  if (!isWellFormedTotpCode(code)) {
    await recordLoginAttempt(user.email, false, context.ip);
    await recordChallengeFailure(challenge.id);
    await recordAudit({
      action: "login.totp_rejected",
      actorUserId: user.id,
      actorEmail: user.email,
      ip: context.ip,
      detail: { reason: "malformed" },
    });

    return { status: "rejected" };
  }

  const verification = verifyTotp(user.totp_secret, normalizeTotpCode(code), {
    lastUsedStep: user.totp_last_step === null ? null : BigInt(user.totp_last_step),
  });

  if (!verification.valid) {
    await recordLoginAttempt(user.email, false, context.ip);
    await recordAudit({
      action: "login.totp_rejected",
      actorUserId: user.id,
      actorEmail: user.email,
      ip: context.ip,
      detail: { reason: verification.reason },
    });

    // A spent code is not a guess: it is what someone who enrolled thirty
    // seconds ago types. It costs the challenge nothing.
    if (verification.reason === "replayed") {
      return { status: "code_used" };
    }

    await recordChallengeFailure(challenge.id);

    return { status: "rejected" };
  }

  // Consumed before the session is created: if two requests arrive with the
  // same challenge and the same valid code, only one of them gets a session.
  if (!(await consumeLoginChallenge(challenge.id))) {
    return { status: "rejected" };
  }

  await query(
    `update users
        set totp_last_step = $2, last_login_at = now(), updated_at = now()
      where id = $1`,
    [user.id, verification.step.toString()],
  );

  await createSession(user.id, context);
  await recordLoginAttempt(user.email, true, context.ip);
  await recordAudit({
    action: "login.succeeded",
    actorUserId: user.id,
    actorEmail: user.email,
    ip: context.ip,
  });
  await pruneExpired();

  return { status: "signed_in", role: user.role };
}

export type InvitationView = {
  userId: string;
  email: string;
  name: string;
  /** The `otpauth://` URI the authenticator reads from the QR code. */
  totpUri: string;
  /** Shown as text as well, for anyone typing it into a desktop app. */
  totpSecret: string;
};

/**
 * Looks up an invitation and makes sure the account has a secret to enrol.
 *
 * The secret is written on this first look rather than at submit, so the code
 * the person types is checked against the same secret their app scanned. It is
 * stored with `totp_enrolled_at` still null, which the schema treats as "not
 * yet a working credential": the account cannot become active on it until the
 * code has been proven.
 */
export async function openInvitation(token: string): Promise<InvitationView | null> {
  const row = await queryOne<{
    user_id: string;
    email: string;
    name: string;
    totp_secret: string | null;
    status: string;
  }>(
    `select i.user_id, u.email, u.name, u.totp_secret, u.status
       from invitations i
       join users u on u.id = i.user_id
      where i.token_hash = $1
        and i.redeemed_at is null
        and i.expires_at > now()`,
    [hashToken(token)],
  );

  // An active account is never re-openable through an invitation link. No
  // code here can produce that state today — the seeding script refuses it —
  // but the day an admin screen issues invitations, this is the difference
  // between "resend the welcome mail" and "hand over a working account
  // together with its authenticator secret".
  if (!row || row.status !== "invited") {
    return null;
  }

  let secret = row.totp_secret;

  if (!secret) {
    secret = generateTotpSecret();
    await query(
      "update users set totp_secret = $2, updated_at = now() where id = $1 and totp_secret is null",
      [row.user_id, secret],
    );
    // Re-read rather than trust the update: a second tab may have written a
    // different secret first, and the person's app scanned only one of them.
    const stored = await queryOne<{ totp_secret: string | null }>(
      "select totp_secret from users where id = $1",
      [row.user_id],
    );
    secret = stored?.totp_secret ?? secret;
  }

  return {
    userId: row.user_id,
    email: row.email,
    name: row.name,
    totpSecret: secret,
    totpUri: totpUri(secret, row.email),
  };
}

export type RedeemResult =
  | { status: "redeemed" }
  | { status: "invalid_token" }
  | { status: "weak_password"; problem: PasswordProblem }
  | { status: "wrong_code" };

/**
 * Sets the password and completes the enrolment, in one transaction.
 *
 * The code is required: proving the authenticator works before the account
 * goes active is the whole point of enrolling it here, and an account that
 * went active without it would be an account whose owner discovers at the next
 * sign-in that they cannot get in.
 */
export async function redeemInvitation(
  token: string,
  password: string,
  code: string,
  context: RequestContext,
): Promise<RedeemResult> {
  const invitation = await openInvitation(token);

  if (!invitation) {
    await recordAudit({
      action: "invitation.rejected",
      ip: context.ip,
      detail: { reason: "unknown_or_expired" },
    });

    return { status: "invalid_token" };
  }

  const problem = checkPassword(password, {
    email: invitation.email,
    name: invitation.name,
  });

  if (problem) {
    return { status: "weak_password", problem };
  }

  if (!isWellFormedTotpCode(code)) {
    return { status: "wrong_code" };
  }

  const verification = verifyTotp(invitation.totpSecret, normalizeTotpCode(code));

  if (!verification.valid) {
    await recordAudit({
      action: "invitation.rejected",
      actorUserId: invitation.userId,
      actorEmail: invitation.email,
      ip: context.ip,
      detail: { reason: "wrong_code" },
    });

    return { status: "wrong_code" };
  }

  const passwordHash = await hashPassword(password);

  await transaction(async (client) => {
    const redeemed = await client.query(
      `update invitations
          set redeemed_at = now()
        where token_hash = $1 and redeemed_at is null and expires_at > now()
        returning id`,
      [hashToken(token)],
    );

    // Someone else redeemed it between the look-up and here.
    if (redeemed.rows.length !== 1) {
      throw new Error("invitation_already_redeemed");
    }

    await client.query(
      `update users
          set password_hash = $2,
              totp_enrolled_at = now(),
              totp_last_step = $3,
              status = 'active',
              updated_at = now()
        where id = $1`,
      [invitation.userId, passwordHash, verification.step.toString()],
    );
  });

  // A redeemed invitation is a new credential; anything signed in on the old
  // state should not stay signed in.
  await destroyAllSessions(invitation.userId);

  await recordAudit({
    action: "invitation.redeemed",
    actorUserId: invitation.userId,
    actorEmail: invitation.email,
    ip: context.ip,
  });
  await recordAudit({
    action: "totp.enrolled",
    actorUserId: invitation.userId,
    actorEmail: invitation.email,
    ip: context.ip,
  });

  return { status: "redeemed" };
}
