/**
 * A per-caller request budget, held in the instance's memory.
 *
 * Extracted from the contact route, which had the only copy, because the
 * portal needs it more than the contact form does: every sign-in attempt
 * deliberately costs one scrypt hash — 64 MB and about half a second, whether
 * the address exists or not — and the account lockout cannot cover that,
 * because it counts per email and an attacker simply uses a different address
 * each time.
 *
 * ### What this does and does not bound
 *
 * The counter lives in one serverless instance, so a caller spread across many
 * instances gets a budget per instance rather than one budget overall. That is
 * a real limit and it is why this is not the only defence: the account lockout
 * bounds guessing at one account, the second factor bounds what a guessed
 * password is worth, and this bounds what any one instance will spend. A
 * shared counter would mean a round trip to the database on the hot path, for
 * a threshold none of our own users will ever reach.
 *
 * The store is swept and capped, so a flood of distinct keys cannot grow it
 * without bound — the cap is what stops the limiter itself becoming the way in.
 */
export type RateLimitPolicy = {
  windowMs: number;
  max: number;
};

export type RateLimitVerdict = {
  limited: boolean;
  /** Seconds until the window rolls over, for `Retry-After`. */
  retryAfterSeconds: number;
};

const storeMax = 2_048;
const store = new Map<string, { count: number; resetAt: number }>();
let lastSweep = 0;

function sweep(now: number, windowMs: number) {
  if (now - lastSweep < windowMs && store.size < storeMax) {
    return;
  }

  store.forEach((entry, key) => {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  });

  // Still full after dropping the expired ones: evict oldest-first. Map
  // preserves insertion order, so the first key is the least recently added.
  while (store.size >= storeMax) {
    const oldest = store.keys().next().value;

    if (oldest === undefined) {
      break;
    }

    store.delete(oldest);
  }

  lastSweep = now;
}

/**
 * Counts this call against `key` and says whether the caller is over budget.
 * Keys are namespaced by the caller, so the contact form and the sign-in do
 * not share a counter.
 */
export function checkRateLimit(key: string, policy: RateLimitPolicy): RateLimitVerdict {
  const now = Date.now();
  sweep(now, policy.windowMs);

  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + policy.windowMs });

    return { limited: false, retryAfterSeconds: 0 };
  }

  current.count += 1;

  return {
    limited: current.count > policy.max,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
  };
}

/**
 * The caller's address, as far as it can be known behind a proxy. Used only to
 * group requests for counting; nothing is authorised by it, and a caller who
 * can forge it gains a fresh budget rather than access.
 */
export function clientKey(request: Request, namespace: string): string {
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  return `${namespace}:${address}`;
}

/** Only for tests: the store outlives a module import between cases. */
export function resetRateLimits(): void {
  store.clear();
  lastSweep = 0;
}
