import { MobileStoryVisual } from "@/components/motion/MobileStoryVisual";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SectionRule } from "@/components/ui/SectionRule";
import type { LocalizedSiteContent } from "@/lib/content/site";

type MobileStorySequenceProps = {
  story: LocalizedSiteContent["story"];
};

export function MobileStorySequence({ story }: MobileStorySequenceProps) {
  return (
    <Container className="py-[var(--section-y-screen)]">
      <SectionRule index="02" keyword={story.label} />
      <div className="mt-9">
        <MonoLabel>{story.progressLabel}</MonoLabel>
        <h2 className="mt-4 max-w-[13ch] text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
          {story.mobileTitle}
        </h2>
        <p className="mt-5 max-w-[36rem] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
          {story.mobileBody}
        </p>
      </div>

      <ol className="mt-12 divide-y divide-[var(--border-hairline)] border-b border-[var(--border-hairline)]">
        {story.steps.map((step, index) => (
          <li key={step.id} className="py-10 first:pt-0">
            <MonoLabel tone={index === 3 ? "red" : "blue"}>{step.eyebrow}</MonoLabel>
            <h3 className="mt-4 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {step.mobileTitle ?? step.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-graphite-muted">
              {step.mobileSummary}
            </p>
            <MobileStoryVisual index={index} />
            <ul className="mt-5 divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
              {step.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bullet}
                  className="grid grid-cols-[2rem_1fr] gap-3 py-3 text-sm text-graphite-muted"
                >
                  <span className="font-mono text-[0.65rem] tabular-nums text-graphite-soft">
                    {String(bulletIndex + 1).padStart(2, "0")}
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Container>
  );
}
