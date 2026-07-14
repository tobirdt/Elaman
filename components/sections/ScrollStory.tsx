import { DesktopScrollStory } from "@/components/sections/DesktopScrollStory";
import { MobileStorySequence } from "@/components/sections/MobileStorySequence";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n";

type ScrollStoryProps = {
  locale: Locale;
  content: LocalizedSiteContent;
};

export function ScrollStory({ content }: ScrollStoryProps) {
  return (
    <Section
      id="story"
      variant="screen"
      tone="white"
      modeLayout={false}
      className="relative border-y border-[var(--border-hairline)]"
    >
      <div className="hidden xl:block" data-story-variant="desktop">
        <DesktopScrollStory content={content.story} />
      </div>
      <div className="xl:hidden" data-story-variant="mobile">
        <MobileStorySequence story={content.story} />
      </div>
    </Section>
  );
}
