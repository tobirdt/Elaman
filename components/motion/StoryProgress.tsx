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
  const progress = steps.length > 1 ? (activeIndex / (steps.length - 1)) * 100 : 100;
  const redStart = steps.length > 1 ? (3 / (steps.length - 1)) * 100 : 0;

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
      <div className="relative mt-4 h-8">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-graphite/10" />
        <motion.div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-elaman-blue"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          }
        />
        {activeIndex >= 4 && (
          <motion.div
            className="absolute top-1/2 h-px -translate-y-1/2 bg-elaman-red"
            style={{ left: `${redStart}%` }}
            initial={false}
            animate={{ width: `${Math.max(0, progress - redStart)}%` }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
          />
        )}
        {steps.map((step, index) => {
          const position = steps.length > 1 ? (index / (steps.length - 1)) * 100 : 0;
          const active = index <= activeIndex;
          const current = index === activeIndex;
          const red = index === 4 && activeIndex >= 4;

          return (
            <span
              key={step.id}
              className={`absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] ${
                active
                  ? red
                    ? "border-elaman-red bg-elaman-red"
                    : "border-elaman-blue bg-elaman-blue"
                  : "border-graphite/12 bg-white"
              } ${current ? "ring-2 ring-elaman-blue/12" : ""}`}
              style={{ left: `${position}%` }}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <ol className="mt-4 grid gap-1.5">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center gap-3 text-xs">
            <span
              className={`size-1.5 shrink-0 rounded-full transition ${
                index < activeIndex
                  ? "bg-elaman-blue"
                  : index === activeIndex
                    ? "bg-elaman-blue ring-2 ring-elaman-blue/12"
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
