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
    <Section id="contact" variant="content-band">
      <Container>
        <SectionRule accent="red" index="07" keyword={content.officeTitle} />

        <div className="mt-10 grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:mt-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <Reveal>
            <SectionHeader body={content.intro} size="h2" title={content.title} width="copy" />

            <div className="mt-8 border-t border-[var(--border-hairline)]">
              {contactRows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 border-b border-[var(--border-hairline)] py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
                >
                  <p className="font-mono-label text-elaman-blue">{row.label}</p>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="text-sm leading-7 text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:text-graphite"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <div className="text-sm leading-7 text-graphite-muted">{row.value}</div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="rise" delay={0.06}>
            <MonoLabel tone="red">{content.form.label}</MonoLabel>
            <h3 className="mt-3 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.form.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-graphite-muted">{content.form.intro}</p>
            <div className="mt-6">
              <ContactForm content={content.form} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
