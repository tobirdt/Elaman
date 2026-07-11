"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { DOT_COLORS } from "@/components/ui/DotMatrix";
import { motionDuration, motionEase } from "@/lib/motion/presets";
import type { ContentCard } from "@/types/site";

type SystemsMatrixProps = {
  items: readonly ContentCard[];
  activeIndex: number | null;
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
 * The map is visual context only. Accordion buttons supply the semantic
 * controls; the selected item is echoed below the diagram so colour is never
 * the sole indicator of the active category.
 */
export function SystemsMatrix({
  items,
  activeIndex,
  redIndex,
  className = "",
}: SystemsMatrixProps) {
  const reduced = useReducedMotionPreference();
  const active = activeIndex === null ? null : (items[activeIndex] ?? null);
  const activePosition = activeIndex === null ? null : (POSITIONS[activeIndex] ?? null);

  return (
    <div className={className}>
      <svg
        viewBox={"0 0 " + WIDTH + " " + HEIGHT}
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
          fill={DOT_COLORS.ink}
          fillOpacity={0.6}
        />

        {POSITIONS.map((position, index) => (
          <line
            key={"channel-" + index}
            x1={position.x}
            y1={position.y}
            x2={BUS_X}
            y2={position.y}
            stroke={DOT_COLORS.ink}
            strokeOpacity={0.12}
            strokeWidth={1}
          />
        ))}

        {activePosition && activeIndex !== null ? (
          <motion.line
            key={activeIndex}
            x1={activePosition.x}
            y1={activePosition.y}
            x2={BUS_X}
            y2={activePosition.y}
            stroke={activeIndex === redIndex ? DOT_COLORS.red : DOT_COLORS.blue}
            strokeOpacity={0.5}
            strokeWidth={1.5}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: motionDuration.medium, ease: motionEase.out }
            }
          />
        ) : null}

        {POSITIONS.map((position, index) => {
          const isActive = index === activeIndex;
          const isRed = index === redIndex;

          return (
            <motion.circle
              key={index}
              cx={position.x}
              cy={position.y}
              r={6}
              fill={
                isActive ? (isRed ? DOT_COLORS.red : DOT_COLORS.blue) : DOT_COLORS.ink
              }
              fillOpacity={isActive ? 1 : 0.28}
              animate={{ scale: isActive ? 1.5 : 1, fillOpacity: isActive ? 1 : 0.28 }}
              style={{ transformOrigin: position.x + "px " + position.y + "px" }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: motionDuration.state, ease: motionEase.out }
              }
            />
          );
        })}
      </svg>
      <div className="mt-4 border-t border-[var(--border-hairline)] pt-3">
        <p
          className={[
            "font-mono-label",
            activeIndex === redIndex ? "text-elaman-red" : "text-elaman-blue",
          ].join(" ")}
        >
          {activeIndex === null ? "—" : String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </p>
        {active ? (
          <p className="mt-1 text-sm font-semibold text-graphite">{active.title}</p>
        ) : null}
      </div>
    </div>
  );
}
