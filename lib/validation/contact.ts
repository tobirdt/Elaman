import type { ContactEmailPayload } from "@/lib/email/contact-email";

/**
 * The wire payload the browser posts to `/api/contact`. It is the email payload
 * plus `startedAt`, the client clock reading from the moment the form mounted.
 * `startedAt` never reaches the email; it only feeds the timing heuristic.
 */
export type ContactRequestPayload = ContactEmailPayload & {
  startedAt?: number;
};

export type ContactFieldErrors = Partial<
  Record<keyof ContactEmailPayload | "form", string>
>;

export type ContactValidationResult =
  { ok: true; data: ContactEmailPayload } | { ok: false; fields: ContactFieldErrors };

export const contactFieldLimits = {
  firstName: { min: 1, max: 80 },
  lastName: { max: 80 },
  company: { max: 120 },
  email: { max: 254 },
  message: { min: 20, max: 4000 },
  website: { max: 160 },
} as const;

/**
 * A human needs longer than this to read the contact section and write a
 * twenty-character inquiry. Anything faster is treated as automation.
 */
export const minimumCompletionMs = 3_000;

type ContactMessageLocale = "de" | "en";

/**
 * Server-side copies of the field messages. They intentionally mirror the
 * client strings in `lib/content/site.ts` without importing them: the marketing
 * content module is a presentation concern and must stay out of the API route.
 */
const serverFieldMessages: Record<
  ContactMessageLocale,
  {
    firstNameRequired: string;
    firstNameMax: string;
    lastNameMax: string;
    companyMax: string;
    emailRequired: string;
    emailMax: string;
    messageMin: string;
    messageMax: string;
    payload: string;
  }
> = {
  de: {
    firstNameRequired: "Bitte geben Sie Ihren Vornamen ein.",
    firstNameMax: `Bitte kürzen Sie den Vornamen auf höchstens ${contactFieldLimits.firstName.max} Zeichen.`,
    lastNameMax: `Bitte kürzen Sie den Nachnamen auf höchstens ${contactFieldLimits.lastName.max} Zeichen.`,
    companyMax: `Bitte kürzen Sie den Unternehmensnamen auf höchstens ${contactFieldLimits.company.max} Zeichen.`,
    emailRequired: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    emailMax: `Bitte kürzen Sie die E-Mail-Adresse auf höchstens ${contactFieldLimits.email.max} Zeichen.`,
    messageMin: `Bitte beschreiben Sie Ihr Anliegen mit mindestens ${contactFieldLimits.message.min} Zeichen.`,
    messageMax: `Bitte kürzen Sie Ihre Nachricht auf höchstens ${contactFieldLimits.message.max} Zeichen.`,
    payload:
      "Ihre Anfrage konnte nicht verarbeitet werden. Bitte laden Sie die Seite neu und versuchen Sie es noch einmal.",
  },
  en: {
    firstNameRequired: "Please enter your first name.",
    firstNameMax: `Please shorten the first name to ${contactFieldLimits.firstName.max} characters or fewer.`,
    lastNameMax: `Please shorten the last name to ${contactFieldLimits.lastName.max} characters or fewer.`,
    companyMax: `Please shorten the company name to ${contactFieldLimits.company.max} characters or fewer.`,
    emailRequired: "Please enter a valid email address.",
    emailMax: `Please shorten the email address to ${contactFieldLimits.email.max} characters or fewer.`,
    messageMin: `Please describe your inquiry in at least ${contactFieldLimits.message.min} characters.`,
    messageMax: `Please shorten your message to ${contactFieldLimits.message.max} characters or fewer.`,
    payload: "We could not process your inquiry. Please reload the page and try again.",
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidContactEmail(value: string) {
  return emailPattern.test(value.trim().toLowerCase());
}

function asPayloadRecord(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }

  return input as Partial<Record<keyof ContactRequestPayload, unknown>>;
}

function readString(
  payload: Partial<Record<keyof ContactRequestPayload, unknown>>,
  key: keyof ContactEmailPayload,
) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function readMessageLocale(
  payload: Partial<Record<keyof ContactRequestPayload, unknown>>,
): ContactMessageLocale {
  return payload.locale === "en" ? "en" : "de";
}

export function hasHoneypotValue(input: unknown) {
  const payload = asPayloadRecord(input);

  if (!payload) {
    return false;
  }

  return typeof payload.website === "string" && payload.website.trim().length > 0;
}

/**
 * Timing heuristic for the second, invisible bot gate. A genuine visitor always
 * carries a `startedAt` stamp written on mount, and always needs a few seconds
 * to type. Submissions without a stamp, with a stamp from the future, or sent
 * sooner than {@link minimumCompletionMs} after mount are treated as automated.
 *
 * Callers must answer these exactly like the honeypot — a plain `{ ok: true }`,
 * no mail sent — so a bot cannot tell the gate apart from a real delivery.
 */
export function hasSuspiciousCompletionTime(input: unknown, now = Date.now()) {
  const payload = asPayloadRecord(input);

  if (!payload) {
    // A payload that is not even an object is malformed, not automated. Let
    // validation answer it with a real 400 instead of a silent success.
    return false;
  }

  const startedAt = payload.startedAt;

  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) {
    return true;
  }

  if (startedAt > now) {
    return true;
  }

  return now - startedAt < minimumCompletionMs;
}

export function validateContactPayload(input: unknown): ContactValidationResult {
  const payload = asPayloadRecord(input);

  if (!payload) {
    return { ok: false, fields: { form: serverFieldMessages.de.payload } };
  }

  const messages = serverFieldMessages[readMessageLocale(payload)];
  const fields: ContactFieldErrors = {};

  const firstName = readString(payload, "firstName");
  const lastName = readString(payload, "lastName");
  const company = readString(payload, "company");
  const email = readString(payload, "email").toLowerCase();
  const message = readString(payload, "message");
  const website = readString(payload, "website");
  const locale = readMessageLocale(payload);

  if (firstName.length < contactFieldLimits.firstName.min) {
    fields.firstName = messages.firstNameRequired;
  } else if (firstName.length > contactFieldLimits.firstName.max) {
    fields.firstName = messages.firstNameMax;
  }

  if (lastName.length > contactFieldLimits.lastName.max) {
    fields.lastName = messages.lastNameMax;
  }

  if (company.length > contactFieldLimits.company.max) {
    fields.company = messages.companyMax;
  }

  if (!isValidContactEmail(email)) {
    fields.email = messages.emailRequired;
  } else if (email.length > contactFieldLimits.email.max) {
    fields.email = messages.emailMax;
  }

  if (message.length < contactFieldLimits.message.min) {
    fields.message = messages.messageMin;
  } else if (message.length > contactFieldLimits.message.max) {
    fields.message = messages.messageMax;
  }

  if (website.length > contactFieldLimits.website.max) {
    fields.website = messages.payload;
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, fields };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName: lastName || undefined,
      company: company || undefined,
      email,
      message,
      website: website || undefined,
      locale,
    },
  };
}
