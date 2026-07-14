import { DotMatrix } from "@/components/ui/DotMatrix";
import { STORY_BOUNDS, storyFormations } from "@/lib/design/formations";

type MobileStoryVisualProps = {
  index: number;
};

export function MobileStoryVisual({ index }: MobileStoryVisualProps) {
  const formation = storyFormations[index] ?? storyFormations[0];

  return (
    <div className="relative h-40 overflow-hidden border-y border-[var(--border-hairline)]">
      <div
        className="absolute left-0 top-8 h-0.5 w-[32%] bg-elaman-blue"
        aria-hidden="true"
      />
      <DotMatrix
        formation={formation}
        bounds={STORY_BOUNDS}
        pitch={13}
        dotRadius={4.5}
        className="absolute inset-0 h-full w-full p-5"
      />
    </div>
  );
}
