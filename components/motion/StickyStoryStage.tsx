"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { MonoLabel } from "@/components/ui/MonoLabel";
import {
  STORY_BOUNDS,
  STORY_RED_INDEX,
  storyFormations,
  type DotTone,
} from "@/lib/design/formations";
import type { StoryStep } from "@/types/site";

type StickyStoryStageProps = {
  activeIndex: number;
  steps: readonly StoryStep[];
  activeLayerLabel: string;
  progress: MotionValue<number>;
};

const WIDTH = 620;
const HEIGHT = 520;
const PADDING = 54;
const INK = "var(--color-graphite)";
const BLUE = "var(--color-elaman-blue)";
const RED = "var(--color-elaman-red)";

function mapX(value: number) {
  return (
    PADDING +
    ((value - STORY_BOUNDS.minX) / (STORY_BOUNDS.maxX - STORY_BOUNDS.minX)) *
      (WIDTH - PADDING * 2)
  );
}

function mapY(value: number) {
  return (
    PADDING +
    ((value - STORY_BOUNDS.minY) / (STORY_BOUNDS.maxY - STORY_BOUNDS.minY)) *
      (HEIGHT - PADDING * 2)
  );
}

function interpolateDot(progress: number, index: number, axis: "x" | "y") {
  const scaled = Math.min(storyFormations.length - 1, Math.max(0, progress * 5));
  const fromIndex = Math.floor(scaled);
  const toIndex = Math.min(storyFormations.length - 1, fromIndex + 1);
  const local = scaled - fromIndex;
  const from = storyFormations[fromIndex]?.dots[index]?.[axis] ?? 0;
  const to = storyFormations[toIndex]?.dots[index]?.[axis] ?? from;

  return from + (to - from) * local;
}

function FormationDot({
  index,
  progress,
  reduced,
  staticPosition,
  tone,
}: {
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
  staticPosition: { x: number; y: number };
  tone: DotTone;
}) {
  const cx = useTransform(progress, (value) => mapX(interpolateDot(value, index, "x")));
  const cy = useTransform(progress, (value) => mapY(interpolateDot(value, index, "y")));
  const color = tone === "blue" ? BLUE : tone === "red" ? RED : INK;

  return (
    <motion.circle
      cx={reduced ? mapX(staticPosition.x) : cx}
      cy={reduced ? mapY(staticPosition.y) : cy}
      r={tone === "ink" ? 5 : 6.5}
      fill={color}
      fillOpacity={tone === "ink" ? 0.24 : 1}
    />
  );
}

export function StickyStoryStage({
  activeIndex,
  steps,
  activeLayerLabel,
  progress,
}: StickyStoryStageProps) {
  const reduced = useReducedMotionPreference();
  const formation = storyFormations[activeIndex] ?? storyFormations[0];
  const activeStep = steps[activeIndex] ?? steps[0];

  return (
    <figure className="relative min-h-[32rem] border-x border-[var(--border-hairline)]">
      <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--border-hairline)]" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-[var(--border-hairline)]" />
      <motion.div
        className="absolute left-0 top-[18%] h-0.5 w-[41%] origin-left bg-elaman-blue"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.5 }}
        aria-hidden="true"
      />

      <div className="absolute inset-x-6 top-6 z-10 flex items-start justify-between gap-4">
        <div>
          <MonoLabel>{activeLayerLabel}</MonoLabel>
          <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-graphite-soft">
            {activeStep.eyebrow}
          </p>
        </div>
        <p className="font-mono text-[0.66rem] tabular-nums text-graphite-soft">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(steps.length).padStart(2, "0")}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {formation.edges?.map(([from, to]) => {
          const start = formation.dots[from];
          const end = formation.dots[to];

          if (!start || !end) return null;

          return (
            <line
              key={`${from}-${to}`}
              x1={mapX(start.x)}
              y1={mapY(start.y)}
              x2={mapX(end.x)}
              y2={mapY(end.y)}
              stroke={INK}
              strokeOpacity="0.12"
            />
          );
        })}
        {formation.dots.map((dot, index) => {
          const redVisible = index === STORY_RED_INDEX && activeIndex >= 3;
          const tone = redVisible ? "red" : dot.tone === "blue" ? "blue" : "ink";

          return (
            <FormationDot
              key={index}
              index={index}
              progress={progress}
              reduced={reduced}
              staticPosition={dot}
              tone={tone}
            />
          );
        })}
      </svg>

      <figcaption className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-graphite-soft">
        <span>{activeStep.id}</span>
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
      </figcaption>
    </figure>
  );
}
