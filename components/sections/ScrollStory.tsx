"use client";

import { useEffect, useState } from "react";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
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
  const [isWide, setIsWide] = useState(false);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsWide(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <Section id="story" variant="screen" modeLayout={false} className="relative">
      {isWide && !reduced ? (
        <div data-story-variant="desktop">
          <DesktopScrollStory content={content.story} />
        </div>
      ) : (
        <div data-story-variant="linear">
          <MobileStorySequence
            locale={locale}
            story={content.story}
            contact={content.contact}
            primaryCta={content.hero.primaryCta.label}
            secondaryCta={content.hero.secondaryCta.label}
          />
        </div>
      )}
    </Section>
  );
}
