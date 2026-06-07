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

const ease = [0.22, 1, 0.36, 1] as const;

function vis(activeIndex: number, from: number, reduced: boolean) {
  const on = activeIndex >= from;
  return {
    opacity: on ? 1 : 0,
    pathLength: on ? 1 : 0,
    scale: on || reduced ? 1 : 0.97,
  };
}

function fadeIn(activeIndex: number, from: number) {
  return { opacity: activeIndex >= from ? 1 : 0 };
}

export function StickyStoryStage({
  activeIndex,
  steps,
  activeLayerLabel,
  systemFocusLabel,
}: StickyStoryStageProps) {
  const reduced = useReducedMotionPreference();
  const activeStep = steps[activeIndex] ?? steps[0];
  const t = reduced ? { duration: 0 } : { duration: 0.65, ease };
  const tFast = reduced ? { duration: 0 } : { duration: 0.4, ease };

  return (
    <div className="glass-surface-strong relative min-h-[28rem] overflow-hidden rounded-xl p-5 sm:p-7 xl:h-[calc(100vh-13rem)] xl:min-h-[34rem]">
      <div className="technical-grid absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-elaman-blue/28 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-elaman-red/22 to-transparent" />

      {/* Abstract radar / system diagram — purely decorative */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Outermost ring — always present, trust foundation */}
        <circle
          cx="200"
          cy="150"
          r="118"
          stroke="#244074"
          strokeWidth="0.8"
          strokeOpacity="0.12"
          strokeDasharray="3 9"
        />

        {/* Second ring — advice/architecture, step 1 */}
        <motion.circle
          cx="200"
          cy="150"
          r="84"
          stroke="#244074"
          strokeWidth="0.9"
          strokeOpacity="0.14"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={t}
        />

        {/* Inner ring — comms/ops, step 2 */}
        <motion.circle
          cx="200"
          cy="150"
          r="50"
          stroke="#244074"
          strokeWidth="1"
          strokeOpacity="0.18"
          strokeDasharray="2 6"
          initial={false}
          animate={fadeIn(activeIndex, 2)}
          transition={t}
        />

        {/* Core ring — always present */}
        <circle
          cx="200"
          cy="150"
          r="18"
          stroke="#244074"
          strokeWidth="0.8"
          strokeOpacity="0.20"
        />

        {/* Crosshair — horizontal, step 1 */}
        <motion.line
          x1="56"
          y1="150"
          x2="344"
          y2="150"
          stroke="#244074"
          strokeWidth="0.7"
          strokeOpacity="0.10"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={t}
        />
        {/* Crosshair — vertical, step 1 */}
        <motion.line
          x1="200"
          y1="16"
          x2="200"
          y2="284"
          stroke="#244074"
          strokeWidth="0.7"
          strokeOpacity="0.10"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={t}
        />

        {/* Communications arc — blue, step 2 */}
        <motion.path
          d="M72 210 C122 154 162 130 200 128 C242 126 274 148 328 100"
          stroke="#244074"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="8 14"
          strokeOpacity="0.50"
          initial={false}
          animate={vis(activeIndex, 2, reduced)}
          transition={t}
        />

        {/* Surveillance sweep — second arc, step 3 */}
        <motion.path
          d="M72 240 C138 222 178 196 200 168 C224 138 264 130 328 148"
          stroke="#244074"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.28"
          initial={false}
          animate={vis(activeIndex, 3, reduced)}
          transition={{ ...t, delay: reduced ? 0 : 0.08 }}
        />

        {/* Surveillance cross-axis — dashed horizontal band, step 3 */}
        <motion.line
          x1="72"
          y1="150"
          x2="328"
          y2="150"
          stroke="#244074"
          strokeWidth="0.6"
          strokeOpacity="0.16"
          strokeDasharray="3 8"
          initial={false}
          animate={fadeIn(activeIndex, 3)}
          transition={t}
        />

        {/* Protection ECM arc — red, step 4 */}
        <motion.path
          d="M82 258 C152 238 192 206 200 178 C210 148 260 148 328 168"
          stroke="#D83034"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="5 12"
          strokeOpacity="0.44"
          initial={false}
          animate={vis(activeIndex, 4, reduced)}
          transition={t}
        />

        {/* Delivery integration frame — rectangle/L-bracket, step 5 */}
        <motion.path
          d="M100 72 H280 C304 72 320 88 320 112 V244"
          stroke="#16181D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.16"
          initial={false}
          animate={vis(activeIndex, 5, reduced)}
          transition={t}
        />

        {/* Center origin dot */}
        <circle cx="200" cy="150" r="4.5" fill="#244074" fillOpacity="0.50" />
        <circle
          cx="200"
          cy="150"
          r="11"
          fill="none"
          stroke="#244074"
          strokeWidth="0.9"
          strokeOpacity="0.20"
        />

        {/* North cardinal */}
        <circle cx="200" cy="66" r="3" fill="#244074" fillOpacity="0.36" />
        {/* East cardinal */}
        <motion.circle
          cx="284"
          cy="150"
          r="3"
          fill="#244074"
          fillOpacity="0.36"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={tFast}
        />
        {/* South cardinal */}
        <motion.circle
          cx="200"
          cy="234"
          r="3"
          fill="#244074"
          fillOpacity="0.36"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={tFast}
        />
        {/* West cardinal */}
        <motion.circle
          cx="116"
          cy="150"
          r="3"
          fill="#244074"
          fillOpacity="0.36"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={tFast}
        />

        {/* Node on comms arc */}
        <motion.g initial={false} animate={fadeIn(activeIndex, 2)} transition={tFast}>
          <circle cx="200" cy="128" r="5" fill="#244074" fillOpacity="0.55" />
          <circle
            cx="200"
            cy="128"
            r="12"
            fill="none"
            stroke="#244074"
            strokeWidth="0.8"
            strokeOpacity="0.18"
          />
        </motion.g>

        {/* Node on ECM arc */}
        <motion.g initial={false} animate={fadeIn(activeIndex, 4)} transition={tFast}>
          <circle cx="260" cy="148" r="4" fill="#D83034" fillOpacity="0.52" />
          <circle
            cx="260"
            cy="148"
            r="10"
            fill="none"
            stroke="#D83034"
            strokeWidth="0.8"
            strokeOpacity="0.16"
          />
        </motion.g>

        {/* Corner brackets */}
        <path
          d="M36 32 H50 M36 32 V46"
          stroke="#244074"
          strokeWidth="1"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
        <path
          d="M364 32 H350 M364 32 V46"
          stroke="#244074"
          strokeWidth="1"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
        <path
          d="M36 268 H50 M36 268 V254"
          stroke="#244074"
          strokeWidth="1"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
        <path
          d="M364 268 H350 M364 268 V254"
          stroke="#D83034"
          strokeWidth="1"
          strokeOpacity="0.14"
          strokeLinecap="round"
        />
      </svg>

      {/* Content layer */}
      <div className="relative z-10 flex h-full min-h-[25rem] flex-col justify-between xl:min-h-full">
        {/* Top label bar */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-elaman-blue">
              {activeLayerLabel}
            </p>
            <motion.p
              key={activeStep.id}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={tFast}
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

        {/* Spacer — SVG fills this space */}
        <div className="flex-1" />

        {/* Bottom step info */}
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-graphite-soft">
            {systemFocusLabel}
          </p>
          <motion.h3
            key={`title-${activeStep.id}`}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tFast}
            className="mt-2 text-xl font-semibold leading-tight tracking-[-0.035em] text-graphite sm:text-2xl"
          >
            {activeStep.title}
          </motion.h3>
          <div className="mt-3.5 grid gap-1.5 sm:grid-cols-2">
            {activeStep.bullets.slice(0, 4).map((bullet, bIndex) => (
              <motion.div
                key={bullet}
                initial={reduced ? false : { opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 0.3, delay: bIndex * 0.05, ease: "easeOut" }
                }
                className="flex items-center gap-2.5 rounded-lg border border-line bg-white/72 px-3 py-2"
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
