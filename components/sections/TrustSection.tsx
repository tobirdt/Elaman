import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LocalizedSiteContent } from "@/lib/content/site";

type TrustSectionProps = {
  content: LocalizedSiteContent["trust"];
};

export function TrustSection({ content }: TrustSectionProps) {
  return (
    <Section
      id="experience"
      variant="screen"
      tone="soft"
      className="border-y border-[var(--border-hairline)]"
    >
      <Container className="grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center">
        <SectionHeader body={content.body} title={content.title} width="copy" />

        <div className="grid border-y border-[var(--border-hairline-strong)] sm:grid-cols-[minmax(0,1.35fr)_minmax(12rem,0.65fr)]">
          {content.metrics.map((metric, index) => (
            <div
              key={metric.value}
              className={`flex min-h-44 flex-col justify-between gap-8 py-6 sm:min-h-60 sm:py-8 ${index === 0 ? "border-b border-[var(--border-hairline)] sm:border-b-0 sm:border-r sm:pr-10" : "sm:pl-10"}`}
            >
              <p
                className={`font-semibold leading-none tracking-[var(--tracking-title)] ${index === 0 ? "text-[clamp(4.75rem,10vw,8.5rem)] text-elaman-blue" : "text-[clamp(2rem,4vw,3.25rem)] text-graphite"}`}
              >
                {metric.value}
              </p>
              <p className="max-w-sm text-pretty text-sm leading-6 text-graphite-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
