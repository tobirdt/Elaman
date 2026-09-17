import { describe, expect, it } from "vitest";

import {
  checkPassword,
  evaluateLockout,
  isValidPortalEmail,
  isWellFormedTotpCode,
  judgeSession,
  lockout,
  normalizePassword,
  normalizeTotpCode,
  passwordLength,
  sessionLifetime,
  shouldTouchSession,
  type LoginAttemptRecord,
} from "@/lib/auth/policy";

describe("checkPassword", () => {
  it("accepts a passphrase of the minimum length and anything longer", () => {
    expect(checkPassword("a".repeat(passwordLength.min))).toBeNull();
    expect(checkPassword("ein hinreichend langes Kennwort")).toBeNull();
  });

  it("refuses one character below the minimum", () => {
    expect(checkPassword("a".repeat(passwordLength.min - 1))).toBe("too_short");
  });

  it("refuses one character above the maximum", () => {
    expect(checkPassword("a".repeat(passwordLength.max))).toBeNull();
    expect(checkPassword("a".repeat(passwordLength.max + 1))).toBe("too_long");
  });

  // `.length` counts most emoji as two and would let an eleven-character
  // password through, or reject a valid one made of CJK characters.
  it("counts code points rather than UTF-16 units", () => {
    const twelveEmoji = "🙂".repeat(12);
    const elevenEmoji = "🙂".repeat(11);

    expect([...twelveEmoji].length).toBe(12);
    expect(twelveEmoji.length).toBe(24);
    expect(checkPassword(twelveEmoji)).toBeNull();
    expect(checkPassword(elevenEmoji)).toBe("too_short");
  });

  it("refuses a password made only of whitespace", () => {
    expect(checkPassword(" ".repeat(20))).toBe("whitespace_only");
  });

  it("imposes no composition rules", () => {
    for (const password of [
      "alleskleinbuchstaben",
      "ALLESGROSSBUCHSTABEN",
      "123456789012345678",
      "correct horse battery staple",
    ]) {
      expect(checkPassword(password)).toBeNull();
    }
  });

  it("refuses a password built from the account's own identity", () => {
    const identity = { email: "tobias.rumscheidt@elaman.de", name: "Tobias Rumscheidt" };

    expect(checkPassword("tobias.rumscheidt2026", identity)).toBe("contains_identity");
    expect(checkPassword("meinTobias Rumscheidt!", identity)).toBe("contains_identity");
    expect(checkPassword("xxtobias.rumscheidt@elaman.dexx", identity)).toBe(
      "contains_identity",
    );
    // Case must not be a way around it.
    expect(checkPassword("TOBIAS.RUMSCHEIDT.2026", identity)).toBe("contains_identity");
    // Something unrelated of the same length still passes.
    expect(checkPassword("Nebelhorn im Hafen 12", identity)).toBeNull();
  });

  // A three-letter name would otherwise match inside almost every passphrase.
  it("ignores identity fragments too short to be meaningful", () => {
    expect(checkPassword("abc ist ein gutes Kennwort", { name: "abc" })).toBeNull();
  });

  // Written with explicit escapes: two literals typed as "Grüße" look
  // identical in the editor and may well be the same bytes, which would make
  // this test pass without testing anything.
  it("normalises the same way the hashing does", () => {
    const composed = "Grüße vom Hafen";
    const decomposed = "Grüße vom Hafen";

    expect(composed).not.toBe(decomposed);
    expect(normalizePassword(composed)).toBe(normalizePassword(decomposed));
    // And the length check must agree, or the same passphrase could be long
    // enough on one keyboard and too short on another.
    expect(checkPassword(composed)).toBe(checkPassword(decomposed));
  });
});

describe("isValidPortalEmail", () => {
  it("takes an ordinary address and refuses the obvious rubbish", () => {
    expect(isValidPortalEmail("tobias.rumscheidt@elaman.de")).toBe(true);
    expect(isValidPortalEmail("  tobias@elaman.de  ")).toBe(true);
    expect(isValidPortalEmail("")).toBe(false);
    expect(isValidPortalEmail("kein-at-zeichen")).toBe(false);
    expect(isValidPortalEmail("zwei@@at.de")).toBe(false);
  });

  it("refuses an address longer than the field allows", () => {
    expect(isValidPortalEmail(`${"a".repeat(250)}@elaman.de`)).toBe(false);
  });
});

describe("TOTP code shape", () => {
  it("accepts six digits, with the spacing the apps display", () => {
    expect(isWellFormedTotpCode("123456")).toBe(true);
    expect(isWellFormedTotpCode("123 456")).toBe(true);
    expect(isWellFormedTotpCode("123-456")).toBe(true);
    expect(normalizeTotpCode("123 456")).toBe("123456");
  });

  it("refuses anything that is not six digits", () => {
    for (const code of ["12345", "1234567", "12345a", "", "      ", "abcdef"]) {
      expect(isWellFormedTotpCode(code)).toBe(false);
    }
  });
});

