"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { memo } from "react";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { DOT_COLORS, DotMatrix } from "@/components/ui/DotMatrix";
import {
  STORY_BLUE_INDEX,
  STORY_BOUNDS,
  STORY_RED_INDEX,
  storyFormations,
} from "@/lib/design/formations";

type StickyStoryStageProps = {
  /** Smoothed 0–1 scroll progress of the story runway. */
  progress: MotionValue<number>;
  /** Discrete active step — used only for the reduced-motion fallback. */
  activeIndex: number;
  stepCount: number;
};

const PITCH = 30;
const DOT_R = 6;
const INK_OPACITY = 0.3;
const PAD = 0.8;
const WIDTH = (STORY_BOUNDS.maxX - STORY_BOUNDS.minX + PAD * 2) * PITCH;
const HEIGHT = (STORY_BOUNDS.maxY - STORY_BOUNDS.minY + PAD * 2) * PITCH;
const ORIGIN_X = (-STORY_BOUNDS.minX + PAD) * PITCH;
const ORIGIN_Y = (-STORY_BOUNDS.minY + PAD) * PITCH;

const FORMATION_COUNT = storyFormations.length;

/**
 * Piecewise input stops: each formation dwells through most of its step
 * window; the morph to the next formation starts late in the outgoing step
 * and settles shortly after the boundary.
 */
function buildStops(): number[] {
  const window = 1 / FORMATION_COUNT;
  const stops: number[] = [0];

  for (let k = 1; k < FORMATION_COUNT; k += 1) {
    const boundary = k * window;
    stops.push(boundary - window * 0.4, boundary + window * 0.2);
  }

  stops.push(1);
  return stops;
}

const STOPS = buildStops();

function outputsFor(values: number[]): number[] {
  // [v0, v0,v1, v1,v2, ... v4,v5, v5] — hold + move pairs matching STOPS.
  const outputs: number[] = [values[0]];

  for (let k = 1; k < values.length; k += 1) {
    outputs.push(values[k - 1], values[k]);
  }

  outputs.push(values[values.length - 1]);
  return outputs;
}

function toStageX(x: number) {
  return ORIGIN_X + x * PITCH;
}

function toStageY(y: number) {
  return ORIGIN_Y + y * PITCH;
}

/** The protection step (perimeter formation) — where red enters the story. */
const RED_STEP = storyFormations.findIndex((formation) =>
  formation.dots.some((dot) => dot.tone === "red"),
);
const RED_IN_START =
  (RED_STEP / FORMATION_COUNT) * (1 - 0.001) - (1 / FORMATION_COUNT) * 0.3;
const RED_IN_END = RED_STEP / FORMATION_COUNT + (1 / FORMATION_COUNT) * 0.2;

/** Chain formation dwell — the window where connective edges are visible. */
const CHAIN_STEP = 2;
const CHAIN_WINDOW = 1 / FORMATION_COUNT;
const CHAIN_REST_START = CHAIN_STEP * CHAIN_WINDOW + CHAIN_WINDOW * 0.2;
const CHAIN_REST_END = (CHAIN_STEP + 1) * CHAIN_WINDOW - CHAIN_WINDOW * 0.4;

type StageDotProps = {
  progress: MotionValue<number>;
  index: number;
};

function StageDot({ progress, index }: StageDotProps) {
  const xs = storyFormations.map((formation) => toStageX(formation.dots[index].x));
  const ys = storyFormations.map((formation) => toStageY(formation.dots[index].y));
  const cx = useTransform(progress, STOPS, outputsFor(xs));
  const cy = useTransform(progress, STOPS, outputsFor(ys));
  const inkFade = useTransform(progress, [RED_IN_START, RED_IN_END], [INK_OPACITY, 0]);
  const redRise = useTransform(progress, [RED_IN_START, RED_IN_END], [0, 1]);

  if (index === STORY_BLUE_INDEX) {
    return <motion.circle cx={cx} cy={cy} r={DOT_R + 1.5} fill={DOT_COLORS.blue} />;
  }

  if (index === STORY_RED_INDEX) {
    return (
      <>
        <motion.circle
          cx={cx}
          cy={cy}
          r={DOT_R}
          fill={DOT_COLORS.ink}
          fillOpacity={inkFade}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={DOT_R + 1.5}
          fill={DOT_COLORS.red}
          fillOpacity={redRise}
        />
      </>
    );
  }

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={DOT_R}
      fill={DOT_COLORS.ink}
      fillOpacity={INK_OPACITY}
    />
  );
}

function ChainEdges({ progress }: { progress: MotionValue<number> }) {
  const chain = storyFormations[CHAIN_STEP];
  const opacity = useTransform(
    progress,
    [CHAIN_REST_START - 0.02, CHAIN_REST_START, CHAIN_REST_END, CHAIN_REST_END + 0.02],
    [0, 1, 1, 0],
  );
  const path = chain.dots
    .map(
      (dot, index) => `${index === 0 ? "M" : "L"}${toStageX(dot.x)} ${toStageY(dot.y)}`,
    )
    .join(" ");

  return (
    <motion.path
      d={path}
      fill="none"
      stroke={DOT_COLORS.ink}
      strokeOpacity={0.22}
      strokeWidth={1}
      style={{ opacity }}
    />
  );
}

/** Faint static lattice behind the formation — texture, never animated. */
function Lattice() {
  const dots: Array<{ x: number; y: number }> = [];

  for (let row = -3; row <= 3; row += 1) {
    for (let col = -5; col <= 5; col += 1) {
      dots.push({ x: col * 1.24, y: row * 1.4 });
    }
  }

  return (
    <g aria-hidden="true">
      {dots.map((dot, index) => (
        <circle
          key={index}
          cx={toStageX(dot.x)}
          cy={toStageY(dot.y)}
          r={1.4}
          fill={DOT_COLORS.ink}
          fillOpacity={0.07}
        />
      ))}
    </g>
  );
}

function StageBase({ progress, activeIndex, stepCount }: StickyStoryStageProps) {
  const reduced = useReducedMotionPreference();
  const seqText = useTransform(
    progress,
    (value) =>
      `SEQ ${String(Math.min(100, Math.max(0, Math.round(value * 100)))).padStart(3, "0")}%`,
  );

  if (reduced) {
    return (
      <div className="relative">
        <DotMatrix
          bounds={STORY_BOUNDS}
          className="w-full"
          dotRadius={DOT_R}
          formation={storyFormations[Math.min(activeIndex, FORMATION_COUNT - 1)]}
          inkOpacity={INK_OPACITY}
          padding={PAD}
          pitch={PITCH}
        />
        <p className="font-mono-label absolute right-0 top-0 text-graphite-soft">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(stepCount).padStart(2, "0")}
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        aria-hidden="true"
        focusable="false"
      >
        <Lattice />
        <ChainEdges progress={progress} />
        {storyFormations[0].dots.map((_, index) => (
          <StageDot key={index} index={index} progress={progress} />
        ))}
      </svg>
      <p className="font-mono-label absolute right-0 top-0 text-graphite-soft">
        {String(activeIndex + 1).padStart(2, "0")} / {String(stepCount).padStart(2, "0")}
      </p>
      <motion.p className="font-mono-label absolute bottom-0 left-0 text-graphite-soft">
        {seqText}
      </motion.p>
    </div>
  );
}

export const StickyStoryStage = memo(StageBase);
