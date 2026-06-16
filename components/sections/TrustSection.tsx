import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import type { LocalizedSiteContent } from "@/lib/content/site";

type TrustSectionProps = {
  content: LocalizedSiteContent["trust"];
};

export function TrustSection({ content }: TrustSectionProps) {
  return (
    <Section
      id="experience"
      variant="content-band"
      tone="soft"
      className="border-y border-[var(--border-soft)]"
    >
      <Container className="grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
        <SectionHeader
          body={content.body}
          label={content.label}
          title={content.title}
          width="copy"
        />

        <div>
          <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-white md:grid-cols-3">
            {content.metrics.map((metric, index) => (
              <div
                key={metric.value}
                className="relative border-t border-[var(--border-soft)] p-5 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0 sm:p-6"
              >
                <TechnicalMark tone={index === 1 ? "red" : "blue"} />
                <p className="mt-5 text-2xl font-semibold leading-none tracking-[var(--tracking-title)] text-graphite">
                  {metric.value}
                </p>
                <p className="mt-3 text-[length:var(--type-micro)] leading-5 text-graphite-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {content.pillars.map((pillar, index) => (
              <div
                key={pillar}
                className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-white px-4 py-3"
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${index === 0 || index === 2 ? "bg-elaman-blue" : "bg-elaman-red/70"}`}
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-graphite-muted">{pillar}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
