import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import type { LocalizedSiteContent } from "@/lib/content/site";

type AdviceSectionProps = {
  content: LocalizedSiteContent["advice"];
};

/**
 * The four stages, named only. The company page tells them at length, and
 * printing both versions meant a visitor read the same four paragraphs twice
 * and could not see what the subpage added. The numerals stay because the
 * stages are a real sequence; the systems teaser below has none, because a
 * portfolio is a set rather than an order.
 */
export function AdviceSection({ content }: AdviceSectionProps) {
  return (
    <Section id="advice" variant="content-band" tone="soft">
      <Container>
        <SectionIntro label={content.label} title={content.title} lead={content.intro} />

        <ol className="reveal-group mt-11 grid border-t border-[var(--border-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {content.steps.map((step, index) => (
            <li
              key={step.title}
              className="border-b border-[var(--border-hairline)] py-6 lg:border-b-0 lg:pb-0"
            >
              <span
                className="font-mono text-[length:var(--type-micro)] tracking-[var(--tracking-label)] text-elaman-blue"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 max-w-[17ch] text-[length:var(--type-body)] font-semibold leading-6 tracking-[-0.01em] text-graphite">
                {step.title}
              </h3>
            </li>
          ))}
        </ol>

        <div className="reveal mt-9">
          <TextLink href={content.detailLink.href} label={content.detailLink.label} />
        </div>
      </Container>
    </Section>
  );
}
