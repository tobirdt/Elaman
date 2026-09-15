import type { Route } from "next";

import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

type ClosingBandProps = {
  statement: string;
  link: { label: string; href: Route };
};

/**
 * How the homepage and both dossiers end: one sentence and one way on, on
 * navy, across the full width. It is the only place navy carries a whole
 * band of text, which gives the colour a single job and gives every page the
 * same closing beat. The contact route and the legal documents have no
 * closing band; they are the destination.
 */
export function ClosingBand({ statement, link }: ClosingBandProps) {
  return (
    <section className="border-t border-[var(--border-on-navy)] bg-navy text-[var(--color-on-dark)] print:hidden">
      <Container className="reveal-group flex flex-col items-start justify-between gap-6 py-[var(--section-y-closing)] sm:flex-row sm:items-center">
        <h2 className="max-w-[28ch] text-balance text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)]">
          {statement}
        </h2>
        <TextLink href={link.href} label={link.label} inverse />
      </Container>
    </section>
  );
}
