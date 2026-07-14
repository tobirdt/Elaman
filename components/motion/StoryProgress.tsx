"use client";

import { motion, type MotionValue } from "framer-motion";

import type { StoryStep } from "@/types/site";

type StoryProgressProps = {
  steps: readonly StoryStep[];
  activeIndex: number;
  label: string;
  progress: MotionValue<number>;
};

export function StoryProgress({
  steps,
  activeIndex,
  label,
  progress,
}: StoryProgressProps) {
  return (
    <div className="mt-7 grid grid-cols-[1px_1fr] gap-5" aria-label={label}>
      <div className="relative bg-[var(--border-hairline)]">
        <motion.div
          className="absolute inset-0 origin-top bg-elaman-blue"
          style={{ scaleY: progress }}
        />
      </div>
      <ol className="space-y-3.5">
        {steps.map((step, index) => (
          <li
            key={step.id}
            aria-current={index === activeIndex ? "step" : undefined}
            className={`font-mono text-[0.66rem] uppercase tracking-[0.12em] transition-colors [transition-duration:var(--motion-micro)] ${
              index === activeIndex ? "text-elaman-blue" : "text-graphite-soft"
            }`}
          >
            {step.eyebrow}
          </li>
        ))}
      </ol>
    </div>
  );
}
