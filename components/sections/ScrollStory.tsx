import { DesktopScrollStory } from "@/components/sections/DesktopScrollStory";
import { MobileStorySequence } from "@/components/sections/MobileStorySequence";

export function ScrollStory() {
  return (
    <section
      id="story"
      className="relative isolate overflow-hidden border-y border-line bg-white"
    >
      <div
        className="technical-grid absolute inset-x-0 top-0 h-[34rem] opacity-45"
        aria-hidden="true"
      />
      <div className="hidden xl:block" data-story-variant="desktop">
        <DesktopScrollStory />
      </div>
      <div className="xl:hidden" data-story-variant="mobile">
        <MobileStorySequence />
      </div>
    </section>
  );
}
