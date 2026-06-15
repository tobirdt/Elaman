"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;

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
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.38, ease: revealEase, delay }}
    >
      {children}
    </motion.div>
  );
}
