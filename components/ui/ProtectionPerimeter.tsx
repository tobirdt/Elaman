"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { DOT_COLORS, DotMatrix } from "@/components/ui/DotMatrix";
import { perimeterFormation } from "@/lib/design/formations";
import { motionDuration, motionEase, revealViewport } from "@/lib/motion/presets";

type ProtectionPerimeterProps = {
  className?: string;
};

const formation = perimeterFormation();
const PITCH = 18;
const PAD = 1;
const DOT_R = 4.5;

/**
 * The page's single red formation — a defensive ring around the protected
 * principal. It has one quiet entrance when the dark band enters view.
 */
export function ProtectionPerimeter({ className = "" }: ProtectionPerimeterProps) {
  const reduced = useReducedMotionPreference();

  if (reduced) {
    return (
      <DotMatrix
        className={className}
        dotRadius={DOT_R}
        formation={formation}
        inkOpacity={0.3}
        onDark
        padding={PAD}
        pitch={PITCH}
      />
    );
  }

  const xs = formation.dots.map((dot) => dot.x);
  const ys = formation.dots.map((dot) => dot.y);
  const minX = Math.min(...xs) - PAD;
  const maxX = Math.max(...xs) + PAD;
  const minY = Math.min(...ys) - PAD;
  const maxY = Math.max(...ys) + PAD;
  const width = (maxX - minX) * PITCH;
  const height = (maxY - minY) * PITCH;

  return (
    <motion.svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      initial={{ opacity: 0.001 }}
      whileInView={{ opacity: 1 }}
      viewport={revealViewport}
      transition={{ duration: motionDuration.medium, ease: motionEase.out }}
    >
      {formation.dots.map((dot, index) => {
        const cx = (dot.x - minX) * PITCH;
        const cy = (dot.y - minY) * PITCH;

        return (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r={dot.tone === "red" ? DOT_R + 1.5 : DOT_R}
            fill={dot.tone === "red" ? DOT_COLORS.red : DOT_COLORS.inkOnDark}
            fillOpacity={dot.tone === "red" ? 1 : 0.32}
          />
        );
      })}
    </motion.svg>
  );
}
