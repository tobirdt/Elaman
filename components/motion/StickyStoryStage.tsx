"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import type { StoryStep } from "@/types/site";

type StickyStoryStageProps = {
  activeIndex: number;
  steps: readonly StoryStep[];
  activeLayerLabel: string;
  systemFocusLabel: string;
};

const TOTAL = 63; // 9 × 7

const layerTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1],
} as const;

// Per-step: which dots are active and what tone
// Step 0 (Trust/Foundation): center cluster — stability
const STEP_DOTS: Record<number, { blue: number[]; ring: number[]; red: number[] }> = {
  0: {
    blue: [21, 22, 30, 31, 39, 40],
    ring: [12, 13, 14, 48, 49, 50],
    red: [],
  },
  1: {
    // Advice / architecture: structured columns emerge
    blue: [4, 13, 22, 31, 40, 49, 58],
    ring: [21, 22, 23, 39, 40, 41],
    red: [],
  },
  2: {
    // Communications: horizontal network spreads
    blue: [4, 13, 22, 31, 40, 49, 58, 9, 18, 27, 36, 45, 54],
    ring: [5, 14, 23, 32, 41, 50, 59],
    red: [],
  },
  3: {
    // Surveillance: observation grid fills
    blue: [4, 13, 22, 31, 40, 49, 58, 9, 18, 27, 36, 45, 54],
    ring: [0, 8, 16, 24, 32, 40, 48, 56, 62],
    red: [],
  },
  4: {
    // Protection: red countermeasure layer activates
    blue: [4, 13, 22, 31, 40, 49, 58, 9, 18, 27, 36, 45, 54],
    ring: [0, 8, 16, 24, 32, 40, 48, 56, 62],
    red: [28, 29, 37, 38, 46, 47],
  },
  5: {
    // Delivery: full integrated system — all layers
    blue: [4, 13, 22, 31, 40, 49, 58, 9, 18, 27, 36, 45, 54, 1, 2, 3],
    ring: [0, 8, 16, 24, 32, 40, 48, 56, 62, 6, 7],
    red: [28, 29, 37, 38, 46, 47, 55, 61],
  },
};

function getDotState(index: number, activeIndex: number) {
  const state = STEP_DOTS[Math.min(activeIndex, 5)] ?? STEP_DOTS[0];
  if (state.red.includes(index)) return "red";
  if (state.blue.includes(index)) return "blue";
  if (state.ring.includes(index)) return "ring";
  return "inactive";
}

function layerVisible(activeIndex: number, visibleFrom: number, reduced: boolean) {
  const visible = activeIndex >= visibleFrom;
  return {
    opacity: visible ? 1 : 0,
    pathLength: visible ? 1 : 0,
    scale: visible || reduced ? 1 : 0.98,
  };
}

