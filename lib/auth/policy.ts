import { isValidContactEmail } from "@/lib/validation/contact";

/**
 * The rules that decide whether a credential is acceptable and whether an
 * account may try again. Everything here is a pure function of its arguments,
 * so it is tested directly rather than through a database.
 */

/**
 * Twelve characters, no composition rules.
 *
 * NIST SP 800-63B (revision 3, § 5.1.1.2, June 2017 with the 2020 errata) is
 * explicit that forced mixtures of classes should not be imposed and that
 * length is what matters, so there is no "one capital and one digit" here. It
 * also asks for a check against known-breached passwords, which needs a list
 * we do not have offline; that is a gap, and it is a deliberate one rather
 * than an oversight. The mandatory second factor is what covers it: a guessed
 * password alone opens nothing.
 *
 * The maximum exists only to bound the work scrypt is asked to do. 128 is far
 * above any passphrase someone will type and far below anything that could be
 * used to make hashing expensive on purpose.
 */
export const passwordLength = { min: 12, max: 128 } as const;

/** Six digits, the length the enrolled authenticators produce. */
export const totpCodeLength = 6;

export type PasswordProblem =
  "too_short" | "too_long" | "whitespace_only" | "contains_identity";

/**
 * Passwords are compared and stored NFKC-normalised, so they are measured that
 * way too. Without this, the same passphrase typed on two keyboards could pass
 * the length check on one and fail it on the other.
 */
export function normalizePassword(password: string): string {
  return password.normalize("NFKC");
}

/**
 * `identity` is the person's own email and name. A password that contains
 * either is guessable by anyone who knows who the account belongs to, which in
 * a portal whose users are named on invoices is everyone.
 */
export function checkPassword(
  password: string,
  identity: { email?: string; name?: string } = {},
): PasswordProblem | null {
  const normalized = normalizePassword(password);

  // Measured in code points, not UTF-16 units: an emoji or a CJK character is
  // one character to the person typing it, and `.length` would count some of
  // them twice.
  const characters = [...normalized].length;

  if (characters < passwordLength.min) {
    return "too_short";
  }

  if (characters > passwordLength.max) {
    return "too_long";
  }

  if (normalized.trim().length === 0) {
    return "whitespace_only";
  }

  const haystack = normalized.toLowerCase();
  const needles = [identity.email?.split("@")[0], identity.email, identity.name]
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim().toLowerCase())
    // Three characters would match inside almost any passphrase; only a
    // fragment long enough to be a real giveaway counts.
    .filter((value) => value.length >= 4);

  if (needles.some((needle) => haystack.includes(needle))) {
    return "contains_identity";
  }

  return null;
}

/** An email we are willing to store as a login. */
export function isValidPortalEmail(value: string): boolean {
  return isValidContactEmail(value) && value.trim().length <= 254;
}

/**
 * Digits only, spaces tolerated because authenticator apps display the code in
 * two groups of three and people copy it that way.
 */
export function normalizeTotpCode(value: string): string {
  return value.replace(/[\s-]/g, "");
}

export function isWellFormedTotpCode(value: string): boolean {
  const code = normalizeTotpCode(value);

  return code.length === totpCodeLength && /^\d+$/.test(code);
}

/**
 * How long a signed-in session lives.
 *
 * Two limits, because they answer different questions. The absolute one bounds
 * how long a stolen cookie is worth anything. The idle one bounds how long an
 * unattended screen stays signed in — the likelier risk in an office.
 */
export const sessionLifetime = {
  absoluteMs: 8 * 60 * 60 * 1000,
  idleMs: 60 * 60 * 1000,
} as const;

/** Two minutes to read six digits off a phone and type them. */
export const loginChallengeLifetimeMs = 2 * 60 * 1000;

/** An invitation is valid for a week; after that an admin issues a new one. */
export const invitationLifetimeMs = 7 * 24 * 60 * 60 * 1000;

export type SessionTiming = {
  createdAt: Date;
  lastSeenAt: Date;
  expiresAt: Date;
};

export type SessionVerdict = "valid" | "expired" | "idle_timeout";

/**
 * Decided here rather than in SQL so both limits are visible in one place and
 * can be tested at their boundaries. `expiresAt` is what the row carries;
 * the idle limit is measured against `lastSeenAt`, which every request
 * refreshes.
 */
export function judgeSession(timing: SessionTiming, now: Date): SessionVerdict {
  if (now.getTime() >= timing.expiresAt.getTime()) {
    return "expired";
  }

  if (now.getTime() - timing.lastSeenAt.getTime() >= sessionLifetime.idleMs) {
    return "idle_timeout";
  }

  return "valid";
}

/**
 * `last_seen_at` is only written when it has drifted by more than this, so an
 * active session does not cause a write on every single request. One minute of
 * imprecision against a one-hour idle limit is not worth the row churn.
 */
export const sessionTouchIntervalMs = 60 * 1000;

export function shouldTouchSession(lastSeenAt: Date, now: Date): boolean {
  return now.getTime() - lastSeenAt.getTime() >= sessionTouchIntervalMs;
}

/**
 * The lockout.
 *
 * Counted per email over a rolling window, and deliberately not per IP: the
 * customers are firms, so a whole company can share one address, and locking
 * by IP would let one careless colleague lock out a building. The email is the
 * thing being attacked, so the email is what gets protected.
 *
 * Ten attempts in fifteen minutes is loose enough that nobody mistyping their
 * password notices it, and tight enough that guessing is hopeless — with a
 * mandatory second factor behind it, the password alone is not the last line.
 */
export const lockout = {
  windowMs: 15 * 60 * 1000,
  maxFailures: 10,
} as const;

export type LoginAttemptRecord = {
  at: Date;
  success: boolean;
};

export type LockoutState = {
  locked: boolean;
  /** Failures inside the window, for the audit entry. */
  failures: number;
  /** When the oldest counted failure leaves the window, if locked. */
  retryAt: Date | null;
};

/**
 * A successful sign-in clears the count: the run of failures before it was a
 * person finding their password, not an attack in progress.
 */
export function evaluateLockout(
  attempts: readonly LoginAttemptRecord[],
  now: Date,
): LockoutState {
  const windowStart = now.getTime() - lockout.windowMs;
  const inWindow = attempts
    .filter((attempt) => attempt.at.getTime() > windowStart)
    .sort((a, b) => a.at.getTime() - b.at.getTime());

  // `findLast` would read better but is ES2023, and this project targets
  // ES2022; the index walk keeps the baseline where it is.
  let lastSuccessAt = -Infinity;
  for (const attempt of inWindow) {
    if (attempt.success) {
      lastSuccessAt = attempt.at.getTime();
    }
  }

  const failures = inWindow.filter(
    (attempt) => !attempt.success && attempt.at.getTime() > lastSuccessAt,
  );

  if (failures.length < lockout.maxFailures) {
    return { locked: false, failures: failures.length, retryAt: null };
  }

  const oldest = failures[0];

  return {
    locked: true,
    failures: failures.length,
    retryAt: new Date(oldest.at.getTime() + lockout.windowMs),
  };
}
