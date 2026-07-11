import Image from "next/image";

import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionRule } from "@/components/ui/SectionRule";
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
      href: "tel:" + content.phoneHref,
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
    <Section id="contact" variant="content-band">
      <Container>
        <SectionRule accent="red" index="07" keyword={content.officeTitle} />

        <div className="mt-10 grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:mt-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <Reveal className="order-2 lg:order-1">
            <SectionHeader
              body={content.intro}
              size="h2"
              title={content.title}
              width="copy"
            />

            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-hairline)] bg-[var(--surface-paper-soft)]">
              <Image
                src="/images/elaman-munich-office.jpg"
                alt={content.officeImageAlt}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover object-[72%_center] saturate-[0.82]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-graphite/22 via-transparent to-white/5"
                aria-hidden="true"
              />
            </div>

            <dl className="mt-8 border-t border-[var(--border-hairline)]">
              {contactRows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 border-b border-[var(--border-hairline)] py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="font-mono-label text-elaman-blue">{row.label}</dt>
                  <dd className="m-0">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="inline-flex min-h-11 items-center text-base leading-7 text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:text-graphite"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <div className="text-base leading-7 text-graphite-muted">
                        {row.value}
                      </div>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="order-1 lg:order-2" variant="rise" delay={0.06}>
            <MonoLabel tone="red">{content.form.label}</MonoLabel>
            <h3 className="mt-3 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.form.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-graphite-muted">
              {content.form.intro}
            </p>
            <div className="mt-6">
              <ContactForm content={content.form} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
