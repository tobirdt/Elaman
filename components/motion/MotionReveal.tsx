"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { motionDuration, motionEase, revealViewport } from "@/lib/motion/presets";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionReveal({ children, className = "", delay = 0 }: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotionPreference();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`motion-soft-reveal ${className}`}
      initial={{ opacity: 0.001, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: motionDuration.reveal, ease: motionEase.out, delay }}
    >
      {children}
    </motion.div>
  );
}
