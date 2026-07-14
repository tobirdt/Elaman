/**
 * Central motion system for Elaman.
 *
 * Tiers:
 * - 120–180ms micro feedback
 * - 240–320ms state changes
 * - 380–600ms reveals and entrances
 * - durationless scroll-linked MotionValues
 *
 * Animate transforms and opacity only. Lines draw with scale transforms.
 */
export const motionEase = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const motionDuration = {
  micro: 0.12,
  fast: 0.18,
  state: 0.24,
  medium: 0.3,
  expand: 0.32,
  reveal: 0.38,
  trace: 0.5,
  entrance: 0.6,
} as const;

export const scrollSpring = {
  stiffness: 140,
  damping: 30,
  restDelta: 0.001,
} as const;

export const formationSpring = {
  stiffness: 110,
  damping: 22,
} as const;

export function easedTransition(
  reduced: boolean,
  duration: number = motionDuration.medium,
  delay = 0,
) {
  return reduced ? { duration: 0 } : { duration, ease: motionEase.out, delay };
}

export const revealVariants = {
  hidden: { opacity: 0.001, y: 10 },
  visible: { opacity: 1, y: 0 },
} as const;

export const riseVariants = {
  hidden: { opacity: 0.001, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

export const fadeVariants = {
  hidden: { opacity: 0.001 },
  visible: { opacity: 1 },
} as const;

export const lineDrawVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
} as const;

export function staggerContainer(staggerChildren = 0.06, delayChildren = 0) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  } as const;
}

export const revealViewport = { once: true, amount: 0.24 } as const;

export function dotStagger(index: number, base = 0.012, cap = 0.28) {
  return Math.min(index * base, cap);
}
