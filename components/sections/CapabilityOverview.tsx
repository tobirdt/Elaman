import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CapabilityMark } from "@/components/ui/CapabilityMark";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import type { LocalizedSiteContent } from "@/lib/content/site";

type CapabilityOverviewProps = {
  content: LocalizedSiteContent["capabilities"];
};

const protectionIndex = 2;

export function CapabilityOverview({ content }: CapabilityOverviewProps) {
  return (
    <Section id="capabilities" variant="content-band">
      <Container>
        <SectionRule index="03" keyword={content.label} />

        <div className="mt-10 lg:mt-14">
          <Reveal>
            <SectionHeader body={content.body} title={content.title} width="copy" />
          </Reveal>

          <RevealGroup
            className="mt-10 border-t border-[var(--border-hairline)]"
            stagger={0.09}
          >
            {content.items.map((item, index) => (
              <RevealItem
                key={item.title}
                className="border-b border-[var(--border-hairline)]"
              >
                <article className="grid grid-cols-[2rem_2.75rem_minmax(0,1fr)] gap-x-3 gap-y-3 py-6 sm:grid-cols-[2.5rem_3.5rem_minmax(10rem,0.72fr)_minmax(0,1.28fr)] sm:gap-x-6 sm:py-7">
                  <span
                    className={[
                      "font-mono-label pt-1.5",
                      index === protectionIndex
                        ? "text-elaman-red"
                        : "text-graphite-soft",
                    ].join(" ")}
                  >
                    {item.eyebrow ?? String(index + 1).padStart(2, "0")}
                  </span>
                  <CapabilityMark index={index} className="mt-0.5" />
                  <h3 className="text-balance text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                    {item.title}
                  </h3>
                  <p className="col-span-3 pl-[4.75rem] text-base leading-7 text-graphite-muted sm:col-auto sm:pl-0">
                    {item.description}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
