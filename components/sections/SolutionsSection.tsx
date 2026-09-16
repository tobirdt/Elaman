import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import type { LocalizedSiteContent } from "@/lib/content/site";

type SolutionsSectionProps = {
  content: LocalizedSiteContent["solutions"];
};

/**
 * The five areas, named only, as a plain two-column list. The systems page
 * sets the same five as a numbered ledger with descriptions; when the
 * homepage used numerals and rules too, the two read as the same block twice
 * and the subpage looked like a repeat rather than the detail.
 */
export function SolutionsSection({ content }: SolutionsSectionProps) {
  return (
    <Section id="solutions" variant="content-band" tone="white">
      <Container>
        <SectionIntro label={content.label} title={content.title} lead={content.intro} />

        {/* Three rows, flowing down the first column before the second, so the
            eye reads the list in its real order instead of across the gap. */}
        <ul className="reveal-group mt-9 grid max-w-[var(--container-content)] gap-x-12 gap-y-3 sm:grid-flow-col sm:grid-rows-3">
          {content.items.map((item) => (
            <li
              key={item.title}
              className="text-[length:var(--type-body)] font-semibold leading-6 tracking-[-0.01em] text-graphite"
            >
              {item.title}
            </li>
          ))}
        </ul>

        <div className="reveal mt-9">
          <TextLink href={content.detailLink.href} label={content.detailLink.label} />
        </div>
      </Container>
    </Section>
  );
}
