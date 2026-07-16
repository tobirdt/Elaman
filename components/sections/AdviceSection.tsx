import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type AdviceSectionProps = {
  content: LocalizedSiteContent["advice"];
};

export function AdviceSection({ content }: AdviceSectionProps) {
  return (
    <Section id="advice" variant="screen" tone="soft" className="flex">
      <Container className="flex flex-1 flex-col justify-center py-[var(--section-y-screen)]">
        <div className="max-w-[60rem]">
          <h2 className="max-w-[22ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
            {content.title}
          </h2>
          <p className="mt-6 max-w-[62ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
            {content.intro}
          </p>
        </div>

        <ol className="mt-12 grid lg:mt-16 lg:grid-cols-4 lg:gap-8 lg:border-t lg:border-[var(--border-hairline-strong)]">
          {content.steps.map((step, index) => (
            <li
              key={step.title}
              className="border-t border-[var(--border-hairline)] py-8 first:border-[var(--border-hairline-strong)] lg:border-t-0 lg:pb-0 lg:pt-8"
            >
              <span
                className="font-mono text-[length:var(--type-h3)] font-normal leading-none tracking-[var(--tracking-title)] text-elaman-blue"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 max-w-[17ch] text-[length:var(--type-body)] font-semibold leading-6 tracking-[-0.01em] text-graphite">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[31ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
