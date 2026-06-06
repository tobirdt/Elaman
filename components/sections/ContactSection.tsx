import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contactDetails } from "@/lib/content/contact";

export function ContactSection() {
  return (
    <Section id="contact">
      <Container>
        <GlassPanel className="glass-surface-strong grid gap-10 overflow-hidden p-6 sm:p-9 lg:grid-cols-[0.86fr_1.14fr] lg:p-12">
          <div className="flex flex-col gap-8">
            <div>
              <SectionLabel>{contactDetails.officeTitle}</SectionLabel>
              <h2 className="text-5xl font-semibold leading-[1.03] tracking-[-0.045em] text-graphite md:text-6xl">
                Contact
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-graphite-muted">
                Direct contact details and a structured inquiry form for Elaman GmbH in
                Munich.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-sm border border-line bg-white/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-elaman-blue">
                  Address
                </p>
                <p className="mt-4 text-sm leading-7 text-graphite-muted">
                  {contactDetails.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-sm border border-line bg-white/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-elaman-blue">
                    Phone
                  </p>
                  <a
                    href={`tel:${contactDetails.phoneHref}`}
                    className="mt-4 block text-sm leading-7 text-graphite-muted transition hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
                  >
                    {contactDetails.phone}
                  </a>
                </div>
                <div className="rounded-sm border border-line bg-white/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-elaman-blue">
                    Email
                  </p>
                  <a
                    href={contactDetails.emailHref}
                    className="mt-4 block text-sm leading-7 text-graphite-muted transition hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
                  >
                    {contactDetails.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white/72 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-7">
            <SectionLabel tone="red">{contactDetails.formLabel}</SectionLabel>
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-graphite">
              {contactDetails.formTitle}
            </h3>
            <p className="mt-4 text-sm leading-7 text-graphite-muted">
              {contactDetails.formIntro}
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </GlassPanel>
      </Container>
    </Section>
  );
}
