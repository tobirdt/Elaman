import { describe, expect, it } from "vitest";

import {
  contactFieldLimits,
  hasHoneypotValue,
  hasSuspiciousCompletionTime,
  isValidContactEmail,
  minimumCompletionMs,
  validateContactPayload,
} from "@/lib/validation/contact";

const validMessage = "We would like to discuss a technical evaluation with your team.";

function payload(overrides: Record<string, unknown> = {}) {
  return {
    firstName: "Anna",
    lastName: "Brandt",
    company: "Behörde für Innere Sicherheit",
    email: "anna.brandt@example.org",
    message: validMessage,
    locale: "de",
    startedAt: Date.now() - 30_000,
    ...overrides,
  };
}

describe("validateContactPayload", () => {
  it("accepts a complete payload and returns the email data", () => {
    const result = validateContactPayload(payload());

    expect(result.ok).toBe(true);

    if (!result.ok) {
      return;
    }

    expect(result.data).toEqual({
      firstName: "Anna",
      lastName: "Brandt",
      company: "Behörde für Innere Sicherheit",
      email: "anna.brandt@example.org",
      message: validMessage,
      website: undefined,
      locale: "de",
    });
  });

  it("drops empty optional fields instead of forwarding blank strings", () => {
    const result = validateContactPayload(
      payload({ lastName: "   ", company: "", website: "" }),
    );

    expect(result.ok).toBe(true);

    if (!result.ok) {
      return;
    }

    expect(result.data.lastName).toBeUndefined();
    expect(result.data.company).toBeUndefined();
    expect(result.data.website).toBeUndefined();
  });

  it("rejects a missing first name", () => {
    const result = validateContactPayload(payload({ firstName: "   " }));

    expect(result.ok).toBe(false);

    if (result.ok) {
      return;
    }

    expect(result.fields.firstName).toBe("Bitte geben Sie Ihren Vornamen ein.");
    expect(result.fields.email).toBeUndefined();
  });

  it("rejects a first name beyond the length limit", () => {
    const result = validateContactPayload(
      payload({ firstName: "a".repeat(contactFieldLimits.firstName.max + 1) }),
    );

    expect(result.ok).toBe(false);

    if (result.ok) {
      return;
    }

    expect(result.fields.firstName).toContain(String(contactFieldLimits.firstName.max));
  });

  it("rejects an invalid email address", () => {
    const result = validateContactPayload(payload({ email: "anna.brandt@example" }));

    expect(result.ok).toBe(false);

    if (result.ok) {
      return;
    }

    expect(result.fields.email).toBe("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
  });

  it("rejects a message that is too short", () => {
    const result = validateContactPayload(payload({ message: "Zu kurz." }));

    expect(result.ok).toBe(false);

    if (result.ok) {
      return;
    }

    expect(result.fields.message).toContain(String(contactFieldLimits.message.min));
  });

  it("rejects a message that is too long", () => {
    const result = validateContactPayload(
      payload({ message: "a".repeat(contactFieldLimits.message.max + 1) }),
    );

    expect(result.ok).toBe(false);

    if (result.ok) {
      return;
    }

    expect(result.fields.message).toContain(String(contactFieldLimits.message.max));
  });

  it("returns English messages for an English inquiry", () => {
    const result = validateContactPayload(
      payload({ firstName: "", locale: "en", message: "too short" }),
    );

    expect(result.ok).toBe(false);

    if (result.ok) {
      return;
    }

    expect(result.fields.firstName).toBe("Please enter your first name.");
    expect(result.fields.message).toBe(
      "Please describe your inquiry in at least 20 characters.",
    );
  });

  it("falls back to German for an unknown locale", () => {
    const result = validateContactPayload(payload({ firstName: "", locale: "fr" }));

    expect(result.ok).toBe(false);

    if (result.ok) {
      return;
    }

    expect(result.fields.firstName).toBe("Bitte geben Sie Ihren Vornamen ein.");
  });

  it("normalises the email address to lowercase", () => {
    const result = validateContactPayload(
      payload({ email: "  Anna.Brandt@EXAMPLE.ORG  " }),
    );

    expect(result.ok).toBe(true);

    if (!result.ok) {
      return;
    }

    expect(result.data.email).toBe("anna.brandt@example.org");
  });

  it("rejects an array payload", () => {
    const result = validateContactPayload([payload()]);

    expect(result.ok).toBe(false);

    if (result.ok) {
      return;
    }

    expect(result.fields.form).toBeTruthy();
    expect(Object.keys(result.fields)).toEqual(["form"]);
  });

  it.each([null, undefined, "string", 42, true])(
    "rejects the non-object payload %o",
    (input) => {
      const result = validateContactPayload(input);

      expect(result.ok).toBe(false);

      if (result.ok) {
        return;
      }

      expect(result.fields.form).toBeTruthy();
    },
  );
});

describe("hasHoneypotValue", () => {
  it("detects a filled honeypot field", () => {
    expect(hasHoneypotValue(payload({ website: "https://spam.example" }))).toBe(true);
  });

  it("ignores an empty or whitespace-only honeypot field", () => {
    expect(hasHoneypotValue(payload({ website: "" }))).toBe(false);
    expect(hasHoneypotValue(payload({ website: "   " }))).toBe(false);
    expect(hasHoneypotValue(payload())).toBe(false);
  });

  it("ignores non-object input", () => {
    expect(hasHoneypotValue(null)).toBe(false);
    expect(hasHoneypotValue("website")).toBe(false);
  });
});

describe("hasSuspiciousCompletionTime", () => {
  const now = 1_700_000_000_000;

  it("accepts a submission sent well after the form was mounted", () => {
    expect(hasSuspiciousCompletionTime(payload({ startedAt: now - 60_000 }), now)).toBe(
      false,
    );
  });

  it("rejects a submission sent immediately", () => {
    expect(hasSuspiciousCompletionTime(payload({ startedAt: now }), now)).toBe(true);
  });

  it("rejects a submission just below the minimum completion time", () => {
    expect(
      hasSuspiciousCompletionTime(
        payload({ startedAt: now - minimumCompletionMs + 1 }),
        now,
      ),
    ).toBe(true);
  });

  it("accepts a submission exactly at the minimum completion time", () => {
    expect(
      hasSuspiciousCompletionTime(payload({ startedAt: now - minimumCompletionMs }), now),
    ).toBe(false);
  });

  it("rejects a missing or non-numeric stamp", () => {
    expect(hasSuspiciousCompletionTime(payload({ startedAt: undefined }), now)).toBe(
      true,
    );
    expect(hasSuspiciousCompletionTime(payload({ startedAt: "1700000" }), now)).toBe(
      true,
    );
    expect(hasSuspiciousCompletionTime(payload({ startedAt: Number.NaN }), now)).toBe(
      true,
    );
  });

  it("rejects a stamp from the future", () => {
    expect(hasSuspiciousCompletionTime(payload({ startedAt: now + 1 }), now)).toBe(true);
  });

  it("leaves a malformed payload to validation instead of swallowing it", () => {
    expect(hasSuspiciousCompletionTime(null, now)).toBe(false);
    expect(hasSuspiciousCompletionTime("not-json", now)).toBe(false);
    expect(hasSuspiciousCompletionTime([], now)).toBe(false);
  });
});

describe("isValidContactEmail", () => {
  it.each(["a@b.de", " Anna.Brandt@Example.ORG "])("accepts %s", (value) => {
    expect(isValidContactEmail(value)).toBe(true);
  });

  it.each(["", "anna", "anna@example", "anna @example.org", "anna@ex ample.org"])(
    "rejects %s",
    (value) => {
      expect(isValidContactEmail(value)).toBe(false);
    },
  );
});