describe("judgeSession", () => {
  const createdAt = new Date("2026-09-17T08:00:00Z");
  const expiresAt = new Date(createdAt.getTime() + sessionLifetime.absoluteMs);

  it("passes a session used a moment ago", () => {
    const now = new Date(createdAt.getTime() + 5 * 60 * 1000);

    expect(judgeSession({ createdAt, lastSeenAt: now, expiresAt }, now)).toBe("valid");
  });

  it("expires exactly at the absolute limit, not a millisecond later", () => {
    const justBefore = new Date(expiresAt.getTime() - 1);
    const exactly = new Date(expiresAt.getTime());

    expect(
      judgeSession({ createdAt, lastSeenAt: justBefore, expiresAt }, justBefore),
    ).toBe("valid");
    expect(judgeSession({ createdAt, lastSeenAt: justBefore, expiresAt }, exactly)).toBe(
      "expired",
    );
  });

  it("times out exactly at the idle limit", () => {
    const lastSeenAt = new Date(createdAt.getTime() + 60 * 1000);
    const justBefore = new Date(lastSeenAt.getTime() + sessionLifetime.idleMs - 1);
    const exactly = new Date(lastSeenAt.getTime() + sessionLifetime.idleMs);

    expect(judgeSession({ createdAt, lastSeenAt, expiresAt }, justBefore)).toBe("valid");
    expect(judgeSession({ createdAt, lastSeenAt, expiresAt }, exactly)).toBe(
      "idle_timeout",
    );
  });

  // Both limits can be past at once; the absolute one is the stronger statement.
  it("reports expiry rather than idleness when both apply", () => {
    const now = new Date(expiresAt.getTime() + 60 * 60 * 1000);

    expect(judgeSession({ createdAt, lastSeenAt: createdAt, expiresAt }, now)).toBe(
      "expired",
    );
  });
});

describe("shouldTouchSession", () => {
  const lastSeenAt = new Date("2026-09-17T08:00:00Z");

  it("skips the write for a session touched seconds ago", () => {
    expect(shouldTouchSession(lastSeenAt, new Date(lastSeenAt.getTime() + 5_000))).toBe(
      false,
    );
  });

  it("writes once the interval has passed", () => {
    expect(shouldTouchSession(lastSeenAt, new Date(lastSeenAt.getTime() + 60_000))).toBe(
      true,
    );
  });
});

describe("evaluateLockout", () => {
  const now = new Date("2026-09-17T12:00:00Z");

  function failuresAgo(count: number, minutesAgo: number): LoginAttemptRecord[] {
    return Array.from({ length: count }, (_, index) => ({
      at: new Date(now.getTime() - (minutesAgo + index) * 60 * 1000),
      success: false,
    }));
  }

  it("does not lock an account with no history", () => {
    expect(evaluateLockout([], now)).toEqual({
      locked: false,
      failures: 0,
      retryAt: null,
    });
  });

  it("does not lock one attempt below the limit", () => {
    const state = evaluateLockout(failuresAgo(lockout.maxFailures - 1, 1), now);

    expect(state.locked).toBe(false);
    expect(state.failures).toBe(lockout.maxFailures - 1);
  });

  it("locks at the limit and says when the oldest failure ages out", () => {
    const attempts = failuresAgo(lockout.maxFailures, 1);
    const state = evaluateLockout(attempts, now);
    const oldest = attempts.reduce((a, b) => (a.at < b.at ? a : b));

    expect(state.locked).toBe(true);
    expect(state.failures).toBe(lockout.maxFailures);
    expect(state.retryAt?.getTime()).toBe(oldest.at.getTime() + lockout.windowMs);
  });

  it("ignores failures that have left the window", () => {
    const stale = Array.from({ length: 50 }, (_, index) => ({
      at: new Date(now.getTime() - lockout.windowMs - (index + 1) * 1_000),
      success: false,
    }));

    expect(evaluateLockout(stale, now).locked).toBe(false);
  });

  // The run of failures before a success was someone finding their password.
  it("counts only the failures after the most recent success", () => {
    const attempts: LoginAttemptRecord[] = [
      ...failuresAgo(lockout.maxFailures, 5),
      { at: new Date(now.getTime() - 4 * 60 * 1000), success: true },
      ...failuresAgo(2, 1),
    ];
    const state = evaluateLockout(attempts, now);

    expect(state.locked).toBe(false);
    expect(state.failures).toBe(2);
  });

  it("locks again once the limit is reached after a success", () => {
    const attempts: LoginAttemptRecord[] = [
      { at: new Date(now.getTime() - 14 * 60 * 1000), success: true },
      ...failuresAgo(lockout.maxFailures, 1),
    ];

    expect(evaluateLockout(attempts, now).locked).toBe(true);
  });

  it("does not care what order the rows arrive in", () => {
    const attempts = failuresAgo(lockout.maxFailures, 1);
    const shuffled = [...attempts].reverse();

    expect(evaluateLockout(shuffled, now)).toEqual(evaluateLockout(attempts, now));
  });
});
