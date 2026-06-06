"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import type { StoryStep } from "@/types/site";

type StickyStoryStageProps = {
  activeIndex: number;
  steps: readonly StoryStep[];
};

const dotIndexes = Array.from({ length: 63 }, (_, index) => index);

const layerTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
} as const;

function layerState(
  activeIndex: number,
  visibleFrom: number,
  prefersReducedMotion: boolean,
) {
  const isVisible = activeIndex >= visibleFrom;

  return {
    opacity: isVisible ? 1 : 0,
    pathLength: isVisible ? 1 : 0,
    scale: isVisible || prefersReducedMotion ? 1 : 0.985,
  };
}

export function StickyStoryStage({ activeIndex, steps }: StickyStoryStageProps) {
  const prefersReducedMotion = useReducedMotionPreference();
  const activeStep = steps[activeIndex] ?? steps[0];
  const transition = prefersReducedMotion ? { duration: 0 } : layerTransition;

  return (
    <div className="glass-surface-strong relative min-h-[28rem] overflow-hidden rounded-lg p-5 sm:p-7 xl:h-[calc(100vh-14rem)] xl:min-h-[32rem]">
      <div className="technical-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-elaman-blue/30 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-elaman-red/22 to-transparent" />

      <div className="relative z-10 flex h-full min-h-[25rem] flex-col justify-between xl:min-h-full">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-elaman-blue">
              Active Layer
            </p>
            <motion.p
              key={activeStep.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="mt-2 max-w-xs text-sm leading-6 text-graphite-muted"
            >
              {activeStep.eyebrow}
            </motion.p>
          </div>
          <div className="rounded-full border border-line bg-white/72 px-3 py-2 text-xs font-medium text-graphite-muted">
            {String(activeIndex + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="relative mx-auto my-6 grid w-full max-w-[23rem] grid-cols-9 gap-3">
          <svg
            viewBox="0 0 520 420"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d="M54 278 C128 192 188 168 260 204 C324 236 372 186 466 102"
              stroke="#244074"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 14"
              initial={false}
              animate={layerState(activeIndex, 1, prefersReducedMotion)}
              transition={transition}
            />
            <motion.path
              d="M78 322 C150 306 214 274 264 222 C320 162 386 156 462 176"
              stroke="#244074"
              strokeWidth="2"
              strokeLinecap="round"
              initial={false}
              animate={layerState(activeIndex, 2, prefersReducedMotion)}
              transition={transition}
            />
            <motion.path
              d="M70 352 C154 342 210 320 260 280 C330 226 390 248 458 232"
              stroke="#D83034"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="5 12"
              initial={false}
              animate={layerState(activeIndex, 3, prefersReducedMotion)}
              transition={transition}
            />
            <motion.path
              d="M105 92 H312 C360 92 392 124 392 172 V330"
              stroke="#16181D"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={false}
              animate={layerState(activeIndex, 4, prefersReducedMotion)}
              transition={transition}
            />
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.circle
                key={index}
                cx={112 + index * 76}
                cy={340 - Math.abs(2 - index) * 34}
                r="12"
                fill={index >= 3 ? "#D83034" : "#244074"}
                initial={false}
                animate={{
                  opacity: activeIndex >= Math.min(index, 4) ? 1 : 0.16,
                  scale: activeIndex >= Math.min(index, 4) ? 1 : 0.8,
                }}
                transition={transition}
              />
            ))}
          </svg>

          {dotIndexes.map((index) => {
            const blue = activeIndex >= 1 && [12, 21, 30, 39].includes(index);
            const observation = activeIndex >= 2 && [16, 24, 32, 40, 48].includes(index);
            const red = activeIndex >= 3 && [31, 41, 50].includes(index);
            const integrated = activeIndex >= 4 && [10, 19, 28, 37, 46].includes(index);

            return (
              <motion.span
                key={index}
                className={`aspect-square rounded-full ${
                  red
                    ? "bg-elaman-red"
                    : blue || integrated
                      ? "bg-elaman-blue"
                      : observation
                        ? "border border-elaman-blue/28 bg-white"
                        : "bg-graphite/10"
                }`}
                initial={false}
                animate={{
                  scale: red || blue || observation || integrated ? 1.08 : 1,
                  opacity: red || blue || observation || integrated ? 1 : 0.68,
                }}
                transition={transition}
              />
            );
          })}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-graphite-soft">
            System focus
          </p>
          <motion.h3
            key={`${activeStep.id}-title`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em] text-graphite sm:text-3xl"
          >
            {activeStep.title}
          </motion.h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {activeStep.bullets.slice(0, 4).map((bullet) => (
              <div
                key={bullet}
                className="rounded-sm border border-line bg-white/70 p-2.5"
              >
                <p className="text-xs font-medium text-graphite-muted">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
