/**
 * Central motion system — single source of truth for easing, duration tiers,
 * springs, and reusable framer-motion variants. All animation work composes
 * from here so the site keeps one coherent, engineered motion language.
 *
 * Tiers:
 *  - micro/fast (120–180ms): hover, focus, press, color/border changes
 *  - state/medium/expand (240–320ms): accordion, menu, form feedback, text swaps
 *  - reveal/trace/entrance (380–600ms): once-only viewport entrances, line draws
 *  - scroll-linked: no duration — MotionValues smoothed via `scrollSpring`
 *
 * Never animate: width/height/top/left (use scaleX/scaleY), filter/blur,
 * font-size, letter-spacing. No loops. Reveals fire once.
 */

export const motionEase = {
  /** Signature ease of the site — fast start, long settle. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric ease for elements that move and return. */
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
  /** Hero load sequence only. */
  entrance: 0.6,
} as const;

/** Spring for smoothing scroll progress before binding it to graphics. */
export const scrollSpring = {
  stiffness: 90,
  damping: 26,
  restDelta: 0.001,
} as const;

/** Spring for dots moving between formation positions. */
export const formationSpring = {
  stiffness: 110,
  damping: 22,
} as const;

/** Transition helper that collapses to zero when reduced motion is preferred. */
export function easedTransition(
  reduced: boolean,
  duration: number = motionDuration.medium,
  delay = 0,
) {
  return reduced ? { duration: 0 } : { duration, ease: motionEase.out, delay };
}

/** Standard soft-reveal variants for content entering the viewport. */
export const revealVariants = {
  hidden: { opacity: 0.001, y: 10 },
  visible: { opacity: 1, y: 0 },
} as const;

/** Stronger rise for cards and larger panels. */
export const riseVariants = {
  hidden: { opacity: 0.001, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

/** Opacity-only variants for swapped text (paired with AnimatePresence). */
export const fadeVariants = {
  hidden: { opacity: 0.001 },
  visible: { opacity: 1 },
} as const;

/** Hairline/accent draw — apply to an element with its own height and originX 0. */
export const lineDrawVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
} as const;

/**
 * Child variants for use inside a `staggerContainer` — carries its own
 * transition so parents only orchestrate delays.
 */
export const staggerItem = {
  hidden: { opacity: 0.001, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase.out },
  },
} as const;

/**
 * Container variant that staggers its children's reveal.
 * Keep total delay ≤ 0.36s: small items 0.06, cards 0.09.
 */
export function staggerContainer(staggerChildren = 0.06, delayChildren = 0) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  } as const;
}

/** Default viewport config for whileInView reveals — always once. */
export const revealViewport = { once: true, amount: 0.24 } as const;

/**
 * Input range [start, end] of step `index` on a 0–1 scroll progress split
 * into `total` equal windows. `dwell` reserves the tail of each window as a
 * hold (graphics ease through the first 1-dwell portion, then rest).
 */
export function stepRange(index: number, total: number, dwell = 0): [number, number] {
  const size = 1 / total;
  const start = index * size;
  return [start, start + size * (1 - dwell)];
}

/** Per-dot entrance delay for dot-matrix formations. */
export function dotStagger(index: number, base = 0.024, cap = 0.6) {
  return Math.min(index * base, cap);
}
