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
  return (
    <Section id="contact" variant="band">
      <Container>
        <Surface
          variant="strongGlass"
          className="grid gap-6 overflow-hidden p-5 [&>*]:min-w-0 sm:p-7 lg:grid-cols-2 lg:p-8"
        >
          <div className="flex flex-col gap-6">
            <SectionHeader
              body={content.intro}
              label={content.officeTitle}
              size="h2"
              title={content.title}
              width="narrow"
            />

            <div className="grid gap-2.5">
              <Surface variant="card" className="p-4 shadow-none">
                <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-blue">
                  {content.labels.address}
                </p>
                <address className="mt-2.5 not-italic text-sm leading-7 text-graphite-muted">
                  {content.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Surface>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <Surface variant="card" className="p-4 shadow-none">
                  <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-blue">
                    {content.labels.phone}
                  </p>
                  <a
                    href={`tel:${content.phoneHref}`}
                    className="mt-2.5 block text-sm leading-7 text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
                  >
                    {content.phone}
                  </a>
                </Surface>
                <Surface variant="card" className="p-4 shadow-none">
                  <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-blue">
                    {content.labels.email}
                  </p>
                  <a
                    href={content.emailHref}
                    className="mt-2.5 block text-sm leading-7 text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
                  >
                    {content.email}
                  </a>
                </Surface>
              </div>
            </div>
          </div>

          <Surface variant="panel" className="p-5 sm:p-6">
            <SectionLabel tone="red">{content.form.label}</SectionLabel>
            <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.form.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-graphite-muted">
              {content.form.intro}
            </p>
            <div className="mt-5">
              <ContactForm content={content.form} />
            </div>
          </Surface>
        </Surface>
      </Container>
    </Section>
  );
}
