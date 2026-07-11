"use client";

import { motion } from "framer-motion";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import {
  lineDrawVariants,
  motionDuration,
  motionEase,
  revealViewport,
} from "@/lib/motion/presets";

type LineDrawProps = {
  className?: string;
  delay?: number;
  onDark?: boolean;
  accent?: "ink" | "blue" | "red";
};

const accentClasses = {
  ink: "bg-[var(--border-hairline)]",
  blue: "bg-elaman-blue/40",
  red: "bg-elaman-red/40",
} as const;

/**
 * A once-only hairline draw for section orientation.
 */
export function LineDraw({
  className = "",
  delay = 0,
  onDark = false,
  accent = "ink",
}: LineDrawProps) {
  const reduced = useReducedMotionPreference();
  const color =
    onDark && accent === "ink" ? "bg-[var(--border-on-navy)]" : accentClasses[accent];
  const classes = `h-px w-full origin-left ${color} ${className}`;

  if (reduced) {
    return <div className={classes} aria-hidden="true" />;
  }

  return (
    <motion.div
      className={classes}
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={lineDrawVariants}
      transition={{ duration: motionDuration.medium, ease: motionEase.out, delay }}
    />
  );
}
