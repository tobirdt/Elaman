"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { DOT_COLORS, DotMatrix } from "@/components/ui/DotMatrix";
import { diamondFormation, DIAMOND_RADIUS, manhattan } from "@/lib/design/formations";
import { motionEase } from "@/lib/motion/presets";

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

function dotDelay(distance: number, delayBase: number) {
  return delayBase + distance * 0.12;
}

/**
 * The logo diamond as environment — 25 dots assembling on load, ordered by
 * Manhattan distance from the center. The blue dot settles last; the red dot
 * follows with a single expanding ring.
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
  const blueDelay = dotDelay(DIAMOND_RADIUS + 1, delayBase);
  const redDelay = blueDelay + 0.18;

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {diamondFormation.dots.map((dot, index) => {
        const cx = center + dot.x * PITCH;
        const cy = center + dot.y * PITCH;

        if (dot.tone === "blue") {
          return (
            <motion.circle
              key={index}
              cx={cx}
              cy={cy}
              r={DOT_R}
              fill={DOT_COLORS.blue}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              transition={{ duration: 0.4, ease: motionEase.out, delay: blueDelay }}
            />
          );
        }

        if (dot.tone === "red") {
          return (
            <g key={index}>
              <motion.circle
                cx={cx}
                cy={cy}
                r={DOT_R}
                fill="none"
                stroke={DOT_COLORS.red}
                strokeWidth={1}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2.6, opacity: 0 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                transition={{ duration: 0.9, ease: "easeOut", delay: redDelay + 0.2 }}
              />
              <motion.circle
                cx={cx}
                cy={cy}
                r={DOT_R}
                fill={DOT_COLORS.red}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                transition={{ duration: 0.35, ease: motionEase.out, delay: redDelay }}
              />
            </g>
          );
        }

        return (
          <motion.circle
            key={index}
            cx={cx}
            cy={cy}
            r={DOT_R}
            fill={DOT_COLORS.ink}
            initial={{ opacity: 0 }}
            animate={{ opacity: INK_OPACITY }}
            transition={{
              duration: 0.35,
              ease: motionEase.out,
              delay: dotDelay(manhattan(dot), delayBase),
            }}
          />
        );
      })}
    </svg>
  );
}
