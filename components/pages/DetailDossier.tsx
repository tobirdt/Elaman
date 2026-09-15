import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { MediaBand } from "@/components/ui/MediaBand";
import { TextLink } from "@/components/ui/TextLink";
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

function DetailClosing({
  content,
  inverse = false,
}: {
  content: DetailPageContent;
  inverse?: boolean;
}) {
  return (
    <section
      className={`border-t ${
        inverse
          ? "border-[var(--border-on-navy)] bg-navy text-[var(--color-on-dark)]"
          : "border-[var(--border-hairline)] bg-[var(--surface-paper-soft)]"
      }`}
    >
      <Container className="reveal-group flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center sm:py-14">
        <h2 className="max-w-[28ch] text-balance text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)]">
          {content.closing}
        </h2>
        <TextLink
          href={content.contact.href}
          label={content.contact.label}
          inverse={inverse}
        />
      </Container>
    </section>
  );
}

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

      <section className="bg-[var(--surface-paper-soft)]">
        <Container className="py-[var(--section-y-content-band)]">
          <p className="reveal font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-elaman-blue">
            {content.process.label}
          </p>
          <h2 className="reveal mt-6 max-w-[18ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
            {content.process.title}
          </h2>
          <ol className="reveal-group mt-11 grid lg:mt-14 lg:grid-cols-4 lg:gap-8 lg:border-t lg:border-[var(--border-hairline-strong)]">
            {content.process.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-t border-[var(--border-hairline)] py-8 first:border-[var(--border-hairline-strong)] lg:border-t-0 lg:pb-0 lg:pt-8"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[length:var(--type-h3)] font-normal leading-none tracking-[var(--tracking-title)] text-elaman-blue"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-7 max-w-[17ch] text-[length:var(--type-body)] font-semibold leading-6 tracking-[-0.01em] text-graphite">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="grid border-y border-[var(--border-hairline)] bg-[var(--surface-paper)] lg:grid-cols-2">
        <div className="relative min-h-[22rem] overflow-hidden bg-[var(--surface-paper-soft)] lg:min-h-[42rem]">
          <Image
            src="/images/elaman-profile-bridge.jpg"
            alt={content.bridge.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[49%_center] saturate-[0.7]"
          />
        </div>
        <div className="flex items-center border-t border-[var(--border-hairline)] px-[var(--page-x-right)] py-[var(--section-y-content-band)] lg:border-l lg:border-t-0 lg:pl-[clamp(3rem,7vw,7rem)] lg:pr-[var(--page-x-right)]">
          <div className="reveal max-w-[39rem]">
            <span className="block h-px w-20 bg-elaman-blue" aria-hidden="true" />
            <h2 className="mt-7 max-w-[19ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.bridge.title}
            </h2>
            <p className="mt-6 max-w-[58ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
              {content.bridge.body}
            </p>
            <div className="mt-10 border-t border-[var(--border-hairline-strong)] pt-6">
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
          </div>
        </div>
      </section>

      <DetailClosing content={content} />
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

      <section className="bg-[var(--surface-paper)]">
        <Container className="py-[var(--section-y-content-band)]">
          <p className="reveal font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-elaman-blue">
            {content.portfolioLabel}
          </p>
          <ol className="reveal-group mt-8 grid border-t border-[var(--border-hairline-strong)] lg:grid-cols-2">
            {content.portfolio.map((item, index) => (
              <li
                key={item.title}
                className={`grid gap-3 border-b border-[var(--border-hairline)] py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4 lg:gap-6 lg:px-8 lg:py-9 ${
                  index === content.portfolio.length - 1 && index % 2 === 0
                    ? "lg:col-span-2 lg:pl-0 lg:pr-0"
                    : index % 2 === 0
                      ? "lg:border-r lg:pl-0"
                      : "lg:pr-0"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[length:var(--type-micro)] tracking-[var(--tracking-label)] text-graphite-soft"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="text-balance text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-[52ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-[var(--border-hairline)] bg-[var(--surface-paper-soft)]">
        <Container className="reveal-group grid gap-10 py-[var(--section-y-content-band)] lg:grid-cols-[minmax(14rem,0.34fr)_minmax(0,0.66fr)] lg:gap-20">
          <p className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-elaman-blue">
            {content.approach.label}
          </p>
          <div>
            <h2 className="max-w-[18ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.approach.title}
            </h2>
            <div className="mt-7 grid max-w-[68rem] gap-5 text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted sm:grid-cols-2 sm:gap-10">
              {content.approach.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <DetailClosing content={content} inverse />
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
