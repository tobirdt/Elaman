"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { DOT_COLORS, DotMatrix } from "@/components/ui/DotMatrix";
import { diamondFormation, DIAMOND_RADIUS } from "@/lib/design/formations";
import { motionDuration, motionEase } from "@/lib/motion/presets";

type HeroDotFieldProps = {
  className?: string;
  /** Seconds before the first dots appear — coordinates with the text entrance. */
  delayBase?: number;
  /** Skip the entrance and render the final state (e.g. compact mobile use). */
  static?: boolean;
};

const PITCH = 12;
const DOT_R = 5.5;
const PADDING = 1;
const SIZE = (DIAMOND_RADIUS + PADDING) * 2 * PITCH;
const INK_OPACITY = 0.22;

/**
 * The logo diamond as environment. It has one calm entrance on desktop;
 * the dots themselves remain still so the mark reads as identity, not effect.
 */
export function HeroDotField({
  className = "",
  delayBase = 0.15,
  static: isStatic = false,
}: HeroDotFieldProps) {
  const reduced = useReducedMotionPreference();

  if (reduced || isStatic) {
    return (
      <DotMatrix
        className={className}
        formation={diamondFormation}
        inkOpacity={INK_OPACITY}
        padding={PADDING}
      />
    );
  }

  const center = (DIAMOND_RADIUS + PADDING) * PITCH;
  return (
    <motion.svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      initial={{ opacity: 0.001 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: motionDuration.slow,
        ease: motionEase.out,
        delay: delayBase,
      }}
    >
      {diamondFormation.dots.map((dot, index) => {
        const cx = center + dot.x * PITCH;
        const cy = center + dot.y * PITCH;

        return (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r={DOT_R}
            fill={dot.tone === "ink" ? DOT_COLORS.ink : DOT_COLORS[dot.tone]}
            fillOpacity={dot.tone === "ink" ? INK_OPACITY : 1}
          />
        );
      })}
    </motion.svg>
  );
}
