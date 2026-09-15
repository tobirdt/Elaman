---
name: motion-system
description: Enforce the current Elaman CSS motion system for any change involving animation, transition, hover feedback, menu state, scroll-linked reveal, entrances, or prefers-reduced-motion behavior. Use when adding, changing, removing, debugging, or reviewing motion in the Elaman website.
---

# Elaman Motion System

Keep movement calm, sparse, and accessible. The active site uses CSS only and has no animation library and no scroll snap.

## Read before editing

Read:

1. `app/globals.css`
2. `lib/design/tokens.ts`
3. the affected component
4. the Motion section in `DESIGN_SYSTEM.md`

Do not add a second timing or easing system.

## Canonical tiers

| Token               | Duration | Purpose                             |
| ------------------- | -------: | ----------------------------------- |
| `--motion-micro`    |    120ms | Compact link/control feedback       |
| `--motion-fast`     |    180ms | Hover/focus colour and active rules |
| `--motion-state`    |    240ms | Mobile-menu state                   |
| `--motion-entrance` |    600ms | Coordinated route-hero entrance     |

Use `--motion-ease: cubic-bezier(0.22, 1, 0.36, 1)`.

## Current allowed motion

- **Opening entrance.** `.hero-copy-enter` / `.hero-image-enter`: once-only opacity plus a 12px rise (copy) or a 1.2% settling scale (image) through `@starting-style`, at `--motion-entrance`. Used by the homepage hero, every `PageHeader`, and every `MediaBand`. These are time-based transitions and always finish on their own.
- **Scroll-linked reveal.** `.reveal` and `.reveal-group > *` in `app/globals.css`: `animation: reveal-rise var(--motion-ease) both;` driven by `animation-timeline: view()` with `animation-range: entry 0% entry 32%` (staggered per child inside a `.reveal-group`, from the 2nd child on). It moves `transform` only — the same 12px rise. It is CSS-only — no `IntersectionObserver`, no JavaScript — and is gated two ways: `@supports (animation-timeline: view())` for browser support, and inside that, `@media (prefers-reduced-motion: no-preference)`. Outside either gate, elements simply render in their unanimated final state, which is the correct fallback, not a bug.

  **Never put `opacity` in a scroll-linked keyframe.** A scroll timeline has no end of its own: a block that is half inside the viewport when the page loads holds its half-way value until someone scrolls. A fade parks real text at a fraction of its opacity there, which drops it under the WCAG contrast floor for as long as the visitor sits still, and axe reports it as a serious violation on every route where it happens. Fades belong to the time-based tier above.

- Header/navigation: short colour and scale feedback.
- Mobile menu: direct opacity and translate state.
- Form fields: short border/background/focus feedback.

Movement uses opacity and transforms only. Do not animate width, height, positioning, font metrics, filter, or blur.

## Prohibited motion

Do not add:

- Framer Motion or another animation dependency without explicit approval;
- scroll snap of any kind — root-document, per-section, or via a `data-scroll-snap-page`-style marker; it was removed along with `AnchorScrollManager` and must not return;
- scroll scrubbing, parallax, progress-bound visuals, or sticky animation stories beyond the one approved `.reveal` entrance;
- page-wide reveal wrappers beyond `.reveal` / `.reveal-group`, and no extension of their animated properties past `transform`;
- loops, pulses, particles, bouncing, radar effects, or perpetual decoration;
- animated diagrams, dot formations, glows, or filters;
- wheel interception or a nested page scroller.

## Reduced motion

The global `prefers-reduced-motion: reduce` rule must:

- reduce transitions and animations to an effectively immediate duration (`0.01ms`, one iteration);
- leave all content in its final visible state;
- preserve menu, focus, and form behavior.

The `.reveal` / `.reveal-group` rules live entirely inside `@media (prefers-reduced-motion: no-preference)`, so a reduced-motion reader never receives the scroll-timeline animation in the first place — there is no separate override to maintain.

Do not rely on shortened spectacle; remove the motion path.

## Review workflow

1. State whether the motion supports orientation, hierarchy, or feedback.
2. Select an existing token.
3. Prefer CSS over a client dependency; prefer the existing `.reveal`/`.reveal-group` mechanism over a new one for scroll-triggered entrances.
4. Verify only opacity and transform move.
5. Test normal and reduced motion on desktop and mobile, and in a browser without `animation-timeline: view()` support.
6. Check the browser console for hydration or runtime errors.
7. Run lint, typecheck, format check, unit tests, and build.

If movement is not necessary, keep the state static.
