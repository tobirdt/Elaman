import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import type {
  CompanyDetailContent,
  DetailPageContent,
  ProtectionDetailContent,
  SystemsDetailContent,
} from "@/lib/content/detail-pages";

type DetailDossierProps = {
  content: DetailPageContent;
};

function BackLink({
  href,
  label,
  inverse = false,
}: {
  href: string;
  label: string;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href as Route}
      className={`inline-flex min-h-11 items-center gap-2 text-[length:var(--type-small)] transition-colors [transition-duration:var(--motion-fast)] ${
        inverse
          ? "text-[var(--color-on-dark-muted)] hover:text-[var(--color-on-dark)]"
          : "text-graphite-soft hover:text-elaman-blue"
      }`}
    >
      <span aria-hidden="true">←</span>
      {label}
    </Link>
  );
}

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
      <Container className="flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center sm:py-14">
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

function CompanyDossier({ content }: { content: CompanyDetailContent }) {
  return (
    <article>
      <section className="grid min-h-[calc(100svh-var(--header-h))] border-b border-[var(--border-hairline)] bg-[var(--surface-paper)] lg:grid-cols-[minmax(0,0.56fr)_minmax(22rem,0.44fr)]">
        <div className="flex min-w-0 items-center px-[var(--page-x-left)] py-[var(--section-y-screen)] lg:pl-[var(--page-x-left)] lg:pr-[clamp(3rem,7vw,7rem)]">
          <div className="hero-copy-enter min-w-0 max-w-[44rem]">
            <BackLink href={content.back.href} label={content.back.label} />
            <p className="mt-10 font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-elaman-blue">
              {content.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[18ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.title}
            </h1>
            <p className="mt-7 max-w-[58ch] text-[length:var(--type-lead)] leading-[1.6] text-graphite-muted">
              {content.lead}
            </p>
          </div>
        </div>
        <div className="hero-image-enter relative min-h-[38svh] min-w-0 overflow-hidden bg-[var(--surface-paper-soft)] lg:min-h-full">
          <Image
            src="/images/elaman-munich-office.jpg"
            alt={content.heroAlt}
            fill
            priority
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover object-[63%_center] saturate-[0.78]"
          />
        </div>
      </section>

      <section className="bg-[var(--surface-paper-soft)]">
        <Container className="py-[var(--section-y-content-band)]">
          <ol className="grid border-t border-[var(--border-hairline-strong)] lg:grid-cols-3">
            {content.principles.map((principle, index) => (
              <li
                key={principle.title}
                className="border-b border-[var(--border-hairline)] py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="font-mono text-[length:var(--type-micro)] tracking-[var(--tracking-label)] text-elaman-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-8 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                  {principle.title}
                </h2>
                <p className="mt-4 max-w-[40ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                  {principle.description}
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
          <div className="max-w-[39rem]">
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
                href="/imprint"
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

function SystemsDossier({ content }: { content: SystemsDetailContent }) {
  return (
    <article>
      <section className="grid min-h-[calc(100svh-var(--header-h))] bg-navy text-[var(--color-on-dark)] lg:grid-cols-[minmax(22rem,0.44fr)_minmax(0,0.56fr)]">
        <div className="hero-image-enter relative min-h-[40svh] min-w-0 overflow-hidden bg-navy lg:min-h-full">
          <Image
            src="/images/elaman-systems-media-mining.jpg"
            alt={content.heroAlt}
            fill
            priority
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover object-[52%_43%] saturate-[0.52] contrast-[1.04]"
          />
          <div className="absolute inset-0 bg-navy/42" aria-hidden="true" />
        </div>
        <div className="flex min-w-0 items-center border-t border-[var(--border-on-navy)] px-[var(--page-x-right)] py-[var(--section-y-screen)] lg:border-l lg:border-t-0 lg:pl-[clamp(3rem,7vw,7rem)] lg:pr-[var(--page-x-right)]">
          <div className="hero-copy-enter min-w-0 max-w-[47rem]">
            <BackLink href={content.back.href} label={content.back.label} inverse />
            <p className="mt-10 font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-[var(--color-on-dark-muted)]">
              {content.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[17ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-[var(--color-on-dark)]">
              {content.title}
            </h1>
            <p className="mt-7 max-w-[60ch] text-[length:var(--type-lead)] leading-[1.6] text-[var(--color-on-dark-muted)]">
              {content.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-paper)]">
        <Container className="py-[var(--section-y-content-band)]">
          <p className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-elaman-blue">
            {content.portfolioLabel}
          </p>
          <ol className="mt-8 grid border-t border-[var(--border-hairline-strong)] lg:grid-cols-2">
            {content.portfolio.map((item, index) => (
              <li
                key={item.title}
                className={`grid gap-3 border-b border-[var(--border-hairline)] py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4 lg:gap-6 lg:px-8 lg:py-9 ${
                  index % 2 === 0 ? "lg:border-r lg:pl-0" : "lg:pr-0"
                }`}
              >
                <span className="font-mono text-[length:var(--type-micro)] tracking-[var(--tracking-label)] text-graphite-soft">
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
        <Container className="grid gap-10 py-[var(--section-y-content-band)] lg:grid-cols-[minmax(14rem,0.34fr)_minmax(0,0.66fr)] lg:gap-20">
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

function ProtectionDossier({ content }: { content: ProtectionDetailContent }) {
  return (
    <article>
      <section className="flex min-h-[calc(100svh-var(--header-h))] flex-col border-b border-[var(--border-hairline)] bg-[var(--surface-paper)]">
        <div className="hero-image-enter relative h-[clamp(18rem,40svh,23rem)] shrink-0 overflow-hidden bg-navy">
          <Image
            src="/images/elaman-protection.png"
            alt={content.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/16" aria-hidden="true" />
        </div>
        <Container className="hero-copy-enter grid flex-1 items-center gap-8 py-10 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:gap-16 lg:py-12">
          <div>
            <BackLink href={content.back.href} label={content.back.label} />
            <div className="mt-7 flex items-center gap-3">
              <span className="size-2 rounded-full bg-elaman-red" aria-hidden="true" />
              <p className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft">
                {content.eyebrow}
              </p>
            </div>
            <h1 className="mt-5 max-w-[17ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.title}
            </h1>
          </div>
          <p className="max-w-[58ch] text-[length:var(--type-lead)] leading-[1.6] text-graphite-muted lg:border-l lg:border-[var(--border-hairline-strong)] lg:pl-10">
            {content.lead}
          </p>
        </Container>
      </section>

      {content.groups.map((group, index) => (
        <section
          key={group.number}
          className={`grid border-b border-[var(--border-hairline)] ${
            index % 2 === 0
              ? "bg-[var(--surface-paper-soft)] lg:grid-cols-[minmax(22rem,0.47fr)_minmax(0,0.53fr)]"
              : "bg-[var(--surface-paper)] lg:grid-cols-[minmax(0,0.53fr)_minmax(22rem,0.47fr)]"
          }`}
        >
          <div
            className={`relative min-h-[24rem] min-w-0 overflow-hidden bg-navy lg:min-h-[45rem] ${
              index % 2 === 1 ? "lg:order-2" : ""
            }`}
          >
            <Image
              src={group.image}
              alt={group.imageAlt}
              fill
              sizes="(min-width: 1024px) 47vw, 100vw"
              className={`object-cover ${index === 0 ? "object-[58%_center]" : "object-center"}`}
            />
            <div className="absolute inset-0 bg-navy/12" aria-hidden="true" />
          </div>
          <div
            className={`flex min-w-0 items-center px-[var(--page-x-left)] py-[var(--section-y-content-band)] ${
              index % 2 === 1
                ? "lg:pl-[var(--page-x-left)] lg:pr-[clamp(3rem,7vw,7rem)]"
                : "lg:pl-[clamp(3rem,7vw,7rem)] lg:pr-[var(--page-x-right)]"
            }`}
          >
            <div className="min-w-0 w-full max-w-[44rem]">
              <span className="font-mono text-[length:var(--type-h3)] leading-none text-elaman-blue">
                {group.number}
              </span>
              <h2 className="mt-7 max-w-[18ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                {group.title}
              </h2>
              <p className="mt-6 max-w-[58ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                {group.body}
              </p>
              <div className="mt-9 grid sm:grid-cols-2 sm:gap-8">
                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className="border-t border-[var(--border-hairline-strong)] py-5"
                  >
                    <h3 className="text-[length:var(--type-body)] font-semibold leading-6 text-graphite">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[length:var(--type-small)] leading-6 text-graphite-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <DetailClosing content={content} />
    </article>
  );
}

export function DetailDossier({ content }: DetailDossierProps) {
  switch (content.kind) {
    case "company":
      return <CompanyDossier content={content} />;
    case "systems":
      return <SystemsDossier content={content} />;
    case "protection":
      return <ProtectionDossier content={content} />;
  }
}
