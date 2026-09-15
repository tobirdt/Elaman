"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { LocalizedSiteContent } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n";
import {
  contactFieldLimits,
  isValidContactEmail,
  type ContactRequestPayload,
} from "@/lib/validation/contact";

type ContactFormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  message: string;
  website: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";
type ContactFormErrors = Partial<Record<keyof ContactFormValues | "form", string>>;
type ContactApiResponse =
  | { ok: true }
  | { ok: false; error: "validation_error"; fields: ContactFormErrors }
  | { ok: false; error: "send_failed" | "unexpected_error" };

type ContactFormProps = {
  content: LocalizedSiteContent["contact"]["form"];
  locale: Locale;
};

const initialValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  message: "",
  website: "",
};

const validationFieldOrder: Array<keyof ContactFormValues> = [
  "firstName",
  "lastName",
  "company",
  "email",
  "message",
];

function validate(values: ContactFormValues, content: ContactFormProps["content"]) {
  const errors: ContactFormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = content.errors.firstNameRequired;
  } else if (values.firstName.trim().length > contactFieldLimits.firstName.max) {
    errors.firstName = content.errors.firstNameMax;
  }

  if (values.lastName.trim().length > contactFieldLimits.lastName.max) {
    errors.lastName = content.errors.lastNameMax;
  }

  if (values.company.trim().length > contactFieldLimits.company.max) {
    errors.company = content.errors.companyMax;
  }

  if (!isValidContactEmail(values.email)) {
    errors.email = content.errors.emailRequired;
  } else if (values.email.trim().length > contactFieldLimits.email.max) {
    errors.email = content.errors.emailMax;
  }

  if (values.message.trim().length < contactFieldLimits.message.min) {
    errors.message = content.errors.messageMin;
  } else if (values.message.trim().length > contactFieldLimits.message.max) {
    errors.message = content.errors.messageMax;
  }

  return errors;
}

function focusFirstError(errors: ContactFormErrors) {
  const firstError = validationFieldOrder.find((field) => Boolean(errors[field]));

  if (!firstError) {
    return;
  }

  requestAnimationFrame(() => {
    document.getElementById(firstError)?.focus();
  });
}

export function ContactForm({ content, locale }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  // Stamped after hydration rather than during render so the server-rendered
  // markup stays stable, and held in a ref because nothing renders it: the
  // server reads it to discard submissions that arrive faster than a person
  // could plausibly complete the form.
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name as keyof ContactFormValues];
      delete next.form;
      return next;
    });
    if (status !== "idle") {
      setStatus("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const nextErrors = validate(values, content);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      focusFirstError(nextErrors);
      return;
    }

    setStatus("loading");

    try {
      const requestPayload: ContactRequestPayload = {
        ...values,
        locale,
        startedAt: startedAtRef.current ?? undefined,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      const payload = (await response.json()) as ContactApiResponse;

      if (payload.ok) {
        setStatus("success");
        setValues(initialValues);
        setErrors({});
        startedAtRef.current = Date.now();
        return;
      }

      if (payload.error === "validation_error") {
        const localizedErrors = validate(values, content);
        const responseErrors =
          Object.keys(localizedErrors).length > 0
            ? localizedErrors
            : {
                form:
                  response.status === 429
                    ? content.errors.rateLimited
                    : content.errors.payload,
              };
        setErrors(responseErrors);
        focusFirstError(responseErrors);
      } else {
        setErrors({
          form:
            payload.error === "send_failed"
              ? content.errors.sendFailed
              : content.errors.unexpected,
        });
      }
      setStatus("error");
    } catch {
      setErrors({
        form: content.errors.sendFailed,
      });
      setStatus("error");
    }
  }

  const fieldBase = "grid gap-2 text-sm font-medium leading-none text-graphite";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5"
      noValidate
      aria-busy={status === "loading"}
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">{content.fields.website}</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={updateField}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldBase}>
          <label htmlFor="firstName">
            {content.fields.firstName}
            <span aria-hidden="true" className="text-elaman-red">
              {" *"}
            </span>
          </label>
          <input
            id="firstName"
            className="form-field"
            name="firstName"
            autoComplete="given-name"
            maxLength={contactFieldLimits.firstName.max}
            required
            value={values.firstName}
            onChange={updateField}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName ? (
            <p id="firstName-error" className="text-sm leading-5 text-elaman-red">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div className={fieldBase}>
          <label htmlFor="lastName">{content.fields.lastName}</label>
          <input
            id="lastName"
            className="form-field"
            name="lastName"
            autoComplete="family-name"
            maxLength={contactFieldLimits.lastName.max}
            value={values.lastName}
            onChange={updateField}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName ? (
            <p id="lastName-error" className="text-sm leading-5 text-elaman-red">
              {errors.lastName}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldBase}>
          <label htmlFor="company">{content.fields.company}</label>
          <input
            id="company"
            className="form-field"
            name="company"
            autoComplete="organization"
            maxLength={contactFieldLimits.company.max}
            value={values.company}
            onChange={updateField}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company ? (
            <p id="company-error" className="text-sm leading-5 text-elaman-red">
              {errors.company}
            </p>
          ) : null}
        </div>

        <div className={fieldBase}>
          <label htmlFor="email">
            {content.fields.email}
            <span aria-hidden="true" className="text-elaman-red">
              {" *"}
            </span>
          </label>
          <input
            id="email"
            className="form-field"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={contactFieldLimits.email.max}
            required
            spellCheck={false}
            value={values.email}
            onChange={updateField}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="text-sm leading-5 text-elaman-red">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className={fieldBase}>
        <label htmlFor="message">
          {content.fields.message}
          <span aria-hidden="true" className="text-elaman-red">
            {" *"}
          </span>
        </label>
        <textarea
          id="message"
          className="form-field min-h-24 resize-y"
          name="message"
          minLength={contactFieldLimits.message.min}
          maxLength={contactFieldLimits.message.max}
          required
          value={values.message}
          onChange={updateField}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="text-sm leading-5 text-elaman-red">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={status === "loading"}
          size="md"
          className="w-full sm:w-auto sm:min-w-44"
        >
          {status === "loading" ? content.sending : content.submit}
        </Button>
      </div>

      <div aria-live="polite" className="min-h-6">
        {status === "success" ? (
          <p className="border-t border-[var(--border-accent-blue)] pt-4 text-sm leading-6 text-graphite">
            {content.success}
          </p>
        ) : null}
        {status === "error" && errors.form ? (
          <p className="border-t border-elaman-red pt-4 text-sm leading-6 text-graphite">
            {errors.form}
          </p>
        ) : null}
      </div>
    </form>
  );
}
