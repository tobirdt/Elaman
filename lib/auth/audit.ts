import { evaluateLockout, type LockoutState } from "@/lib/auth/policy";
import { lockout } from "@/lib/auth/policy";
import { query } from "@/lib/db/client";
import { describeError } from "@/lib/http/log";

/**
 * The record of who did what, and the counter that feeds the lockout.
 *
 * Two tables rather than one because they are asked different questions. The
 * audit log is read rarely, by a person, and is kept; the attempt counter is
 * read on every sign-in and is noise a week later.
 */

/**
 * A closed set rather than free text. An audit log whose actions are spelled
 * slightly differently in three places cannot be filtered, and a log nobody
 * can filter is a log nobody reads.
 */
export type AuditAction =
  | "login.succeeded"
  | "login.password_rejected"
  | "login.totp_rejected"
  | "login.locked_out"
  | "login.unknown_account"
  | "login.inactive_account"
  | "logout"
  | "invitation.redeemed"
  | "invitation.rejected"
  | "password.changed"
  | "totp.enrolled";

export type AuditEntry = {
  action: AuditAction;
  /** Null when the actor is not yet known, as on a failed sign-in. */
  actorUserId?: string | null;
  /**
   * Kept alongside the id because the id is set to null if the account is
   * later deleted, and an entry that no longer says who it was about is not
   * much of a record.
   */
  actorEmail?: string | null;
  subjectType?: string | null;
  subjectId?: string | null;
  ip?: string | null;
  detail?: Record<string, unknown> | null;
};

/**
 * Writing the audit entry must never be the reason a request fails: refusing a
 * correct sign-in because a log insert failed would turn a bookkeeping problem
 * into an outage. It is logged loudly instead.
 */
export async function recordAudit(entry: AuditEntry): Promise<void> {
  try {
    await query(
      `insert into audit_log
         (action, actor_user_id, actor_email, subject_type, subject_id, ip, detail)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [
        entry.action,
        entry.actorUserId ?? null,
        entry.actorEmail ?? null,
        entry.subjectType ?? null,
        entry.subjectId ?? null,
        entry.ip ?? null,
        entry.detail ? JSON.stringify(entry.detail) : null,
      ],
    );
  } catch (error) {
    console.error("Audit entry could not be written.", {
      action: entry.action,
      ...describeError(error),
    });
  }
}

export async function recordLoginAttempt(
  email: string,
  success: boolean,
  ip: string | null,
): Promise<void> {
  await query("insert into login_attempts (email, success, ip) values ($1, $2, $3)", [
    email.trim().toLowerCase(),
    success,
    ip,
  ]);
}

/**
 * The attempts inside the window, newest first, capped. The cap is a guard
 * against a single address being hammered into a query that returns tens of
 * thousands of rows; it is far above the threshold, so it cannot change the
 * verdict.
 */
export async function lockoutFor(email: string): Promise<LockoutState> {
  const rows = await query<{ at: Date; success: boolean }>(
    `select at, success
       from login_attempts
      where lower(email) = lower($1)
        and at > now() - ($2::bigint * interval '1 millisecond')
      order by at desc
      limit 200`,
    [email.trim(), lockout.windowMs],
  );

  return evaluateLockout(rows, new Date());
}

/**
 * Housekeeping, on sign-in rather than from a scheduler: one delete is not
 * worth another moving part.
 *
 * Two kinds of row age out. Login attempts are only interesting inside the
 * lockout window. Expired sessions are deleted when they are next presented,
 * but a session nobody ever comes back to — a closed laptop, a browser whose
 * cookies were cleared — is never presented again and would otherwise sit in
 * the table indefinitely.
 *
 * Failure is logged, never raised: this runs after a correct sign-in, and
 * refusing one over a housekeeping delete would be absurd.
 */
export async function pruneExpired(): Promise<void> {
  try {
    await query("delete from login_attempts where at < now() - interval '1 day'");
    await query("delete from sessions where expires_at < now()");
    await query(
      "delete from login_challenges where expires_at < now() - interval '1 hour'",
    );
  } catch (error) {
    console.error("Pruning failed.", describeError(error));
  }
}
