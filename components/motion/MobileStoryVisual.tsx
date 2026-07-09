import { DotMatrix } from "@/components/ui/DotMatrix";
import { STORY_BOUNDS, storyFormations } from "@/lib/design/formations";

type MobileStoryVisualProps = {
  index: number;
};

/**
 * Static snapshot of the step's dot formation — the same coordinate data the
 * desktop stage animates through, so the mobile sequence stays truthful to
 * the story state.
 */
export function MobileStoryVisual({ index }: MobileStoryVisualProps) {
  const formation =
    storyFormations[Math.min(Math.max(index, 0), storyFormations.length - 1)];

  return (
    <DotMatrix
      bounds={STORY_BOUNDS}
      className="h-24 w-full"
      dotRadius={4.5}
      formation={formation}
      inkOpacity={0.26}
      padding={0.6}
      pitch={18}
    />
  );
}
