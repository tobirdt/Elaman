import { NextResponse } from "next/server";
import { Resend } from "resend";

import { createContactEmailContent } from "@/lib/email/contact-email";
import {
  hasHoneypotValue,
  validateContactPayload,
  type ContactFieldErrors,
} from "@/lib/validation/contact";

export const runtime = "nodejs";

type ContactApiResponse =
  | { ok: true }
  | { ok: false; error: "validation_error"; fields: ContactFieldErrors }
  | { ok: false; error: "send_failed" }
  | { ok: false; error: "unexpected_error" };

const maxRequestBytes = 12_000;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 6;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function json(response: ContactApiResponse, status: number) {
  return NextResponse.json(response, { status });
}

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > rateLimitMax;
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
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > maxRequestBytes) {
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
    payload = await request.json();
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

  if (hasHoneypotValue(payload)) {
    return json({ ok: true }, 200);
  }

  if (isRateLimited(clientKey(request))) {
    return json(
      {
        ok: false,
        error: "validation_error",
        fields: { form: "Too many requests. Please try again later." },
      },
      429,
    );
  }

  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return json({ ok: false, error: "validation_error", fields: validation.fields }, 400);
  }

  const config = readEmailConfig();

  if (!config) {
    console.error("Contact email send unavailable: missing environment configuration.");
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
