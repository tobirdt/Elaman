/**
 * Central motion system — single source of truth for easing, duration tiers,
 * scroll smoothing, and reusable Framer Motion variants. All animation work
 * composes from here so the site keeps one coherent, engineered language.
 *
 * Tiers:
 *  - micro/fast (120–180ms): hover, focus, press, color/border changes
 *  - state/medium/expand (240–320ms): accordion, menu, form feedback, text swaps
 *  - medium (300ms): once-only viewport reveals and line draws
 *  - slow (650ms): the single hero mark entrance
 *  - scroll-linked: no duration — MotionValues smoothed via `scrollSpring`
 *
 * Never animate: width/height/top/left (use scaleX/scaleY), filter/blur,
 * font-size, letter-spacing. No loops. Reveals fire once.
 */

export const motionEase = {
  /** Signature ease of the site — fast start, long settle. */
  out: [0.22, 1, 0.36, 1],
} as const;

export const motionDuration = {
  micro: 0.12,
  fast: 0.18,
  state: 0.24,
  medium: 0.3,
  expand: 0.32,
  /** Hero mark entrance only. */
  slow: 0.65,
} as const;

/** Spring for smoothing scroll progress before binding it to graphics. */
export const scrollSpring = {
  stiffness: 140,
  damping: 30,
  restDelta: 0.001,
} as const;

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
    transition: { duration: motionDuration.medium, ease: motionEase.out },
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
