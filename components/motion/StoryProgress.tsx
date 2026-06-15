"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { Surface } from "@/components/ui/Surface";
import type { StoryStep } from "@/types/site";

type StoryProgressProps = {
  steps: readonly StoryStep[];
  activeIndex: number;
  label: string;
};

export function StoryProgress({ steps, activeIndex, label }: StoryProgressProps) {
  const prefersReducedMotion = useReducedMotionPreference();
  const progress = ((activeIndex + 1) / steps.length) * 100;

  return (
    <Surface className="mt-5 p-4" variant="card">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-graphite-soft">
          {label}
        </p>
        <p className="text-xs font-semibold text-elaman-blue">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(steps.length).padStart(2, "0")}
        </p>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-graphite/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-elaman-blue to-elaman-red"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </div>
      <ol className="mt-4 grid gap-1.5">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center gap-3 text-xs">
            <span
              className={`size-1.5 shrink-0 rounded-full transition ${
                index < activeIndex
                  ? "bg-elaman-blue"
                  : index === activeIndex
                    ? "bg-elaman-blue scale-125"
                    : "bg-graphite/16"
              }`}
              aria-hidden="true"
            />
            <span
              className={`truncate ${
                index === activeIndex
                  ? "font-semibold text-graphite"
                  : index < activeIndex
                    ? "text-graphite-muted"
                    : "text-graphite-soft"
              }`}
            >
              {step.eyebrow}
            </span>
          </li>
        ))}
      </ol>
    </Surface>
  );
}
