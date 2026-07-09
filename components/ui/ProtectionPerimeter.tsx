"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { DOT_COLORS, DotMatrix } from "@/components/ui/DotMatrix";
import { perimeterFormation } from "@/lib/design/formations";
import { motionEase, revealViewport } from "@/lib/motion/presets";

type ProtectionPerimeterProps = {
  className?: string;
};

const formation = perimeterFormation();
const PITCH = 18;
const PAD = 1;
const DOT_R = 4.5;

/**
 * The page's single red formation — a defensive ring around the protected
 * principal. Ring dots light up sequentially clockwise, then the red center
 * settles. Fires once when the dark band enters the viewport.
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
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {formation.dots.map((dot, index) => {
        const cx = (dot.x - minX) * PITCH;
        const cy = (dot.y - minY) * PITCH;

        if (dot.tone === "red") {
          return (
            <motion.circle
              key={index}
              cx={cx}
              cy={cy}
              r={DOT_R + 1.5}
              fill={DOT_COLORS.red}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={revealViewport}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              transition={{ duration: 0.35, ease: motionEase.out, delay: 0.72 }}
            />
          );
        }

        return (
          <motion.circle
            key={index}
            cx={cx}
            cy={cy}
            r={DOT_R}
            fill={DOT_COLORS.inkOnDark}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.32 }}
            viewport={revealViewport}
            transition={{ duration: 0.3, ease: motionEase.out, delay: index * 0.04 }}
          />
        );
      })}
    </svg>
  );
}
