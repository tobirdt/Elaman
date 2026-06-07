import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import { trustContent } from "@/lib/content/capabilities";

export function TrustSection() {
  return (
    <Section
      id="experience"
      compact
      screen
      className="border-y border-line bg-porcelain/70"
    >
      <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <SectionLabel>{trustContent.label}</SectionLabel>
          <h2 className="text-balance max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-6xl">
            {trustContent.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-graphite-muted">
            {trustContent.body}
          </p>
        </div>

        <GlassPanel className="glass-surface-strong overflow-hidden p-5 sm:p-7">
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {trustContent.metrics.map((metric, index) => (
              <div key={metric.value} className="bg-white/78 p-5">
                <TechnicalMark tone={index === 1 ? "red" : "blue"} />
                <p className="mt-6 text-4xl font-semibold tracking-[-0.055em] text-graphite">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-graphite-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {trustContent.pillars.map((pillar) => (
              <div
                key={pillar}
                className="flex items-center gap-3 rounded-sm border border-line bg-white/62 p-4"
              >
                <span className="size-1.5 rounded-full bg-elaman-blue" />
                <p className="text-sm font-medium text-graphite-muted">{pillar}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </Container>
    </Section>
  );
}
