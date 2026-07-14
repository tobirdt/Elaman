import Image from "next/image";

import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Surface } from "@/components/ui/Surface";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ContactSectionProps = {
  content: LocalizedSiteContent["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  const contactRows = [
    {
      label: content.labels.address,
      value: (
        <address className="not-italic">
          {content.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ),
    },
    {
      href: `tel:${content.phoneHref}`,
      label: content.labels.phone,
      value: content.phone,
    },
    {
      label: content.labels.fax,
      value: content.fax,
    },
    {
      href: content.emailHref,
      label: content.labels.email,
      value: content.email,
    },
  ];

  return (
    <Section id="contact" variant="content-band" tone="white" className="relative">
      <div
        className="technical-grid absolute inset-x-0 top-0 h-80 opacity-25"
        aria-hidden="true"
      />
      <Container className="relative grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
        <div>
          <SectionHeader
            body={content.intro}
            label={content.officeTitle}
            size="h2"
            title={content.title}
            width="copy"
          />

          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-[var(--surface-soft)]">
            <Image
              src="/images/elaman-munich-office.jpg"
              alt={content.officeTitle}
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="object-cover object-[72%_center] saturate-[0.82]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-graphite/22 via-transparent to-white/5"
              aria-hidden="true"
            />
          </div>

          <div className="mt-8 divide-y divide-[var(--border-soft)] border-y border-[var(--border-soft)]">
            {contactRows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
              >
                <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-blue">
                  {row.label}
                </p>
                {row.href ? (
                  <a
                    href={row.href}
                    className="text-sm leading-7 text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
                  >
                    {row.value}
                  </a>
                ) : (
                  <div className="text-sm leading-7 text-graphite-muted">{row.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Surface variant="panel" className="p-5 sm:p-7 lg:p-8">
          <SectionLabel tone="red">{content.form.label}</SectionLabel>
          <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
            {content.form.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-graphite-muted">
            {content.form.intro}
          </p>
          <div className="mt-6">
            <ContactForm content={content.form} />
          </div>
        </Surface>
      </Container>
    </Section>
  );
}
