import { DesktopScrollStory } from "@/components/sections/DesktopScrollStory";
import { MobileStorySequence } from "@/components/sections/MobileStorySequence";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n";

type ScrollStoryProps = {
  locale: Locale;
  content: LocalizedSiteContent;
};

export function ScrollStory({ locale, content }: ScrollStoryProps) {
  return (
    <Section
      id="story"
      variant="screen"
      tone="white"
      modeLayout={false}
      className="relative isolate overflow-hidden border-y border-line"
    >
      <div
        className="technical-grid absolute inset-x-0 top-0 h-[34rem] opacity-45"
        aria-hidden="true"
      />
      <div className="hidden xl:block" data-story-variant="desktop">
        <DesktopScrollStory content={content.story} />
      </div>
      <div className="xl:hidden" data-story-variant="mobile">
        <MobileStorySequence
          locale={locale}
          story={content.story}
          contact={content.contact}
          primaryCta={content.hero.primaryCta.label}
          secondaryCta={content.hero.secondaryCta.label}
        />
      </div>
    </Section>
  );
}
