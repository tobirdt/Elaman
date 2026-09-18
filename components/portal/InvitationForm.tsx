"use client";

import type { Route } from "next";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { isWellFormedTotpCode, passwordLength } from "@/lib/auth/policy";
import type { PortalContent } from "@/lib/content/portal";

type InvitationContent = PortalContent["invitation"];

type Errors = Partial<Record<"password" | "confirm" | "code" | "form", string>>;

type Response = { ok: true } | { ok: false; error: string; problem?: string };

/**
 * Redeeming an invitation: choose a password, prove the authenticator.
 *
 * The password rules are checked here as well as on the server, and the server
 * is the one that decides. This copy exists so someone typing gets told before
 * they submit; it is convenience, not enforcement, and the two use the same
 * module so they cannot disagree about what "too short" means.
 */
export function InvitationForm({
  content,
  token,
  signInHref,
}: {
  content: InvitationContent;
  token: string;
  signInHref: Route;
}) {
  // The success panel lives here rather than in the page so the page can stay
  // a server component: it has nothing else to be interactive about.
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  function clearFieldError(field: keyof Errors) {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  }

  function problemMessage(problem: string | undefined): string {
    switch (problem) {
      case "too_short":
        return content.errors.passwordTooShort;
      case "too_long":
        return content.errors.passwordTooLong;
      case "whitespace_only":
        return content.errors.passwordWhitespace;
      case "contains_identity":
        return content.errors.passwordIdentity;
      default:
        return content.errors.unexpected;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy) {
      return;
    }

    const nextErrors: Errors = {};

    // Counted in code points, the same way the server counts them.
    if ([...password.normalize("NFKC")].length < passwordLength.min) {
      nextErrors.password = content.errors.passwordTooShort;
    }

    if (confirm !== password) {
      nextErrors.confirm = content.errors.confirmMismatch;
    }

    if (!isWellFormedTotpCode(code)) {
      nextErrors.code = content.errors.codeRequired;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      document
        .getElementById(
          nextErrors.password ? "password" : nextErrors.confirm ? "confirm" : "code",
        )
        ?.focus();
      return;
    }

    setBusy(true);

    try {
      const response = await fetch("/api/portal/invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, code }),
      });
      const payload = (await response.json()) as Response;

      if (payload.ok) {
        setPassword("");
        setConfirm("");
        setCode("");
        setDone(true);
        return;
      }

      if (payload.error === "weak_password") {
        setErrors({ password: problemMessage(payload.problem) });
        passwordRef.current?.focus();
      } else if (payload.error === "wrong_code") {
        setErrors({ code: content.errors.wrongCode });
        document.getElementById("code")?.focus();
      } else if (payload.error === "invalid_token") {
        setErrors({ form: content.errors.invalidToken });
      } else {
        setErrors({ form: content.errors.unexpected });
      }
    } catch {
      setErrors({ form: content.errors.unexpected });
    } finally {
      setBusy(false);
    }
  }

  const fieldBase = "grid gap-2 text-sm font-medium leading-none text-graphite";

  if (done) {
    return (
      <div className="border-t border-[var(--border-accent-blue)] pt-5" role="status">
        <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
          {content.done.title}
        </h3>
        <p className="mt-4 max-w-[52ch] text-[length:var(--type-small)] leading-6 text-graphite-muted">
          {content.done.body}
        </p>
        <p className="mt-5">
          <TextLink href={signInHref} label={content.done.signIn} />
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate aria-busy={busy}>
      <div className={fieldBase}>
        <label htmlFor="password">
          {content.fields.password}
          <span aria-hidden="true" className="text-elaman-red">
            {" *"}
          </span>
        </label>
        <input
          id="password"
          ref={passwordRef}
          className="form-field"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={passwordLength.min}
          maxLength={passwordLength.max}
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

      <div className={fieldBase}>
        <label htmlFor="confirm">
          {content.fields.confirm}
          <span aria-hidden="true" className="text-elaman-red">
            {" *"}
          </span>
        </label>
        <input
          id="confirm"
          className="form-field"
          name="confirm"
          type="password"
          autoComplete="new-password"
          maxLength={passwordLength.max}
          required
          value={confirm}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setConfirm(event.target.value);
            clearFieldError("confirm");
          }}
          aria-invalid={Boolean(errors.confirm)}
          aria-describedby={errors.confirm ? "confirm-error" : undefined}
        />
        {errors.confirm ? (
          <p id="confirm-error" className="text-sm leading-5 text-elaman-red">
            {errors.confirm}
          </p>
        ) : null}
      </div>

      <div className={fieldBase}>
        <label htmlFor="code">
          {content.fields.code}
          <span aria-hidden="true" className="text-elaman-red">
            {" *"}
          </span>
        </label>
        <input
          id="code"
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
          aria-describedby={errors.code ? "code-error" : undefined}
        />
        {errors.code ? (
          <p id="code-error" className="text-sm leading-5 text-elaman-red">
            {errors.code}
          </p>
        ) : null}
      </div>

      <div className="mt-1">
        <Button
          type="submit"
          disabled={busy}
          size="md"
          className="w-full sm:w-auto sm:min-w-52"
        >
          {busy ? content.submitting : content.submit}
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
