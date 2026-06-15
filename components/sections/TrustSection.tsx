import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Surface } from "@/components/ui/Surface";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import type { LocalizedSiteContent } from "@/lib/content/site";

type TrustSectionProps = {
  content: LocalizedSiteContent["trust"];
};

export function TrustSection({ content }: TrustSectionProps) {
  return (
    <Section
      id="experience"
      variant="band"
      tone="soft"
      className="border-y border-[var(--border-soft)]"
    >
      <Container className="grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-2 lg:items-center">
        <SectionHeader
          body={content.body}
          label={content.label}
          title={content.title}
          width="copy"
        />

        <Surface variant="strongGlass" className="overflow-hidden p-5 sm:p-7">
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-line md:grid-cols-3">
            {content.metrics.map((metric, index) => (
              <div
                key={metric.value}
                className="relative bg-[var(--surface-card)] p-5 sm:p-6"
              >
                <TechnicalMark tone={index === 1 ? "red" : "blue"} />
                <p className="mt-5 text-[length:var(--type-h2)] font-semibold leading-none tracking-[var(--tracking-display)] text-graphite">
                  {metric.value}
                </p>
                <p className="mt-3 text-[length:var(--type-micro)] leading-5 text-graphite-muted">
                  {metric.label}
                </p>
                {index < 2 && (
                  <div className="absolute right-0 top-6 hidden h-[calc(100%-3rem)] w-px bg-line md:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {content.pillars.map((pillar, index) => (
              <Surface
                key={pillar}
                variant="inset"
                className="flex items-center gap-3 px-4 py-3"
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${index === 0 || index === 2 ? "bg-elaman-blue" : "bg-elaman-red/70"}`}
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-graphite-muted">{pillar}</p>
              </Surface>
            ))}
          </div>
        </Surface>
      </Container>
    </Section>
  );
}
