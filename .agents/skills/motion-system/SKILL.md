---
name: motion-system
description: Enforce the Elaman motion system for all animation work. Use whenever a task adds, changes, removes, debugs, or reviews animation, transition, hover motion, disclosure state, smooth scrolling, scroll-linked behavior, framer-motion, MotionValues, reveal choreography, or prefers-reduced-motion handling.
---

# Elaman Motion System

Make motion calm, precise, engineered, and accessible. Every movement must support orientation, hierarchy, or state feedback.

## Read before editing

Read:

1. lib/motion/presets.ts completely.
2. components/motion and the affected motion consumer.
3. lib/design/formations.ts for any dot animation.
4. DESIGN_SYSTEM.md motion rules.
5. .claude/agents/interaction-motion-designer.md when present.

Use lib/motion/presets.ts as the source of truth. Do not create local easing or duration systems.

## Use the canonical tiers

| Tier                      |    Duration | Purpose                                         |
| ------------------------- | ----------: | ----------------------------------------------- |
| Micro / fast              |   120–180ms | Hover, focus, press, colour and border feedback |
| State / medium / expand   |   240–320ms | Accordion, menu, form feedback, text swaps      |
| Reveal / trace / entrance |   380–600ms | Once-only viewport entrances and line draws     |
| Scroll-linked             | No duration | MotionValues smoothed with scrollSpring         |

Use:

- motionEase.out [0.22, 1, 0.36, 1] as the signature ease;
- motionEase.inOut [0.65, 0, 0.35, 1] only when an element moves and returns;
- scrollSpring at stiffness 140, damping 30;
- formationSpring at stiffness 110, damping 22 for dot position changes.

Do not hardcode a new duration or cubic-bezier when a preset fits.

## Keep the active homepage free of scroll-scrub motion

The approved heritage homepage renders no scroll-linked animation. HeroSection keeps its LCP image static and uses one progressive CSS entrance for the copy; the later photographic bands remain static.

Do not add useScroll, a scroll listener driving animation, scrubbed parallax, or progress-bound decorative effects without explicit approval. Dormant legacy story components may retain unused implementation until a separate cleanup slice, but they must not be reintroduced into the active route by accident. Event-triggered reveals do not count as scrub systems.

## Animate only safe properties

Animate:

- opacity;
- translate/scale/rotate transforms;
- SVG position MotionValues when required for the identity-preserving formation morph.

Draw hairlines with scaleX or scaleY.

Never animate:

- width or height;
- top, right, bottom, or left;
- filter or blur;
- font size;
- letter spacing;
- layout-dependent properties that trigger reflow.

Keep hover lift at or below 2px.

## Use purpose-led choreography

Allowed patterns:

- Reveal: opacity plus 10px rise, once.
- Rise: opacity plus 16px rise for a larger card or panel, once.
- Fade: opacity-only for state swaps.
- LineDraw: scaleX from the left.
- RevealGroup: 0.06s stagger for small items or 0.09s for cards.
- Dot assembly: shared formation data and controlled per-dot stagger.
- Formation morph: continuous shared MotionValue with identity-preserving indices.
- State change: 240–320ms with a direct visual relationship to the control.

Keep total stagger delay at or below 0.36s per group.

Do not use a uniform fade-in on every section. Vary internal choreography through register draws, formation assembly, ruled sequences, and hierarchy-led groups while keeping the overall language restrained.

## Prohibit spectacle

Do not add:

- loops or perpetual animation;
- breathing nodes;
- marching dashes;
- radar sweeps;
- particles;
- bounce;
- text parallax;
- scroll-scaled headlines;
- large perspective effects;
- repeated pulses;
- animated blur or glow;
- motion that exists only to make a static area feel “alive.”

The page is not a motion demo.

## Require reduced motion

Every motion change must define its reduced-motion final state.

Required behavior:

- Use useReducedMotionPreference in Framer Motion components.
- Render final content immediately when reduction is preferred.
- Use static DotMatrix formations instead of animated assembly/morphs.
- Use auto instead of smooth for programmatic scrolling.
- Do not merely shorten complex motion; remove the motion path.
- Preserve content order, state visibility, and control feedback without animation.

The global CSS media query is a safety net, not a substitute for component branching.

## Keep formation motion truthful

For dot formations:

- consume lib/design/formations.ts;
- preserve dot identity across story states;
- keep exactly one blue dot;
- introduce at most one red dot and only with protection semantics;
- keep ink dots low opacity;
- round trig-derived coordinates as the formation module does to avoid hydration drift;
- use the static version on mobile/reduced-motion where specified.

Do not create a visually similar but unrelated animation.

## Review workflow

Before editing:

1. State the animation’s purpose: orientation, hierarchy, or feedback.
2. Select the tier and existing preset.
3. Confirm the change does not introduce a homepage scrub system.
4. Define the reduced-motion final state.
5. Check whether a CSS transition is sufficient before adding Framer Motion.

After editing:

1. Search the change for hardcoded durations/eases and forbidden properties.
2. Confirm the active homepage dependency tree contains no useScroll consumer.
3. Verify every reveal uses once-only viewport behavior.
4. Verify stagger totals remain at or below 0.36s.
5. Verify hover lift is no more than 2px.
6. Test the hero-copy entrance, immediately visible hero image, and final static state at wide desktop.
7. Test menu, forms, and the stacked heritage composition at mobile width.
8. Test prefers-reduced-motion and smooth-scroll fallbacks.
9. Check for console or hydration errors.
10. Run npm run lint, npm run typecheck, and npm run build before signoff.

If motion does not clearly improve orientation, hierarchy, or feedback, keep the state static.
