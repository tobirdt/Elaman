import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingBand } from "@/components/ui/ClosingBand";
import { Container } from "@/components/ui/Container";
import { MediaBand } from "@/components/ui/MediaBand";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type {
  CompanyDetailContent,
  DetailPageContent,
  SystemsDetailContent,
} from "@/lib/content/detail-pages";
import type { Locale } from "@/lib/i18n";

type DetailDossierProps = {
  content: DetailPageContent;
  locale: Locale;
};

function CompanyDossier({
  content,
  locale,
}: {
  content: CompanyDetailContent;
  locale: Locale;
}) {
  return (
    <article>
      <PageHeader
        locale={locale}
        current={content.breadcrumb}
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
      />
      <MediaBand
        src="/images/elaman-munich-office.jpg"
        alt={content.heroAlt}
        imageClassName="object-cover object-[63%_58%] saturate-[0.78]"
        preload
      />

      <Section variant="content-band" tone="soft">
        <Container>
          <SectionIntro label={content.process.label} title={content.process.title} />
          <ol className="reveal-group mt-11 grid border-t border-[var(--border-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {content.process.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-b border-[var(--border-hairline)] py-7 lg:border-b-0 lg:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[length:var(--type-micro)] tracking-[var(--tracking-label)] text-elaman-blue"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 max-w-[17ch] text-[length:var(--type-body)] font-semibold leading-6 tracking-[-0.01em] text-graphite">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section variant="content-band" tone="white">
        <Container>
          <SectionIntro
            label={content.bridge.label}
            title={content.bridge.title}
            lead={content.bridge.body}
          />
          <div className="reveal mt-10 max-w-[var(--container-content)] border-t border-[var(--border-hairline-strong)] pt-6">
            <p className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft">
              {content.management.label}
            </p>
            <Link
              href={content.management.href}
              className="mt-3 inline-flex min-h-11 items-center text-[length:var(--type-body)] font-semibold text-graphite underline decoration-[var(--border-accent-blue)] underline-offset-4 transition-colors [transition-duration:var(--motion-fast)] hover:text-elaman-blue"
            >
              {content.management.name}
            </Link>
            <p className="mt-2 text-[length:var(--type-small)] leading-6 text-graphite-soft">
              {content.management.note}
            </p>
          </div>
        </Container>
      </Section>

      <ClosingBand statement={content.closing} link={content.contact} />
    </article>
  );
}

function SystemsDossier({
  content,
  locale,
}: {
  content: SystemsDetailContent;
  locale: Locale;
}) {
  return (
    <article>
      <PageHeader
        locale={locale}
        current={content.breadcrumb}
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
      />
      <MediaBand
        src="/images/elaman-systems-media-mining.jpg"
        alt={content.heroAlt}
        imageClassName="object-cover object-[52%_43%] saturate-[0.52] contrast-[1.04]"
        tone="navy"
        preload
      />

      <Section variant="content-band" tone="white">
        <Container>
          <SectionIntro label={content.portfolioLabel} title={content.portfolioTitle} />
          {/* One column. Two columns put the five areas in reading order
              01 02 / 03 04 / 05 while the rules invited reading down the left
              column instead, and left the fifth entry standing alone. */}
          <ol className="reveal-group mt-11 grid max-w-[var(--container-content)] border-t border-[var(--border-hairline-strong)]">
            {content.portfolio.map((item, index) => (
              <li
                key={item.title}
                className="grid gap-x-6 gap-y-2 border-b border-[var(--border-hairline)] py-7 sm:grid-cols-[3rem_minmax(0,1fr)]"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[length:var(--type-micro)] tracking-[var(--tracking-label)] text-graphite-soft sm:pt-2"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-balance text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[58ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section variant="content-band" tone="soft">
        <Container>
          <SectionIntro label={content.approach.label} title={content.approach.title} />
          <div className="reveal-group mt-8 grid max-w-[var(--container-content)] gap-5 text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted sm:grid-cols-2 sm:gap-10">
            {content.approach.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingBand statement={content.closing} link={content.contact} />
    </article>
  );
}

export function DetailDossier({ content, locale }: DetailDossierProps) {
  switch (content.kind) {
    case "company":
      return <CompanyDossier content={content} locale={locale} />;
    case "systems":
      return <SystemsDossier content={content} locale={locale} />;
  }
}
