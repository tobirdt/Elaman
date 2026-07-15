"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { DOT_COLORS } from "@/components/ui/DotMatrix";
import {
  BRAND_MARK_DOT_RADIUS,
  BRAND_MARK_VIEWBOX,
  brandMarkFormation,
} from "@/lib/design/formations";
import { dotStagger, motionDuration, motionEase } from "@/lib/motion/presets";

type HeroDotFieldProps = {
  className?: string;
  delayBase?: number;
};

const FORMATION = brandMarkFormation;

const ASSEMBLY_ORDER = FORMATION.dots
  .map((dot, index) => ({ dot, index }))
  .sort((a, b) => {
    const accentRank = (tone: (typeof FORMATION.dots)[number]["tone"]) =>
      tone === "red" ? 2 : tone === "blue" ? 1 : 0;
    const rankDifference = accentRank(a.dot.tone) - accentRank(b.dot.tone);

    if (rankDifference !== 0) return rankDifference;

    const aProgress = a.dot.x + Math.abs(a.dot.y) * 0.18;
    const bProgress = b.dot.x + Math.abs(b.dot.y) * 0.18;
    return aProgress - bProgress;
  })
  .reduce<Record<number, number>>((order, item, position) => {
    order[item.index] = position;
    return order;
  }, {});

export function HeroDotField({ className = "", delayBase = 0.18 }: HeroDotFieldProps) {
  const reduced = useReducedMotionPreference();

  return (
    <svg
      viewBox={`0 0 ${BRAND_MARK_VIEWBOX.width} ${BRAND_MARK_VIEWBOX.height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {FORMATION.dots.map((dot, index) => {
        const isAccent = dot.tone === "blue" || dot.tone === "red";
        const order = ASSEMBLY_ORDER[index] ?? index;

        return (
          <motion.circle
            key={index}
            className="hero-brand-dot"
            cx={dot.x}
            cy={dot.y}
            r={BRAND_MARK_DOT_RADIUS}
            fill={DOT_COLORS[dot.tone]}
            initial={{ opacity: 0.001, scale: 0.35 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    duration: isAccent ? motionDuration.trace : motionDuration.reveal,
                    ease: motionEase.out,
                    delay: delayBase + dotStagger(order, 0.025, 0.3),
                  }
            }
          />
        );
      })}
    </svg>
  );
}
