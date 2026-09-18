import { afterEach, describe, expect, it, vi } from "vitest";

import {
  checkRateLimit,
  clientKey,
  resetRateLimits,
  type RateLimitPolicy,
} from "@/lib/http/rate-limit";

const policy: RateLimitPolicy = { windowMs: 60_000, max: 3 };

afterEach(() => {
  resetRateLimits();
  vi.useRealTimers();
});

describe("checkRateLimit", () => {
  it("allows exactly the budget and refuses the next one", () => {
    for (let attempt = 1; attempt <= policy.max; attempt += 1) {
      expect(checkRateLimit("a", policy).limited, `attempt ${attempt}`).toBe(false);
    }

    expect(checkRateLimit("a", policy).limited).toBe(true);
  });

  it("counts each key separately", () => {
    for (let attempt = 0; attempt < policy.max + 5; attempt += 1) {
      checkRateLimit("a", policy);
    }

    expect(checkRateLimit("b", policy).limited).toBe(false);
  });

  it("forgets the count once the window has passed", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-18T10:00:00Z"));

    for (let attempt = 0; attempt < policy.max + 1; attempt += 1) {
      checkRateLimit("a", policy);
    }
    expect(checkRateLimit("a", policy).limited).toBe(true);

    vi.setSystemTime(new Date("2026-09-18T10:01:01Z"));
    expect(checkRateLimit("a", policy).limited).toBe(false);
  });

  it("reports a usable Retry-After", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-18T10:00:00Z"));

    for (let attempt = 0; attempt < policy.max + 1; attempt += 1) {
      checkRateLimit("a", policy);
    }

    vi.setSystemTime(new Date("2026-09-18T10:00:30Z"));
    const verdict = checkRateLimit("a", policy);

    expect(verdict.limited).toBe(true);
    expect(verdict.retryAfterSeconds).toBe(30);
  });

  // The limiter must not become the way in: a flood of distinct keys has to
  // stay bounded rather than growing the map until the function runs out of
  // memory.
  it("keeps the store bounded under a flood of distinct keys", () => {
    for (let index = 0; index < 20_000; index += 1) {
      checkRateLimit(`flood-${index}`, policy);
    }

    // The cap is 2048; the point is that it is a constant, not that it is that
    // number, so this asserts the order of magnitude rather than the value.
    const stillCounted = Array.from({ length: 20_000 }, (_, index) =>
      checkRateLimit(`flood-${index}`, { ...policy, max: 1 }),
    ).filter((verdict) => verdict.limited).length;

    expect(stillCounted).toBeLessThan(5_000);
  });
});

describe("clientKey", () => {
  function request(headers: Record<string, string>) {
    return new Request("https://www.elaman.de/api/portal/login", {
      method: "POST",
      headers,
    });
  }

  it("takes the left-most forwarded address", () => {
    expect(
      clientKey(request({ "x-forwarded-for": "203.0.113.7, 198.51.100.2" }), "login"),
    ).toBe("login:203.0.113.7");
  });

  it("falls back, and never returns an empty key", () => {
    expect(clientKey(request({ "x-real-ip": "203.0.113.9" }), "login")).toBe(
      "login:203.0.113.9",
    );
    expect(clientKey(request({}), "login")).toBe("login:anonymous");
  });

  // Two endpoints must not share a budget: a person who has just sent an
  // inquiry should still be able to sign in.
  it("separates endpoints that share an address", () => {
    const headers = { "x-forwarded-for": "203.0.113.7" };

    expect(clientKey(request(headers), "contact")).not.toBe(
      clientKey(request(headers), "portal-login"),
    );
  });
});
