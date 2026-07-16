---
name: motion-system
description: Enforce the current Elaman CSS motion system for any change involving animation, transition, hover feedback, menu state, smooth scrolling, entrances, or prefers-reduced-motion behavior. Use when adding, changing, removing, debugging, or reviewing motion in the Elaman website.
---

# Elaman Motion System

Keep movement calm, sparse, and accessible. The active site uses CSS transitions only and has no animation library.

## Read before editing

Read:

1. `app/globals.css`
2. `lib/design/tokens.ts`
3. the affected component
4. the motion section in `DESIGN_SYSTEM.md`

Do not add a second timing or easing system.

## Canonical tiers

| Token               | Duration | Purpose                             |
| ------------------- | -------: | ----------------------------------- |
| `--motion-micro`    |    120ms | Compact link/control feedback       |
| `--motion-fast`     |    180ms | Hover/focus colour and active rules |
| `--motion-state`    |    240ms | Mobile-menu state                   |
| `--motion-entrance` |    600ms | Single hero-copy entrance           |

Use `--motion-ease: cubic-bezier(0.22, 1, 0.36, 1)`.

## Current allowed motion

- Hero copy: once-only opacity plus 12px rise through `@starting-style`.
- Header/navigation: short colour and scale feedback.
- Mobile menu: direct opacity and translate state.
- Form fields: short border/background/focus feedback.
- Anchor scrolling: smooth normally, automatic for reduced motion.

Movement uses opacity and transforms. Do not animate width, height, positioning, font metrics, filter, blur, or layout.

## Prohibited motion

Do not add:

- Framer Motion or another animation dependency without explicit approval;
- scroll scrubbing, parallax, progress-bound visuals, or sticky animation stories;
- page-wide reveal wrappers;
- loops, pulses, particles, bouncing, radar effects, or perpetual decoration;
- animated diagrams, dot formations, glows, or filters.

## Reduced motion

The global `prefers-reduced-motion` rule must:

- disable smooth scrolling;
- reduce transitions and animations to an effectively immediate duration;
- leave all content in its final visible state;
- preserve menu, focus, and form behavior.

Do not rely on shortened spectacle; remove the motion path.

## Review workflow

1. State whether the motion supports orientation, hierarchy, or feedback.
2. Select an existing token.
3. Prefer CSS over a client dependency.
4. Verify only safe properties move.
5. Test normal and reduced motion on desktop and mobile.
6. Check the browser console for hydration or runtime errors.
7. Run lint, typecheck, format check, and build.

If movement is not necessary, keep the state static.
