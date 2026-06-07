import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import type { LocalizedSiteContent } from "@/lib/content/site";

type TrustSectionProps = {
  content: LocalizedSiteContent["trust"];
};

export function TrustSection({ content }: TrustSectionProps) {
  return (
    <Section
      id="experience"
      compact
      className="border-y border-line bg-porcelain/70"
    >
      <Container className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="text-balance max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-graphite-muted">
            {content.body}
          </p>
        </div>

        <GlassPanel className="glass-surface-strong overflow-hidden p-5 sm:p-7">
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {content.metrics.map((metric, index) => (
              <div key={metric.value} className="relative bg-white/80 p-5 sm:p-6">
                <TechnicalMark tone={index === 1 ? "red" : "blue"} />
                <p className="mt-5 text-[2.4rem] font-semibold leading-none tracking-[-0.06em] text-graphite">
                  {metric.value}
                </p>
                <p className="mt-3 text-xs leading-5 text-graphite-muted">
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
              <div
                key={pillar}
                className="flex items-center gap-3 rounded-lg border border-line bg-white/66 px-4 py-3"
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${index === 0 || index === 2 ? "bg-elaman-blue" : "bg-elaman-red/70"}`}
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-graphite-muted">{pillar}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </Container>
    </Section>
  );
}
