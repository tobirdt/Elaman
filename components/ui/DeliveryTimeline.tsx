"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { DOT_COLORS } from "@/components/ui/DotMatrix";
import { motionDuration, motionEase, revealViewport } from "@/lib/motion/presets";
import type { DeliveryStep } from "@/types/site";

type DeliveryTimelineProps = {
  steps: readonly DeliveryStep[];
};

/**
 * Dot-to-line formation — five phases on one hairline. The line draws left
 * to right, dots pop in sequence, numerals rise. Step 5 carries the red
 * accent (support/protection semantics, matching the story's convention).
 */
export function DeliveryTimeline({ steps }: DeliveryTimelineProps) {
  const reduced = useReducedMotionPreference();
  const isLast = (index: number) => index === steps.length - 1;

  return (
    <div className="mt-10 lg:mt-14">
      <div className="relative hidden lg:block">
        <div
          className="absolute left-0 right-0 top-2 h-px bg-[var(--border-hairline)]"
          aria-hidden="true"
        />
        <motion.div
          className="absolute left-0 top-2 h-px origin-left bg-[var(--border-hairline-strong)]"
          aria-hidden="true"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={revealViewport}
          transition={{ duration: motionDuration.trace, ease: motionEase.out }}
          style={{ width: "100%" }}
        />
        <ol className="grid grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <li key={step.step} className="relative pt-2">
              <motion.span
                className="absolute left-0 top-0 block size-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                aria-hidden="true"
                style={{
                  backgroundColor: isLast(index) ? DOT_COLORS.red : DOT_COLORS.blue,
                }}
                initial={reduced ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={revealViewport}
                transition={{
                  duration: motionDuration.medium,
                  ease: motionEase.out,
                  delay: index * 0.06,
                }}
              />
              <p className="text-[length:var(--type-numeral)] font-semibold leading-none tracking-[var(--tracking-title)] text-graphite">
                {step.step}
              </p>
              <h3 className="mt-4 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                {step.title}
              </h3>
              <p className="mt-2.5 text-base leading-7 text-graphite-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative pl-8 lg:hidden">
        <div className="absolute bottom-0 left-2 top-0 w-px bg-[var(--border-hairline)]" />
        <ol className="grid gap-8">
          {steps.map((step, index) => (
            <li key={step.step} className="relative">
              <span
                className="absolute -left-8 top-1.5 block size-3 rounded-full"
                style={{
                  backgroundColor: isLast(index) ? DOT_COLORS.red : DOT_COLORS.blue,
                }}
                aria-hidden="true"
              />
              <p className="font-mono-label text-graphite-soft">{step.step}</p>
              <h3 className="mt-2 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                {step.title}
              </h3>
              <p className="mt-2.5 text-base leading-7 text-graphite-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
