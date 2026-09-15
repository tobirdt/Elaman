import type { ReactNode } from "react";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { getSiteContent } from "@/lib/content/site";
import { homePath, type Locale } from "@/lib/i18n";

type PageHeaderProps = {
  locale: Locale;
  /** Short name of this page, shown as the last breadcrumb step. */
  current: string;
  eyebrow: string;
  title: string;
  lead?: string;
  /** Buttons or links that belong to the opening, used by the error page. */
  actions?: ReactNode;
};

/**
 * The opening band of every page below the homepage.
 *
 * It is deliberately the same everywhere: white, on the page grid, breadcrumb
 * then label, title and lead, with fixed padding instead of a share of the
 * viewport. The title therefore starts at the same height and the same left
 * edge on the company, systems, contact, legal and error pages, and the full
 * first screen stays the homepage's alone. A photograph, where a page has
 * one, follows below in a `MediaBand`, so no subpage mirrors another.
 */
export function PageHeader({
  locale,
  current,
  eyebrow,
  title,
  lead,
  actions,
}: PageHeaderProps) {
  const { breadcrumb } = getSiteContent(locale);

  return (
    <section className="border-b border-[var(--border-hairline)] bg-[var(--surface-paper)]">
      <Container className="py-[var(--section-y-page-header)]">
        <div className="hero-copy-enter max-w-[var(--container-content)]">
          <Breadcrumb
            content={breadcrumb}
            current={current}
            homeHref={homePath(locale)}
          />
          <p className="mt-7 font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-elaman-blue">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-[20ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
            {title}
          </h1>
          {lead ? (
            <p className="mt-7 max-w-[58ch] text-[length:var(--type-lead)] leading-[1.6] text-graphite-muted">
              {lead}
            </p>
          ) : null}
          {actions ? <div className="mt-9">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
