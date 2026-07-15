import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ScrollStoryProps = {
  content: LocalizedSiteContent["story"];
};

export function ScrollStory({ content }: ScrollStoryProps) {
  const steps = [
    content.steps[1],
    content.steps[2],
    content.steps[3],
    content.steps[5],
  ].filter(Boolean);

  return (
    <Section id="story" variant="screen" tone="white">
      <Container>
        <div className="grid gap-[var(--section-gap)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <SectionHeader body={content.mobileBody} title={content.title} width="copy" />

          <ol className="border-t border-[var(--border-hairline-strong)]">
            {steps.map((step) => (
              <li
                key={step.id}
                className="grid gap-2 border-b border-[var(--border-hairline)] py-6 sm:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1fr)] sm:gap-8"
              >
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-graphite">
                  {step.mobileTitle ?? step.title}
                </h3>
                <p className="max-w-md text-sm leading-6 text-graphite-muted">
                  {step.mobileSummary}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
