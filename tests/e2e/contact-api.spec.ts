import { randomUUID } from "node:crypto";

import { expect, test } from "@playwright/test";

/**
 * The contact endpoint rate-limits per forwarded client address and remembers
 * every address for ten minutes, so no two tests may share one — not even
 * across repeated runs against the same long-lived server. The limiter treats
 * the header as an opaque key, so each test claims a unique key built from a
 * per-run id, its own number, and the current retry.
 */
const runId = randomUUID();

function clientHeaders(client: number, retry = 0) {
  return {
    "Content-Type": "application/json",
    "x-forwarded-for": `${runId}-${retry}-${client}`,
  };
}

function inquiry(overrides: Record<string, unknown> = {}) {
  return {
    firstName: "Anna",
    lastName: "Brandt",
    company: "Behörde für Innere Sicherheit",
    email: "anna.brandt@example.org",
    message: "We would like to discuss a technical evaluation with your team.",
    locale: "de",
    startedAt: Date.now() - 30_000,
    ...overrides,
  };
}

const mailIsConfigured = Boolean(
  process.env.RESEND_API_KEY &&
  process.env.CONTACT_TO_EMAIL &&
  process.env.CONTACT_FROM_EMAIL,
);

test.describe("contact API abuse protection", () => {
  test("rejects a cross-site submission", async ({ request }, testInfo) => {
    const response = await request.post("/api/contact", {
      data: inquiry(),
      headers: {
        ...clientHeaders(10, testInfo.retry),
        origin: "https://attacker.example",
        "sec-fetch-site": "cross-site",
      },
    });

    expect(response.status()).toBe(403);
    expect(response.headers()["cache-control"]).toBe("no-store");
    expect(await response.json()).toEqual({
      ok: false,
      error: "validation_error",
      fields: { form: "Forbidden origin." },
    });
  });

  test("rejects a mismatched origin even without Sec-Fetch-Site", async ({
    request,
  }, testInfo) => {
    const response = await request.post("/api/contact", {
      data: inquiry(),
      headers: {
        ...clientHeaders(11, testInfo.retry),
        origin: "https://attacker.example",
      },
    });

    expect(response.status()).toBe(403);
    expect((await response.json()).error).toBe("validation_error");
  });

  test("lets a same-origin submission through the origin gate", async ({
    baseURL,
    request,
  }, testInfo) => {
    const { origin } = new URL(baseURL ?? "http://127.0.0.1:3001");

    const response = await request.post("/api/contact", {
      data: inquiry(),
      headers: {
        ...clientHeaders(12, testInfo.retry),
        origin,
        "sec-fetch-site": "same-origin",
      },
    });

    expect(response.status()).not.toBe(403);
  });

  test("silently discards a submission that arrives too fast", async ({
    request,
  }, testInfo) => {
    const response = await request.post("/api/contact", {
      data: inquiry({ startedAt: Date.now() }),
      headers: clientHeaders(20, testInfo.retry),
    });

    // Indistinguishable from a delivered inquiry on purpose: an automated
    // submitter must not learn that the timing gate caught it.
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  test("silently discards a submission without a start stamp", async ({
    request,
  }, testInfo) => {
    const response = await request.post("/api/contact", {
      data: inquiry({ startedAt: undefined }),
      headers: clientHeaders(21, testInfo.retry),
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  test("silently discards a filled honeypot", async ({ request }, testInfo) => {
    const response = await request.post("/api/contact", {
      data: inquiry({ website: "https://spam.example" }),
      headers: clientHeaders(22, testInfo.retry),
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  test("returns localised field errors for an invalid English payload", async ({
    request,
  }, testInfo) => {
    const response = await request.post("/api/contact", {
      data: inquiry({ firstName: "", locale: "en", message: "too short" }),
      headers: clientHeaders(30, testInfo.retry),
    });

    expect(response.status()).toBe(400);

    const payload = await response.json();

    expect(payload.error).toBe("validation_error");
    expect(payload.fields.firstName).toBe("Please enter your first name.");
    expect(payload.fields.message).toBe(
      "Please describe your inquiry in at least 20 characters.",
    );
  });

  test("reports a send failure when mail delivery is not configured", async ({
    request,
  }, testInfo) => {
    test.skip(
      mailIsConfigured,
      "Mail delivery is configured, so a valid payload would send a real inquiry.",
    );

    const response = await request.post("/api/contact", {
      data: inquiry(),
      headers: clientHeaders(40, testInfo.retry),
    });

    expect(response.status()).toBe(503);
    expect(response.headers()["cache-control"]).toBe("no-store");
    expect(await response.json()).toEqual({ ok: false, error: "send_failed" });
  });

  test("rate limits a client after more than six requests", async ({
    request,
  }, testInfo) => {
    const headers = clientHeaders(50, testInfo.retry);
    const statuses: number[] = [];
    let retryAfter: string | undefined;
    let limitedBody: { error?: string } | undefined;

    for (let attempt = 0; attempt < 8; attempt += 1) {
      // A deliberately "too fast" stamp: the timing gate answers 200 without
      // sending mail, which keeps the limiter the only thing under test.
      const response = await request.post("/api/contact", {
        data: inquiry({ startedAt: Date.now() }),
        headers,
      });

      statuses.push(response.status());

      if (response.status() === 429 && retryAfter === undefined) {
        retryAfter = response.headers()["retry-after"];
        limitedBody = await response.json();
      }
    }

    // The first six requests pass the limiter; only the surplus is rejected.
    expect(statuses).toEqual([200, 200, 200, 200, 200, 200, 429, 429]);
    expect(Number(retryAfter)).toBeGreaterThan(0);
    expect(limitedBody?.error).toBe("validation_error");
  });
});
