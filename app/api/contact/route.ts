import { NextResponse } from "next/server";
import { Resend } from "resend";

import { createContactEmailContent } from "@/lib/email/contact-email";
import { checkRateLimit, clientKey } from "@/lib/http/rate-limit";
import {
  exceedsClaimedSize,
  isForbiddenOrigin,
  readCappedBody,
} from "@/lib/http/request";
import {
  hasHoneypotValue,
  hasSuspiciousCompletionTime,
  validateContactPayload,
  type ContactFieldErrors,
} from "@/lib/validation/contact";

export const runtime = "nodejs";

// No `preferredRegion` export: Next 16 deprecated the route segment config
// (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/
// 02-route-segment-config/preferredRegion.md`) and, on Vercel, now only accepts
// "auto", "global" and "home" — a concrete region code such as "fra1" throws.
// Pin the function region in the Vercel project settings instead.

type ContactApiResponse =
  | { ok: true }
  | { ok: false; error: "validation_error"; fields: ContactFieldErrors }
  | { ok: false; error: "send_failed" }
  | { ok: false; error: "unexpected_error" };

const maxRequestBytes = 12_000;
const rateLimit = { windowMs: 10 * 60 * 1000, max: 6 } as const;

function json(response: ContactApiResponse, status: number, headers?: HeadersInit) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Cache-Control", "no-store");

  return NextResponse.json(response, { headers: responseHeaders, status });
}

function readEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    return null;
  }

  return { apiKey, to, from };
}

export async function POST(request: Request) {
  if (exceedsClaimedSize(request, maxRequestBytes)) {
    return json(
      {
        ok: false,
        error: "validation_error",
        fields: { form: "The submitted message is too large." },
      },
      400,
    );
  }

  let payload: unknown;

  try {
    const rawBody = await readCappedBody(request, maxRequestBytes);

    if (rawBody === null) {
      return json(
        {
          ok: false,
          error: "validation_error",
          fields: { form: "The submitted message is too large." },
        },
        400,
      );
    }

    payload = JSON.parse(rawBody);
  } catch {
    return json(
      {
        ok: false,
        error: "validation_error",
        fields: { form: "Invalid request payload." },
      },
      400,
    );
  }

  if (isForbiddenOrigin(request)) {
    return json(
      {
        ok: false,
        error: "validation_error",
        fields: { form: "Forbidden origin." },
      },
      403,
    );
  }

  // Rate limiting runs before the honeypot check on purpose: a bot that always
  // fills the honeypot would otherwise never be counted, and could hammer the
  // endpoint indefinitely behind a friendly 200.
  const budget = checkRateLimit(clientKey(request, "contact"), rateLimit);

  if (budget.limited) {
    return json(
      {
        ok: false,
        error: "validation_error",
        fields: { form: "Too many requests. Please try again later." },
      },
      429,
      { "Retry-After": String(budget.retryAfterSeconds) },
    );
  }

  // Both bot gates answer with the same plain success the happy path returns.
  // Telling a scripted submitter that it was recognised only invites it to try
  // the next variation, so the honeypot and the timing check stay silent: no
  // mail is sent, no error is surfaced, and the response is indistinguishable
  // from a delivered inquiry.
  if (hasHoneypotValue(payload)) {
    return json({ ok: true }, 200);
  }

  if (hasSuspiciousCompletionTime(payload)) {
    return json({ ok: true }, 200);
  }

  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return json({ ok: false, error: "validation_error", fields: validation.fields }, 400);
  }

  const config = readEmailConfig();

  if (!config) {
    console.error(
      "Contact email send unavailable: RESEND_API_KEY, CONTACT_TO_EMAIL or " +
        "CONTACT_FROM_EMAIL is not configured. Inquiries are being rejected.",
    );
    return json({ ok: false, error: "send_failed" }, 503);
  }

  const emailContent = createContactEmailContent(validation.data);
  const resend = new Resend(config.apiKey);

  try {
    const result = await resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: validation.data.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      tags: [{ name: "source", value: "elaman-contact-form" }],
    });

    if (result.error) {
      console.error("Contact email send failed.", {
        name: result.error.name,
        statusCode: result.error.statusCode,
      });
      return json({ ok: false, error: "send_failed" }, 502);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error("Unexpected contact email failure.", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return json({ ok: false, error: "unexpected_error" }, 500);
  }
}
