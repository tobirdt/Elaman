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

const BRIDGE_PATH =
  "M70 282 C110 218 148 188 190 176 C232 164 258 178 294 206 C318 224 342 196 350 132";
const RED_PATH = "M220 246 C250 222 270 210 294 206 C318 202 338 174 350 132";

const MATRIX_DOTS = [
  { x: 82, y: 116, r: 3.7, tone: "ink", opacity: 0.18 },
  { x: 106, y: 96, r: 4.4, tone: "ink", opacity: 0.24 },
  { x: 132, y: 108, r: 3.6, tone: "ink", opacity: 0.18 },
  { x: 92, y: 150, r: 4.8, tone: "ink", opacity: 0.25 },
  { x: 120, y: 146, r: 5.2, tone: "blue", opacity: 0.35 },
  { x: 150, y: 150, r: 4.7, tone: "ink", opacity: 0.24 },
  { x: 76, y: 188, r: 3.5, tone: "ink", opacity: 0.16 },
  { x: 106, y: 190, r: 4.6, tone: "ink", opacity: 0.23 },
  { x: 136, y: 184, r: 5.1, tone: "red", opacity: 0.36 },
  { x: 164, y: 202, r: 3.8, tone: "ink", opacity: 0.2 },
  { x: 92, y: 228, r: 3.5, tone: "ink", opacity: 0.14 },
  { x: 122, y: 232, r: 4.1, tone: "ink", opacity: 0.2 },
] as const;

const STAGE_NODES = [
  { x: 70, y: 282, tone: "blue" },
  { x: 132, y: 196, tone: "blue" },
  { x: 190, y: 176, tone: "blue" },
  { x: 248, y: 176, tone: "blue" },
  { x: 294, y: 206, tone: "red" },
  { x: 350, y: 132, tone: "blue" },
] as const;

function stepOpacity(activeIndex: number, index: number) {
  if (activeIndex === index) {
    return 1;
  }

  return activeIndex > index ? 0.78 : 0.28;
}

function stepRadius(activeIndex: number, index: number) {
  if (activeIndex === index) {
    return 10;
  }

  return activeIndex > index ? 8 : 6;
}

