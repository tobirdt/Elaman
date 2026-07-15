import Image from "next/image";

import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ContactSectionProps = {
  content: LocalizedSiteContent["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-[var(--surface-paper)]">
      <div className="relative h-56 overflow-hidden bg-navy sm:h-72 lg:h-80">
        <Image
          src="/images/elaman-munich-office.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[68%_center] saturate-[0.82]"
        />
        <div className="absolute inset-0 bg-navy/40" aria-hidden="true" />
        <Container className="relative flex h-full items-center justify-center text-center">
          <h2 className="max-w-[24ch] text-balance text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--color-on-dark)]">
            {content.officeTitle}
          </h2>
        </Container>
      </div>

      <Container className="py-7 sm:py-9">
        <dl className="grid border-y border-[var(--border-hairline)] md:grid-cols-3 md:border-y-0">
          <div className="border-b border-[var(--border-hairline)] py-5 md:border-b-0 md:border-r md:px-7 md:first:pl-0">
            <dt className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-graphite-soft">
              {content.labels.address}
            </dt>
            <dd className="mt-3 text-sm leading-6 text-graphite-muted">
              <address className="not-italic">{content.addressLines.join(", ")}</address>
            </dd>
          </div>
          <div className="border-b border-[var(--border-hairline)] py-5 md:border-b-0 md:border-r md:px-7">
            <dt className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-graphite-soft">
              {content.labels.phone}
            </dt>
            <dd className="mt-3 text-sm leading-6">
              <a
                href={`tel:${content.phoneHref}`}
                className="inline-flex min-h-11 items-center text-graphite-muted transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue"
              >
                {content.phone}
              </a>
            </dd>
          </div>
          <div className="py-5 md:px-7 md:last:pr-0">
            <dt className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-graphite-soft">
              {content.labels.email}
            </dt>
            <dd className="mt-3 text-sm leading-6">
              <a
                href={content.emailHref}
                className="inline-flex min-h-11 items-center text-graphite-muted transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue"
              >
                {content.email}
              </a>
            </dd>
          </div>
        </dl>
      </Container>

      <div className="bg-navy py-[var(--section-y-content-band)]">
        <Container size="content">
          <div className="text-center text-[var(--color-on-dark)]">
            <h2 className="text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)]">
              {content.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[38rem] text-sm leading-6 text-[var(--color-on-dark-muted)]">
              {content.intro}
            </p>
          </div>

          <div className="mx-auto mt-9 max-w-[52rem] rounded-[var(--radius-card)] border border-[var(--border-on-navy)] bg-[var(--surface-paper)] p-5 sm:p-8 lg:p-10">
            <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.form.title}
            </h3>
            <p className="mt-3 max-w-[38rem] text-sm leading-6 text-graphite-muted">
              {content.form.intro}
            </p>
            <div className="mt-7">
              <ContactForm content={content.form} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
