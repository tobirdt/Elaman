"use client";

import { motion } from "framer-motion";

import { DOT_COLORS } from "@/components/ui/DotMatrix";
import { motionEase } from "@/lib/motion/presets";
import type { ContentCard } from "@/types/site";

type SystemsMatrixProps = {
  items: readonly ContentCard[];
  activeIndex: number;
  onSelect: (index: number) => void;
  redIndex: number;
  className?: string;
};

/** 8 satellite positions in an incomplete diamond around the blue hub. */
const POSITIONS = [
  { x: 0, y: -2.4 },
  { x: 1.7, y: -1.7 },
  { x: 2.4, y: 0 },
  { x: 1.7, y: 1.7 },
  { x: 0, y: 2.4 },
  { x: -1.7, y: 1.7 },
  { x: -2.4, y: 0 },
  { x: -1.7, y: -1.7 },
] as const;

const PITCH = 34;
const PAD = 1.1;
const SIZE = (2.4 + PAD) * 2 * PITCH;
const CENTER = (2.4 + PAD) * PITCH;

function toX(x: number) {
  return CENTER + x * PITCH;
}

function toY(y: number) {
  return CENTER + y * PITCH;
}

/**
 * Eight satellites around the Elaman hub — one per system. The active
 * accordion item's dot fills and a leader line draws toward its label.
 * Mirrors onSelect via transparent hit targets; the accordion buttons remain
 * the accessible control.
 */
export function SystemsMatrix({
  items,
  activeIndex,
  onSelect,
  redIndex,
  className = "",
}: SystemsMatrixProps) {
  const active = items[activeIndex];
  const activePosition = POSITIONS[activeIndex] ?? POSITIONS[0];

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full"
        aria-hidden="true"
        focusable="false"
      >
        {POSITIONS.map((position, index) => (
          <line
            key={`spoke-${index}`}
            x1={CENTER}
            y1={CENTER}
            x2={toX(position.x)}
            y2={toY(position.y)}
            stroke={DOT_COLORS.ink}
            strokeOpacity={0.12}
            strokeWidth={1}
          />
        ))}

        <motion.line
          x1={CENTER}
          y1={CENTER}
          x2={toX(activePosition.x)}
          y2={toY(activePosition.y)}
          stroke={activeIndex === redIndex ? DOT_COLORS.red : DOT_COLORS.blue}
          strokeOpacity={0.5}
          strokeWidth={1.5}
          initial={false}
          animate={{ x2: toX(activePosition.x), y2: toY(activePosition.y) }}
          transition={{ duration: 0.32, ease: motionEase.out }}
        />

        <circle cx={CENTER} cy={CENTER} r={7} fill={DOT_COLORS.blue} />

        {POSITIONS.map((position, index) => {
          const isActive = index === activeIndex;
          const isRed = index === redIndex;

          return (
            <g key={index}>
              <motion.circle
                cx={toX(position.x)}
                cy={toY(position.y)}
                r={isActive ? 9 : 6}
                fill={isRed ? DOT_COLORS.red : DOT_COLORS.blue}
                fillOpacity={isActive ? 1 : 0.28}
                animate={{ r: isActive ? 9 : 6, fillOpacity: isActive ? 1 : 0.28 }}
                transition={{ duration: 0.24, ease: motionEase.out }}
              />
              <circle
                cx={toX(position.x)}
                cy={toY(position.y)}
                r={22}
                fill="transparent"
                className="pointer-events-auto cursor-pointer"
                onClick={() => onSelect(index)}
              />
            </g>
          );
        })}
      </svg>
      <div className="mt-4 border-t border-[var(--border-hairline)] pt-3">
        <p
          className={`font-mono-label ${activeIndex === redIndex ? "text-elaman-red" : "text-elaman-blue"}`}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <p className="mt-1 text-sm font-semibold text-graphite">{active?.title}</p>
      </div>
    </div>
  );
}