export function StickyStoryStage({
  activeIndex,
  steps,
  activeLayerLabel,
  systemFocusLabel,
}: StickyStoryStageProps) {
  const reduced = useReducedMotionPreference();
  const activeStep = steps[activeIndex] ?? steps[0];
  const progress = steps.length > 1 ? activeIndex / (steps.length - 1) : 1;
  const redProgress = activeIndex >= 4 ? Math.min(1, (activeIndex - 3) / 2) : 0;
  const traceTransition = reduced ? { duration: 0 } : { duration: 0.48, ease };
  const textTransition = reduced ? { duration: 0 } : { duration: 0.24, ease };

  return (
    <Surface
      className="relative min-h-[28rem] overflow-hidden p-5 sm:p-7 xl:h-[calc(100vh-13rem)] xl:min-h-[34rem]"
      variant="strongGlass"
    >
      <div className="technical-grid absolute inset-0 opacity-42" aria-hidden="true" />
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-elaman-blue/24 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-elaman-red/18 to-transparent" />

      <svg
        viewBox="0 0 420 420"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="storyBridgeBlue" x1="70" y1="282" x2="350" y2="132">
            <stop offset="0" stopColor={BLUE} stopOpacity="0.08" />
            <stop offset="0.48" stopColor={BLUE} stopOpacity="0.62" />
            <stop offset="1" stopColor={BLUE} stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="storyBridgeRed" x1="220" y1="246" x2="350" y2="132">
            <stop offset="0" stopColor={RED} stopOpacity="0.05" />
            <stop offset="0.72" stopColor={RED} stopOpacity="0.58" />
            <stop offset="1" stopColor={RED} stopOpacity="0.22" />
          </linearGradient>
        </defs>

        <path
          d="M52 70 H338 C358 70 372 84 372 104 V330"
          stroke={INK}
          strokeWidth="1"
          strokeOpacity="0.08"
          strokeLinecap="round"
        />
        <path
          d="M52 330 H372"
          stroke={INK}
          strokeWidth="1"
          strokeOpacity="0.07"
          strokeDasharray="2 10"
        />
        <path
          d="M52 240 H332"
          stroke={BLUE}
          strokeWidth="0.8"
          strokeOpacity="0.08"
          strokeDasharray="2 12"
        />

        <g>
          {MATRIX_DOTS.map((dot) => {
            const fill = dot.tone === "red" ? RED : dot.tone === "blue" ? BLUE : INK;

            return (
              <circle
                key={`${dot.x}-${dot.y}`}
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill={fill}
                fillOpacity={dot.opacity}
              />
            );
          })}
        </g>

        <path
          d={BRIDGE_PATH}
          stroke={BLUE}
          strokeWidth="7"
          strokeOpacity="0.04"
          strokeLinecap="round"
        />
        <path
          d={BRIDGE_PATH}
          stroke={BLUE}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.12"
          strokeDasharray="4 12"
        />
        <motion.path
          d={BRIDGE_PATH}
          stroke="url(#storyBridgeBlue)"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: progress, opacity: 0.78 }}
          transition={traceTransition}
        />

        <path
          d={RED_PATH}
          stroke={RED}
          strokeWidth="6"
          strokeOpacity="0.035"
          strokeLinecap="round"
        />
        <motion.path
          d={RED_PATH}
          stroke="url(#storyBridgeRed)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: redProgress, opacity: activeIndex >= 4 ? 0.74 : 0 }}
          transition={traceTransition}
        />

        <g>
          {STAGE_NODES.map((node, index) => {
            const active = activeIndex >= index;
            const current = activeIndex === index;
            const color = node.tone === "red" ? RED : BLUE;

            return (
              <g key={`${node.x}-${node.y}`}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  fill="none"
                  stroke={color}
                  strokeWidth="0.9"
                  initial={false}
                  animate={{
                    r: stepRadius(activeIndex, index),
                    opacity: active ? (current ? 0.2 : 0.12) : 0.06,
                  }}
                  transition={traceTransition}
                />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  fill={color}
                  initial={false}
                  animate={{
                    r: current ? 4.5 : active ? 3.8 : 3.2,
                    opacity: stepOpacity(activeIndex, index),
                  }}
                  transition={traceTransition}
                />
              </g>
            );
          })}
        </g>

        <g stroke={INK} strokeLinecap="round" strokeOpacity="0.1">
          <path d="M248 104 H330" />
          <path d="M248 120 H306" />
          <path d="M238 288 H338" />
          <path d="M238 304 H296" />
        </g>

        <path
          d="M18 18 H36 M18 18 V36"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeOpacity="0.18"
          strokeLinecap="round"
        />
        <path
          d="M402 18 H384 M402 18 V36"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
        <path
          d="M18 402 H36 M18 402 V384"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
        <path
          d="M402 402 H384 M402 402 V384"
          stroke={RED}
          strokeWidth="1.2"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 flex h-full min-h-[25rem] flex-col justify-between xl:min-h-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-blue">
              {activeLayerLabel}
            </p>
            <motion.p
              key={activeStep.id}
              initial={reduced ? false : { opacity: 0.001, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransition}
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

        <div className="flex-1" />

        <div>
          <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-graphite-soft">
            {systemFocusLabel}
          </p>
          <motion.h3
            key={`title-${activeStep.id}`}
            initial={reduced ? false : { opacity: 0.001, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={textTransition}
            className="mt-2 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite"
          >
            {activeStep.title}
          </motion.h3>
          <div className="mt-3.5 grid gap-1.5 sm:grid-cols-2">
            {activeStep.bullets.slice(0, 4).map((bullet, bIndex) => (
              <motion.div
                key={bullet}
                initial={reduced ? false : { opacity: 0.001 }}
                animate={{ opacity: 1 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 0.22, delay: bIndex * 0.03, ease }
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
