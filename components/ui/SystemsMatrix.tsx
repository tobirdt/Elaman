"use client";

import { motion } from "framer-motion";

import { DOT_COLORS } from "@/components/ui/DotMatrix";
import { motionEase } from "@/lib/motion/presets";
import type { ContentCard } from "@/types/site";

type SystemsMatrixProps = {
  items: readonly ContentCard[];
  activeIndex: number;
  redIndex: number;
  className?: string;
};

/** Eight system endpoints connected to a shared integration bus. */
const POSITIONS = [
  { x: 34, y: 30 },
  { x: 34, y: 90 },
  { x: 34, y: 150 },
  { x: 34, y: 210 },
  { x: 246, y: 30 },
  { x: 246, y: 90 },
  { x: 246, y: 150 },
  { x: 246, y: 210 },
] as const;

const WIDTH = 280;
const HEIGHT = 240;
const BUS_X = WIDTH / 2;

/**
 * Eight system endpoints connect to a central integration bus. The active
 * accordion item highlights one signal path without turning the diagram
 * itself into an additional control.
 * The adjacent accordion remains the sole interactive control.
 */
export function SystemsMatrix({
  items,
  activeIndex,
  redIndex,
  className = "",
}: SystemsMatrixProps) {
  const active = items[activeIndex];
  const activePosition = POSITIONS[activeIndex] ?? POSITIONS[0];

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        aria-hidden="true"
        focusable="false"
      >
        <line
          x1={BUS_X}
          y1={18}
          x2={BUS_X}
          y2={222}
          stroke={DOT_COLORS.ink}
          strokeOpacity={0.22}
          strokeWidth={1.5}
        />
        <rect
          x={BUS_X - 8}
          y={HEIGHT / 2 - 8}
          width={16}
          height={16}
          fill={DOT_COLORS.blue}
        />

        {POSITIONS.map((position, index) => (
          <line
            key={`channel-${index}`}
            x1={position.x}
            y1={position.y}
            x2={BUS_X}
            y2={position.y}
            stroke={DOT_COLORS.ink}
            strokeOpacity={0.12}
            strokeWidth={1}
          />
        ))}

        <motion.line
          key={activeIndex}
          x1={activePosition.x}
          y1={activePosition.y}
          x2={BUS_X}
          y2={activePosition.y}
          stroke={activeIndex === redIndex ? DOT_COLORS.red : DOT_COLORS.blue}
          strokeOpacity={0.5}
          strokeWidth={1.5}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.32, ease: motionEase.out }}
        />

        {POSITIONS.map((position, index) => {
          const isActive = index === activeIndex;
          const isRed = index === redIndex;

          return (
            <motion.circle
              key={index}
              cx={position.x}
              cy={position.y}
              r={6}
              fill={isRed ? DOT_COLORS.red : DOT_COLORS.blue}
              fillOpacity={isActive ? 1 : 0.28}
              animate={{ scale: isActive ? 1.5 : 1, fillOpacity: isActive ? 1 : 0.28 }}
              style={{ transformOrigin: `${position.x}px ${position.y}px` }}
              transition={{ duration: 0.24, ease: motionEase.out }}
            />
          );
        })}
      </svg>
      <div className="mt-4 border-t border-[var(--border-hairline)] pt-3">
        <p
          className={`font-mono-label ${activeIndex === redIndex ? "text-elaman-red" : "text-elaman-blue"}`}
        >
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </p>
        <p className="mt-1 text-sm font-semibold text-graphite">{active?.title}</p>
      </div>
    </div>
  );
}
