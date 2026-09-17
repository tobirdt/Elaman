"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { isValidPortalEmail, isWellFormedTotpCode } from "@/lib/auth/policy";
import type { PortalContent } from "@/lib/content/portal";
import { portalOverviewPath, type Locale } from "@/lib/i18n";

type SignInContent = PortalContent["signIn"];

type Step = "password" | "code";
type Status = "idle" | "loading" | "error";

type Errors = Partial<Record<"email" | "password" | "code" | "form", string>>;

type LoginResponse = { ok: true; next: "code" } | { ok: false; error: string };

type CodeResponse = { ok: true; role: string } | { ok: false; error: string };

/**
 * The two steps of signing in, in one component and on one page.
 *
 * The step is component state rather than a second route, because the server
 * already holds the only thing that matters — the challenge — in a cookie with
 * a two-minute life. A `/portal/code` URL would be a page that means nothing
 * on its own, is wrong in a bookmark, and is empty on a reload.
 */
export function SignInForm({
  content,
  locale,
}: {
  content: SignInContent;
  locale: Locale;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const codeRef = useRef<HTMLInputElement>(null);

  // Moving focus is the only way someone using a screen reader or a keyboard
  // learns that the form changed under them; the heading above it changed too,
  // but nothing would have announced it.
  useEffect(() => {
    if (step === "code") {
      codeRef.current?.focus();
    }
  }, [step]);

  function clearFieldError(field: keyof Errors) {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
    if (status === "error") {
      setStatus("idle");
    }
  }

  function restart() {
    setStep("password");
    setPassword("");
    setCode("");
    setErrors({});
    setStatus("idle");
  }

  async function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const nextErrors: Errors = {};

    if (!isValidPortalEmail(email)) {
      nextErrors.email = content.errors.emailRequired;
    }

    if (password.length === 0) {
      nextErrors.password = content.errors.passwordRequired;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      document.getElementById(nextErrors.email ? "email" : "password")?.focus();
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = (await response.json()) as LoginResponse;

      if (payload.ok) {
        // The password is of no further use to this component, and there is no
        // reason for it to stay in memory while the second step runs.
        setPassword("");
        setErrors({});
        setStatus("idle");
        setStep("code");
        return;
      }

      setErrors({
        form:
          payload.error === "locked"
            ? content.errors.locked
            : payload.error === "rejected"
              ? content.errors.rejected
              : content.errors.unexpected,
      });
      setStatus("error");
    } catch {
      setErrors({ form: content.errors.unexpected });
      setStatus("error");
    }
  }

  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    if (!isWellFormedTotpCode(code)) {
      setErrors({ code: content.errors.codeRequired });
      setStatus("error");
      codeRef.current?.focus();
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/portal/login/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const payload = (await response.json()) as CodeResponse;

      if (payload.ok) {
        // `refresh` first so the layout re-reads the new session; otherwise the
        // overview can render from a cached, signed-out tree.
        router.refresh();
        router.replace(portalOverviewPath(locale));
        return;
      }

      if (payload.error === "no_challenge") {
        setStep("password");
        setCode("");
        setErrors({ form: content.errors.challengeExpired });
        setStatus("error");
        return;
      }

      setErrors({
        code:
          payload.error === "code_used"
            ? content.errors.codeUsed
            : content.errors.rejected,
      });
      setStatus("error");
      codeRef.current?.focus();
    } catch {
      setErrors({ form: content.errors.unexpected });
      setStatus("error");
    }
  }

  const fieldBase = "grid gap-2 text-sm font-medium leading-none text-graphite";

  if (step === "code") {
    return (
      <form
        onSubmit={submitCode}
        className="grid gap-5"
        noValidate
        aria-busy={status === "loading"}
      >
        <div>
          <p className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-elaman-blue">
            {content.totp.eyebrow}
          </p>
          <h3 className="mt-4 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
            {content.totp.title}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[length:var(--type-small)] leading-6 text-graphite-muted">
            {content.totp.lead}
          </p>
        </div>

        <div className={fieldBase}>
          <label htmlFor="code">{content.totp.field}</label>
          <input
            id="code"
            ref={codeRef}
            className="form-field max-w-56 font-mono text-[length:var(--type-lead)] tracking-[0.35em]"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={9}
            required
            spellCheck={false}
            value={code}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setCode(event.target.value);
              clearFieldError("code");
            }}
            aria-invalid={Boolean(errors.code)}
            aria-describedby={errors.code ? "code-error" : "code-hint"}
          />
          {errors.code ? (
            <p id="code-error" className="text-sm leading-5 text-elaman-red">
              {errors.code}
            </p>
          ) : (
            <p id="code-hint" className="text-sm leading-5 text-graphite-muted">
              {content.totp.hint}
            </p>
          )}
        </div>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            type="submit"
            disabled={status === "loading"}
            size="md"
            className="w-full sm:w-auto sm:min-w-44"
          >
            {status === "loading" ? content.totp.submitting : content.totp.submit}
          </Button>
          <button
            type="button"
            onClick={restart}
            className="min-h-11 self-start text-left text-[length:var(--type-small)] text-graphite-muted underline decoration-[var(--border-hairline-strong)] underline-offset-4 transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue hover:decoration-[var(--border-accent-blue)]"
          >
            {content.totp.restart}
          </button>
        </div>

        <div aria-live="polite" className="min-h-6">
          {errors.form ? (
            <p className="border-t border-elaman-red pt-4 text-sm leading-6 text-graphite">
              {errors.form}
            </p>
          ) : null}
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={submitPassword}
      className="grid gap-5"
      noValidate
      aria-busy={status === "loading"}
    >
      <div className={fieldBase}>
        <label htmlFor="email">{content.fields.email}</label>
        <input
          id="email"
          className="form-field"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="username"
          maxLength={254}
          required
          spellCheck={false}
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
            clearFieldError("email");
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="text-sm leading-5 text-elaman-red">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={fieldBase}>
        <label htmlFor="password">{content.fields.password}</label>
        <input
          id="password"
          className="form-field"
          name="password"
          type="password"
          autoComplete="current-password"
          maxLength={128}
          required
          value={password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            clearFieldError("password");
          }}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password ? (
          <p id="password-error" className="text-sm leading-5 text-elaman-red">
            {errors.password}
          </p>
        ) : null}
      </div>

      <div className="mt-1">
        <Button
          type="submit"
          disabled={status === "loading"}
          size="md"
          className="w-full sm:w-auto sm:min-w-44"
        >
          {status === "loading" ? content.submitting : content.submit}
        </Button>
      </div>

      <div aria-live="polite" className="min-h-6">
        {errors.form ? (
          <p className="border-t border-elaman-red pt-4 text-sm leading-6 text-graphite">
            {errors.form}
          </p>
        ) : null}
      </div>
    </form>
  );
}
