import Link from "next/link";
import type { Route } from "next";

type TextLinkProps = {
  href: string;
  label: string;
  inverse?: boolean;
};

export function TextLink({ href, label, inverse = false }: TextLinkProps) {
  return (
    <Link
      href={href as Route}
      className={`group inline-flex min-h-11 items-center gap-3 border-b py-2 text-[length:var(--type-small)] font-semibold transition-colors [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] ${
        inverse
          ? "border-[var(--border-on-navy)] text-[var(--color-on-dark)] hover:border-[var(--color-on-dark-muted)]"
          : "border-[var(--border-accent-blue)] text-graphite hover:border-elaman-blue hover:text-elaman-blue"
      }`}
    >
      {label}
      <span
        className="transition-transform [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] group-hover:translate-x-1 motion-reduce:transform-none"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}
