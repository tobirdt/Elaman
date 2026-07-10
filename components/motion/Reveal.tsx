"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import {
  motionDuration,
  motionEase,
  revealVariants,
  revealViewport,
  riseVariants,
  staggerContainer,
  staggerItem,
} from "@/lib/motion/presets";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** rise = stronger 16px offset for cards/panels. */
  variant?: "reveal" | "rise";
};

/** Single once-only viewport reveal. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "reveal",
}: RevealProps) {
  const reduced = useReducedMotionPreference();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variant === "rise" ? riseVariants : revealVariants}
      transition={{ duration: motionDuration.reveal, ease: motionEase.out, delay }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** 0.06 for small items, 0.09 for cards. Total delay capped by design. */
  stagger?: number;
  delayChildren?: number;
};

/**
 * Orchestrates a staggered reveal — direct children opt in by rendering a
 * `RevealItem`. Fires once when the group enters the viewport.
 */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.06,
  delayChildren = 0,
}: RevealGroupProps) {
  const reduced = useReducedMotionPreference();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
};

/** Child of RevealGroup — carries the shared item variants. */
export function RevealItem({ children, className = "" }: RevealItemProps) {
  const reduced = useReducedMotionPreference();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
