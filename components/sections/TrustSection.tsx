import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import type { LocalizedSiteContent } from "@/lib/content/site";

type TrustSectionProps = {
  content: LocalizedSiteContent["trust"];
};

const evidencePointTones = [
  "bg-graphite-soft",
  "bg-elaman-blue",
  "bg-elaman-red",
] as const;

export function TrustSection({ content }: TrustSectionProps) {
  return (
    <Section id="experience" variant="content-band" tone="soft">
      <Container>
        <SectionRule index="01" keyword={content.label} />

        <div className="mt-10 grid gap-[var(--section-gap)] lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] [&>*]:min-w-0">
          <Reveal>
            <SectionHeader body={content.body} title={content.title} width="copy" />
          </Reveal>

          <div>
            <RevealGroup
              className="border-t border-[var(--border-hairline)]"
              stagger={0.09}
            >
              {content.metrics.map((metric, index) => (
                <RevealItem
                  key={metric.value}
                  className="border-b border-[var(--border-hairline)]"
                >
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-5 sm:gap-6 sm:py-6">
                    <span
                      aria-hidden="true"
                      className="flex min-w-9 items-center gap-2 pt-1.5"
                    >
                      <span
                        className={
                          "size-1.5 rounded-full " +
                          (evidencePointTones[index] ?? "bg-graphite-soft")
                        }
                      />
                      <span className="font-mono-label text-graphite-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <div>
                      <p className="text-balance text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                        {metric.value}
                      </p>
                      <p className="mt-2 max-w-[38rem] text-sm leading-6 text-graphite-muted">
                        {metric.label}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-8">
              <p className="font-mono-label text-elaman-blue">{content.contextsLabel}</p>
              <ul className="mt-4 grid gap-x-6 sm:grid-cols-3">
                {content.pillars.map((pillar) => (
                  <li
                    key={pillar}
                    className="border-t border-[var(--border-hairline)] py-3 text-sm leading-6 text-graphite-muted"
                  >
                    {pillar}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
