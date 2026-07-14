"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { DOT_COLORS } from "@/components/ui/DotMatrix";
import { STORY_BLUE_INDEX, STORY_BOUNDS, storyFormations } from "@/lib/design/formations";
import { dotStagger, motionDuration, motionEase } from "@/lib/motion/presets";

type HeroDotFieldProps = {
  className?: string;
  delayBase?: number;
};

const FORMATION = storyFormations[0];
const PITCH = 30;
const DOT_RADIUS = 6;
const PADDING = 0.8;
const WIDTH = (STORY_BOUNDS.maxX - STORY_BOUNDS.minX + PADDING * 2) * PITCH;
const HEIGHT = (STORY_BOUNDS.maxY - STORY_BOUNDS.minY + PADDING * 2) * PITCH;
const ORIGIN_X = (-STORY_BOUNDS.minX + PADDING) * PITCH;
const ORIGIN_Y = (-STORY_BOUNDS.minY + PADDING) * PITCH;

export function HeroDotField({ className = "", delayBase = 0.18 }: HeroDotFieldProps) {
  const reduced = useReducedMotionPreference();

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {FORMATION.dots.map((dot, index) => {
        const cx = ORIGIN_X + dot.x * PITCH;
        const cy = ORIGIN_Y + dot.y * PITCH;
        const isBlue = index === STORY_BLUE_INDEX;

        return (
          <motion.circle
            key={index}
            cx={cx}
            cy={cy}
            r={isBlue ? DOT_RADIUS + 1.5 : DOT_RADIUS}
            fill={isBlue ? DOT_COLORS.blue : DOT_COLORS.ink}
            initial={{ opacity: 0.001, scale: 0.72 }}
            animate={{ opacity: isBlue ? 1 : 0.28, scale: 1 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            transition={{
              duration: reduced ? 0 : motionDuration.reveal,
              ease: motionEase.out,
              delay: reduced ? 0 : delayBase + dotStagger(index),
            }}
          />
        );
      })}
    </svg>
  );
}
