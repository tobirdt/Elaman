import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ProtectionSectionProps = {
  content: LocalizedSiteContent["protection"];
};

export function ProtectionSection({ content }: ProtectionSectionProps) {
  return (
    <Section
      id="protection"
      variant="screen-lite"
      className="relative isolate overflow-hidden bg-[var(--surface-dark-panel)] text-[var(--color-on-dark)]"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elaman-red/42 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-elaman-red/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="technical-grid absolute inset-0 opacity-[0.08]"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-red">
              <span className="h-px w-8 bg-current sm:w-9" aria-hidden="true" />
              {content.label}
            </p>
            <h2 className="text-balance max-w-[var(--container-copy)] text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-[var(--color-on-dark)]">
              {content.title}
            </h2>
            <p className="mt-5 max-w-[var(--container-copy)] text-[length:var(--type-lead)] leading-[var(--leading-body)] text-[var(--color-on-dark-muted)]">
              {content.body}
            </p>

            <div className="relative mt-9 hidden h-28 w-28 lg:block" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-4 rounded-full border border-elaman-blue/20" />
              <div className="absolute inset-8 rounded-full border border-elaman-red/24" />
              <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-elaman-red/70" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-8 left-5 hidden w-px bg-gradient-to-b from-elaman-red/42 via-white/14 to-elaman-blue/28 sm:block" />
            <div className="grid gap-3">
              {content.items.map((item, index) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.16)] transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:border-white/18 hover:bg-white/[0.065]"
                >
                  <div className="flex gap-4">
                    <TechnicalMark
                      tone={index === 0 || index === 2 ? "red" : "blue"}
                      className="shrink-0"
                    />
                    <div>
                      <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-[var(--color-on-dark)]">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-7 text-[var(--color-on-dark-muted)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
