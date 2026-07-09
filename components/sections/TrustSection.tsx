import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { Stat } from "@/components/ui/Stat";
import type { LocalizedSiteContent } from "@/lib/content/site";

type TrustSectionProps = {
  content: LocalizedSiteContent["trust"];
};

export function TrustSection({ content }: TrustSectionProps) {
  return (
    <Section id="experience" variant="content-band">
      <Container>
        <SectionRule index="01" keyword={content.label} />

        <div className="mt-10 grid gap-[var(--section-gap)] lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] [&>*]:min-w-0">
          <Reveal>
            <SectionHeader body={content.body} title={content.title} width="copy" />
          </Reveal>

          <div>
            <RevealGroup className="grid md:grid-cols-3" stagger={0.09}>
              {content.metrics.map((metric, index) => (
                <RevealItem
                  key={metric.value}
                  className={`flex flex-col justify-end border-[var(--border-hairline)] py-6 md:py-2 ${
                    index === 0
                      ? "border-t md:border-t-0 md:pr-6"
                      : "border-t md:border-l md:border-t-0 md:px-6"
                  }`}
                >
                  <Stat
                    caption={metric.label}
                    size={metric.value.length <= 6 ? "numeral" : "h3"}
                    value={metric.value}
                  />
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup className="mt-12" stagger={0.06}>
              {content.pillars.map((pillar, index) => (
                <RevealItem key={pillar}>
                  <div className="flex items-baseline gap-5 border-t border-[var(--border-hairline)] py-3.5">
                    <span className="font-mono-label shrink-0 text-graphite-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[length:var(--type-body)] font-medium text-graphite-muted">
                      {pillar}
                    </p>
                  </div>
                </RevealItem>
              ))}
              <div className="rule-hairline" aria-hidden="true" />
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
