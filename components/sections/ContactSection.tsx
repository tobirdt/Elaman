import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ContactSectionProps = {
  content: LocalizedSiteContent["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <Section id="contact" compact screen>
      <Container>
        <GlassPanel className="glass-surface-strong grid gap-6 overflow-hidden p-5 [&>*]:min-w-0 sm:p-7 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <SectionLabel>{content.officeTitle}</SectionLabel>
              <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-[3.4rem]">
                {content.title}
              </h2>
              <p className="mt-4 max-w-xs text-[0.94rem] leading-7 text-graphite-muted">
                {content.intro}
              </p>
            </div>

            <div className="grid gap-2.5">
              <div className="rounded-xl border border-line bg-white/74 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-elaman-blue">
                  {content.labels.address}
                </p>
                <address className="mt-2.5 not-italic text-sm leading-7 text-graphite-muted">
                  {content.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-white/74 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-elaman-blue">
                    {content.labels.phone}
                  </p>
                  <a
                    href={`tel:${content.phoneHref}`}
                    className="mt-2.5 block text-sm leading-7 text-graphite-muted transition hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
                  >
                    {content.phone}
                  </a>
                </div>
                <div className="rounded-xl border border-line bg-white/74 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-elaman-blue">
                    {content.labels.email}
                  </p>
                  <a
                    href={content.emailHref}
                    className="mt-2.5 block text-sm leading-7 text-graphite-muted transition hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
                  >
                    {content.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line/80 bg-white/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_16px_60px_rgba(22,24,29,0.04)] sm:p-6">
            <SectionLabel tone="red">{content.form.label}</SectionLabel>
            <h3 className="text-[1.6rem] font-semibold leading-tight tracking-[-0.04em] text-graphite">
              {content.form.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-graphite-muted">
              {content.form.intro}
            </p>
            <div className="mt-5">
              <ContactForm content={content.form} />
            </div>
          </div>
        </GlassPanel>
      </Container>
    </Section>
  );
}
