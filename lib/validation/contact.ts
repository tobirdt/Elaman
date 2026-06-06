import type { ContactEmailPayload } from "@/lib/email/contact-email";

export type ContactFieldErrors = Partial<
  Record<keyof ContactEmailPayload | "form", string>
>;

export type ContactValidationResult =
  | { ok: true; data: ContactEmailPayload }
  | { ok: false; fields: ContactFieldErrors };

const limits = {
  firstName: { min: 1, max: 80 },
  lastName: { max: 80 },
  company: { max: 120 },
  email: { max: 254 },
  message: { min: 20, max: 4000 },
  website: { max: 160 },
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(
  payload: Partial<Record<keyof ContactEmailPayload, unknown>>,
  key: keyof ContactEmailPayload,
) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

export function hasHoneypotValue(input: unknown) {
  if (!input || typeof input !== "object") {
    return false;
  }

  const payload = input as Partial<Record<keyof ContactEmailPayload, unknown>>;
  return typeof payload.website === "string" && payload.website.trim().length > 0;
}

export function validateContactPayload(input: unknown): ContactValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, fields: { form: "Invalid request payload." } };
  }

  const payload = input as Partial<Record<keyof ContactEmailPayload, unknown>>;
  const fields: ContactFieldErrors = {};

  const firstName = readString(payload, "firstName");
  const lastName = readString(payload, "lastName");
  const company = readString(payload, "company");
  const email = readString(payload, "email").toLowerCase();
  const message = readString(payload, "message");
  const website = readString(payload, "website");

  if (firstName.length < limits.firstName.min) {
    fields.firstName = "First name is required.";
  } else if (firstName.length > limits.firstName.max) {
    fields.firstName = `First name must be ${limits.firstName.max} characters or fewer.`;
  }

  if (lastName.length > limits.lastName.max) {
    fields.lastName = `Last name must be ${limits.lastName.max} characters or fewer.`;
  }

  if (company.length > limits.company.max) {
    fields.company = `Company must be ${limits.company.max} characters or fewer.`;
  }

  if (!emailPattern.test(email)) {
    fields.email = "A valid email address is required.";
  } else if (email.length > limits.email.max) {
    fields.email = `Email must be ${limits.email.max} characters or fewer.`;
  }

  if (message.length < limits.message.min) {
    fields.message = `Message must be at least ${limits.message.min} characters.`;
  } else if (message.length > limits.message.max) {
    fields.message = `Message must be ${limits.message.max} characters or fewer.`;
  }

  if (website.length > limits.website.max) {
    fields.website = "Invalid request payload.";
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
    },
  };
}
