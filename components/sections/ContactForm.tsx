"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { LocalizedSiteContent } from "@/lib/content/site";

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
  "email",
  "message",
];

function validate(values: ContactFormValues, content: ContactFormProps["content"]) {
  const errors: ContactFormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = content.errors.firstNameRequired;
  } else if (values.firstName.trim().length > 80) {
    errors.firstName = content.errors.firstNameMax;
  }

  if (values.lastName.trim().length > 80) {
    errors.lastName = content.errors.lastNameMax;
  }

  if (values.company.trim().length > 120) {
    errors.company = content.errors.companyMax;
  }

  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = content.errors.emailRequired;
  } else if (values.email.trim().length > 254) {
    errors.email = content.errors.emailMax;
  }

  if (values.message.trim().length < 20) {
    errors.message = content.errors.messageMin;
  } else if (values.message.trim().length > 4000) {
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

export function ContactForm({ content }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

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

    const nextErrors = validate(values, content);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      focusFirstError(nextErrors);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as ContactApiResponse;

      if (payload.ok) {
        setStatus("success");
        setValues(initialValues);
        setErrors({});
        return;
      }

      if (payload.error === "validation_error") {
        const localizedErrors = validate(values, content);
        setErrors(
          Object.keys(localizedErrors).length > 0 ? localizedErrors : payload.fields,
        );
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
      className="grid gap-3.5"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={fieldBase}>
          {content.fields.firstName}
          <input
            id="firstName"
            className="form-field"
            name="firstName"
            autoComplete="given-name"
            required
            value={values.firstName}
            onChange={updateField}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName ? (
            <span id="firstName-error" className="text-xs text-elaman-red">
              {errors.firstName}
            </span>
          ) : null}
        </label>

        <label className={fieldBase}>
          {content.fields.lastName}
          <input
            id="lastName"
            className="form-field"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={updateField}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName ? (
            <span id="lastName-error" className="text-xs text-elaman-red">
              {errors.lastName}
            </span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={fieldBase}>
          {content.fields.company}
          <input
            id="company"
            className="form-field"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={updateField}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company ? (
            <span id="company-error" className="text-xs text-elaman-red">
              {errors.company}
            </span>
          ) : null}
        </label>

        <label className={fieldBase}>
          {content.fields.email}
          <input
            id="email"
            className="form-field"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={updateField}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <span id="email-error" className="text-xs text-elaman-red">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <label className={fieldBase}>
        {content.fields.message}
        <textarea
          id="message"
          className="form-field min-h-24 resize-y"
          name="message"
          required
          value={values.message}
          onChange={updateField}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <span id="message-error" className="text-xs text-elaman-red">
            {errors.message}
          </span>
        ) : null}
      </label>

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={status === "loading"}
          size="md"
          className="w-full sm:w-auto sm:min-w-44"
        >
          {status === "loading" ? content.sending : content.submit}
        </Button>
        <p className="text-xs leading-5 text-graphite-soft">{content.helper}</p>
      </div>

      <div aria-live="polite" className="min-h-12">
        {status === "success" ? (
          <p className="rounded-[var(--radius-control)] border border-elaman-blue/18 bg-elaman-blue/[0.055] px-4 py-3 text-sm text-graphite">
            {content.success}
          </p>
        ) : null}
        {status === "error" && errors.form ? (
          <p className="rounded-[var(--radius-control)] border border-elaman-red/18 bg-elaman-red/[0.055] px-4 py-3 text-sm text-graphite">
            {errors.form}
          </p>
        ) : null}
      </div>
    </form>
  );
}