export function StickyStoryStage({
  activeIndex,
  steps,
  activeLayerLabel,
  systemFocusLabel,
}: StickyStoryStageProps) {
  const reduced = useReducedMotionPreference();
  const activeStep = steps[activeIndex] ?? steps[0];
  const transition = reduced ? { duration: 0 } : layerTransition;

  return (
    <div className="glass-surface-strong relative min-h-[28rem] overflow-hidden rounded-xl p-5 sm:p-7 xl:h-[calc(100vh-13rem)] xl:min-h-[34rem]">
      <div className="technical-grid absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Accent lines */}
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-elaman-blue/32 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-elaman-red/24 to-transparent" />

      <svg
        viewBox="0 0 540 440"
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* Foundation ring — always visible, step 0 */}
        <motion.circle
          cx="270"
          cy="220"
          r="60"
          stroke="#244074"
          strokeWidth="1"
          strokeDasharray="4 8"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
          opacity="0.14"
        />

        {/* Communications arc — visible from step 2 */}
        <motion.path
          d="M52 290 C128 202 192 176 270 204 C342 228 398 176 488 106"
          stroke="#244074"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 14"
          initial={false}
          animate={layerVisible(activeIndex, 2, reduced)}
          transition={transition}
        />

        {/* Secondary comms thread — step 2 */}
        <motion.path
          d="M78 338 C156 318 220 282 268 228 C330 164 392 162 468 180"
          stroke="#244074"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={false}
          animate={layerVisible(activeIndex, 2, reduced)}
          transition={{ ...transition, delay: reduced ? 0 : 0.1 }}
        />

        {/* Surveillance observation grid line — step 3 */}
        <motion.path
          d="M52 220 H488"
          stroke="#244074"
          strokeWidth="1"
          strokeDasharray="4 10"
          initial={false}
          animate={layerVisible(activeIndex, 3, reduced)}
          transition={transition}
          opacity={0.3}
        />
        <motion.path
          d="M270 60 V380"
          stroke="#244074"
          strokeWidth="1"
          strokeDasharray="4 10"
          initial={false}
          animate={layerVisible(activeIndex, 3, reduced)}
          transition={{ ...transition, delay: reduced ? 0 : 0.08 }}
          opacity={0.22}
        />

        {/* Protection layer — red ECM line, step 4 */}
        <motion.path
          d="M74 368 C162 346 226 308 276 248 C340 172 408 174 474 196"
          stroke="#D83034"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5 12"
          initial={false}
          animate={layerVisible(activeIndex, 4, reduced)}
          transition={transition}
        />

        {/* Delivery integration frame — step 5 */}
        <motion.path
          d="M104 88 H324 C368 88 400 120 400 164 V360"
          stroke="#16181D"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={false}
          animate={layerVisible(activeIndex, 5, reduced)}
          transition={transition}
          opacity={0.22}
        />

        {/* Key network nodes */}
        {[
          { cx: 270, cy: 204, from: 2, color: "#244074" },
          { cx: 192, cy: 238, from: 2, color: "#244074" },
          { cx: 364, cy: 176, from: 3, color: "#244074" },
          { cx: 276, cy: 248, from: 4, color: "#D83034" },
          { cx: 164, cy: 148, from: 5, color: "#244074" },
        ].map(({ cx, cy, from, color }) => (
          <motion.g
            key={`${cx}-${cy}`}
            initial={false}
            animate={layerVisible(activeIndex, from, reduced)}
            transition={transition}
          >
            <circle cx={cx} cy={cy} r="14" fill={color} fillOpacity="0.07" />
            <circle cx={cx} cy={cy} r="5" fill={color} opacity="0.55" />
          </motion.g>
        ))}
      </svg>

      <div className="relative z-10 flex h-full min-h-[25rem] flex-col justify-between xl:min-h-full">
        {/* Top label bar */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-elaman-blue">
              {activeLayerLabel}
            </p>
            <motion.p
              key={activeStep.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="mt-1.5 text-sm leading-6 text-graphite-muted"
            >
              {activeStep.eyebrow}
            </motion.p>
          </div>
          <div className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-semibold tabular-nums text-graphite-soft">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(steps.length).padStart(2, "0")}
          </div>
        </div>

        {/* Dot matrix */}
        <div className="relative mx-auto my-4 grid w-full max-w-[22rem] grid-cols-9 gap-2.5">
          {Array.from({ length: TOTAL }, (_, index) => {
            const dotState = getDotState(index, activeIndex);

            return (
              <motion.span
                key={index}
                className={`aspect-square rounded-full ${
                  dotState === "red"
                    ? "bg-elaman-red"
                    : dotState === "blue"
                      ? "bg-elaman-blue"
                      : dotState === "ring"
                        ? "border border-elaman-blue/32 bg-elaman-blue/8"
                        : "bg-graphite/9"
                }`}
                initial={false}
                animate={{
                  scale: dotState === "red" || dotState === "blue" ? 1.12 : 1,
                  opacity:
                    dotState === "red" || dotState === "blue"
                      ? 1
                      : dotState === "ring"
                        ? 0.85
                        : 0.55,
                }}
                transition={
                  reduced ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }
                }
              />
            );
          })}
        </div>

        {/* Bottom step info */}
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-graphite-soft">
            {systemFocusLabel}
          </p>
          <motion.h3
            key={`title-${activeStep.id}`}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="mt-2 text-xl font-semibold leading-tight tracking-[-0.035em] text-graphite sm:text-2xl"
          >
            {activeStep.title}
          </motion.h3>
          <div className="mt-3.5 grid gap-1.5 sm:grid-cols-2">
            {activeStep.bullets.slice(0, 4).map((bullet, bIndex) => (
              <motion.div
                key={bullet}
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 0.35, delay: bIndex * 0.06, ease: "easeOut" }
                }
                className="flex items-center gap-2.5 rounded-md border border-line bg-white/72 px-3 py-2"
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${activeIndex >= 4 && bIndex === 0 ? "bg-elaman-red" : "bg-elaman-blue"}`}
                  aria-hidden="true"
                />
                <p className="text-xs font-medium text-graphite-muted">{bullet}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
