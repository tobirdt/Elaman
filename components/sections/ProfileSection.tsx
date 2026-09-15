import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ProfileSectionProps = {
  content: LocalizedSiteContent["profile"];
};

/**
 * The first text band below the hero. The stone-bridge photograph follows it
 * as a `MediaBand` instead of sitting beside the copy, so the section keeps
 * the page's single left edge. The managing director is named on the company
 * page, where the rest of the factual detail lives, and not a second time
 * here.
 */
export function ProfileSection({ content }: ProfileSectionProps) {
  return (
    <Section id="profile" variant="content-band" tone="white">
      <Container>
        <SectionIntro label={content.label} title={content.title} />
        <div className="reveal-group mt-8 grid max-w-[62ch] gap-5 text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="reveal mt-8">
          <TextLink href={content.detailLink.href} label={content.detailLink.label} />
        </div>
      </Container>
    </Section>
  );
}
