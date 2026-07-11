"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import type { StoryStep } from "@/types/site";

type StoryProgressProps = {
  steps: readonly StoryStep[];
  activeIndex: number;
  detailId: string;
  label: string;
  /** Smoothed 0–1 runway progress — drives the continuous rail fill. */
  progress: MotionValue<number>;
  /** Index of the step with protection semantics (red accent). */
  redIndex: number;
  onSelect: (index: number) => void;
};

export function StoryProgress({
  steps,
  activeIndex,
  detailId,
  label,
  progress,
  redIndex,
  onSelect,
}: StoryProgressProps) {
  const reduced = useReducedMotionPreference();
  const fill = useTransform(progress, [0, 1], [0, 1]);

  return (
    <nav aria-label={label}>
      <p className="font-mono-label text-graphite-soft">{label}</p>
      <div className="relative mt-5">
        <div
          className="absolute bottom-0 left-0 top-0 w-px bg-[var(--border-hairline)]"
          aria-hidden="true"
        />
        <motion.div
          className="absolute left-0 top-0 h-full w-px origin-top bg-elaman-blue"
          style={
            reduced ? { scaleY: activeIndex / (steps.length - 1) } : { scaleY: fill }
          }
          aria-hidden="true"
        />
        <ol className="grid gap-1">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            const isRed = index === redIndex;

            return (
              <li key={step.id}>
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  aria-controls={detailId}
                  onClick={() => onSelect(index)}
                  className={`group flex min-h-11 w-full items-center gap-3 py-2 pl-5 text-left transition-colors [transition-duration:var(--motion-fast)] ${
                    isActive
                      ? "text-graphite"
                      : isPast
                        ? "text-graphite-muted hover:text-graphite"
                        : "text-graphite-soft hover:text-graphite-muted"
                  }`}
                >
                  <span
                    className={`font-mono-label ${
                      isActive ? (isRed ? "text-elaman-red" : "text-elaman-blue") : ""
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-sm leading-snug ${isActive ? "font-semibold" : "font-medium"}`}
                  >
                    {step.eyebrow.replace(/^\d+\s*\/\s*/, "")}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
