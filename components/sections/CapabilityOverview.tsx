import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import type { LocalizedSiteContent } from "@/lib/content/site";

type CapabilityOverviewProps = {
  content: LocalizedSiteContent["capabilities"];
};

export function CapabilityOverview({ content }: CapabilityOverviewProps) {
  const redIndex = 2;

  return (
    <Section id="capabilities" variant="content-band">
      <Container>
        <SectionRule index="03" keyword={content.label} />

        <div className="mt-10 lg:mt-14">
          <Reveal>
            <SectionHeader body={content.body} title={content.title} width="copy" />
          </Reveal>

          <RevealGroup className="mt-10" stagger={0.09}>
            {content.items.map((item, index) => (
              <RevealItem key={item.title}>
                <article className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-6 gap-y-3 border-t border-[var(--border-hairline)] py-6 transition-colors [transition-duration:var(--motion-fast)] sm:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.4fr)] sm:items-start sm:gap-x-8 sm:hover:bg-[var(--surface-paper-soft)]">
                  <span
                    className={`font-mono-label transition-colors [transition-duration:var(--motion-fast)] ${
                      index === redIndex
                        ? "text-elaman-red"
                        : "text-graphite-soft group-hover:text-elaman-blue"
                    }`}
                  >
                    {item.eyebrow ?? String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                    {item.title}
                  </h3>
                  <p className="col-span-2 text-base leading-7 text-graphite-muted sm:col-span-1">
                    {item.description}
                  </p>
                </article>
              </RevealItem>
            ))}
            <div className="rule-hairline" aria-hidden="true" />
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
