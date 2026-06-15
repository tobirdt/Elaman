"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { Surface } from "@/components/ui/Surface";
import type { StoryStep } from "@/types/site";

type StickyStoryStageProps = {
  activeIndex: number;
  steps: readonly StoryStep[];
  activeLayerLabel: string;
  systemFocusLabel: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
const BLUE = "var(--color-brand-blue)";
const RED = "var(--color-brand-red)";
const INK = "var(--color-text-primary)";

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
    <Surface
      className="relative min-h-[28rem] overflow-hidden p-5 sm:p-7 xl:h-[calc(100vh-13rem)] xl:min-h-[34rem]"
      variant="strongGlass"
    >
      <div className="technical-grid absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-elaman-blue/28 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-elaman-red/22 to-transparent" />

      {/* Abstract radar / system diagram — purely decorative */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Outermost ring — always present, trust foundation */}
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke={BLUE}
          strokeWidth="1"
          strokeOpacity="0.18"
          strokeDasharray="4 12"
        />

        {/* Second ring — advice/architecture, step 1 */}
        <motion.circle
          cx="200"
          cy="200"
          r="116"
          stroke={BLUE}
          strokeWidth="1"
          strokeOpacity="0.22"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={t}
        />

        {/* Inner ring — comms/ops, step 2 */}
        <motion.circle
          cx="200"
          cy="200"
          r="72"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeOpacity="0.28"
          strokeDasharray="3 8"
          initial={false}
          animate={fadeIn(activeIndex, 2)}
          transition={t}
        />

        {/* Core ring — always present */}
        <circle
          cx="200"
          cy="200"
          r="26"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeOpacity="0.30"
        />

        {/* Crosshair — horizontal, step 1 */}
        <motion.line
          x1="0"
          y1="200"
          x2="400"
          y2="200"
          stroke={BLUE}
          strokeWidth="0.8"
          strokeOpacity="0.14"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={t}
        />
        {/* Crosshair — vertical, step 1 */}
        <motion.line
          x1="200"
          y1="0"
          x2="200"
          y2="400"
          stroke={BLUE}
          strokeWidth="0.8"
          strokeOpacity="0.14"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={t}
        />

        {/* Communications arc — blue, step 2 */}
        <motion.path
          d="M40 270 C100 200 150 170 200 168 C254 166 290 196 360 140"
          stroke={BLUE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 16"
          strokeOpacity="0.58"
          initial={false}
          animate={vis(activeIndex, 2, reduced)}
          transition={t}
        />

        {/* Surveillance sweep — second arc, step 3 */}
        <motion.path
          d="M40 310 C120 285 170 255 200 222 C232 188 274 178 360 206"
          stroke={BLUE}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeOpacity="0.36"
          initial={false}
          animate={vis(activeIndex, 3, reduced)}
          transition={{ ...t, delay: reduced ? 0 : 0.08 }}
        />

        {/* Surveillance scan line — step 3 */}
        <motion.line
          x1="40"
          y1="200"
          x2="360"
          y2="200"
          stroke={BLUE}
          strokeWidth="0.7"
          strokeOpacity="0.20"
          strokeDasharray="4 10"
          initial={false}
          animate={fadeIn(activeIndex, 3)}
          transition={t}
        />

        {/* Protection ECM arc — red, step 4 */}
        <motion.path
          d="M50 335 C150 305 180 268 200 238 C222 204 272 198 360 226"
          stroke={RED}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 14"
          strokeOpacity="0.52"
          initial={false}
          animate={vis(activeIndex, 4, reduced)}
          transition={t}
        />

        {/* Delivery integration frame — step 5 */}
        <motion.path
          d="M80 80 H310 C334 80 352 98 352 122 V340"
          stroke={INK}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeOpacity="0.18"
          initial={false}
          animate={vis(activeIndex, 5, reduced)}
          transition={t}
        />

        {/* Center origin */}
        <circle cx="200" cy="200" r="5.5" fill={BLUE} fillOpacity="0.60" />
        <circle
          cx="200"
          cy="200"
          r="14"
          fill="none"
          stroke={BLUE}
          strokeWidth="1"
          strokeOpacity="0.28"
        />

        {/* Cardinal marks at outer ring */}
        <circle cx="200" cy="84" r="3.5" fill={BLUE} fillOpacity="0.40" />
        <motion.circle
          cx="316"
          cy="200"
          r="3.5"
          fill={BLUE}
          fillOpacity="0.40"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={tFast}
        />
        <motion.circle
          cx="200"
          cy="316"
          r="3.5"
          fill={BLUE}
          fillOpacity="0.40"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={tFast}
        />
        <motion.circle
          cx="84"
          cy="200"
          r="3.5"
          fill={BLUE}
          fillOpacity="0.40"
          initial={false}
          animate={fadeIn(activeIndex, 1)}
          transition={tFast}
        />

        {/* Node on comms arc */}
        <motion.g initial={false} animate={fadeIn(activeIndex, 2)} transition={tFast}>
          <circle cx="200" cy="168" r="6" fill={BLUE} fillOpacity="0.60" />
          <circle
            cx="200"
            cy="168"
            r="14"
            fill="none"
            stroke={BLUE}
            strokeWidth="1"
            strokeOpacity="0.22"
          />
        </motion.g>

        {/* Node on ECM arc */}
        <motion.g initial={false} animate={fadeIn(activeIndex, 4)} transition={tFast}>
          <circle cx="272" cy="198" r="5" fill={RED} fillOpacity="0.60" />
          <circle
            cx="272"
            cy="198"
            r="13"
            fill="none"
            stroke={RED}
            strokeWidth="1"
            strokeOpacity="0.22"
          />
        </motion.g>

        {/* Corner brackets */}
        <path
          d="M14 14 H32 M14 14 V32"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeOpacity="0.22"
          strokeLinecap="round"
        />
        <path
          d="M386 14 H368 M386 14 V32"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeOpacity="0.22"
          strokeLinecap="round"
        />
        <path
          d="M14 386 H32 M14 386 V368"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeOpacity="0.22"
          strokeLinecap="round"
        />
        <path
          d="M386 386 H368 M386 386 V368"
          stroke={RED}
          strokeWidth="1.2"
          strokeOpacity="0.20"
          strokeLinecap="round"
        />
      </svg>

      {/* Content layer */}
      <div className="relative z-10 flex h-full min-h-[25rem] flex-col justify-between xl:min-h-full">
        {/* Top label bar */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-blue">
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
          <div className="rounded-[var(--radius-pill)] border border-[var(--border-soft)] bg-[var(--surface-card)] px-3 py-1.5 text-xs font-semibold tabular-nums text-graphite-soft">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(steps.length).padStart(2, "0")}
          </div>
        </div>

        {/* Spacer — SVG fills this space */}
        <div className="flex-1" />

        {/* Bottom step info */}
        <div>
          <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-graphite-soft">
            {systemFocusLabel}
          </p>
          <motion.h3
            key={`title-${activeStep.id}`}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tFast}
            className="mt-2 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite"
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
                    : { duration: 0.3, delay: bIndex * 0.05, ease }
                }
                className="flex items-center gap-2.5 rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 py-2"
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
    </Surface>
  );
}
