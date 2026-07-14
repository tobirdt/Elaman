---
name: elaman-design-law
description: Enforce the Elaman precision-dossier visual system and review workflow. Use for every change to components, styles, CSS, Tailwind classes, visual primitives, typography, spacing, surfaces, colours, responsive layout, or page composition in the Elaman website, including seemingly small UI edits and visual audits.
---

# Elaman Design Law

Apply the Precision Dossier system to every visual change. Preserve the site’s institutional, flat-paper, logo-derived identity and stop local styling decisions from creating a parallel system.

## Read before editing

Read the relevant current source in this order:

1. AGENTS.md for project constraints and scope.
2. CONTENT_BLUEPRINT.md when public copy is touched.
3. IMPLEMENTATION_PLAN.md for the active slice.
4. app/globals.css and lib/design/tokens.ts for tokens.
5. lib/design/formations.ts when any technical graphic or dot composition is involved.
6. DESIGN_DIRECTION.md and DESIGN_SYSTEM.md for intent and component contracts.
7. The affected primitives in components/ui and the sibling sections in components/sections.

Treat code as the final visual source of truth. When documentation and implementation differ, verify the current implementation before changing either.

## Protect the thesis

Make the result read as a precision engineering dossier:

- white-first paper and paper-soft bands;
- selective navy contrast;
- 1px hairline registers;
- 2px card/panel radius;
- restrained 6px control radius;
- no ordinary card shadows;
- strong editorial hierarchy;
- Geist for editorial text;
- Geist Mono for concise technical labels;
- logo-derived dot formations;
- oversized factual numerals;
- deliberate whitespace.

Do not make the page friendlier, softer, more colourful, more “tech,” or more visually busy.

## Use only the canonical palette

| Token | Value | Meaning |
|---|---:|---|
| paper | #ffffff | Canvas |
| paper-soft | #f7f8fa | Quiet contrast |
| line | rgba(22, 24, 29, 0.12) | Hairline |
| graphite | #16181d | Primary ink |
| graphite-muted | #555d6b | Body |
| graphite-soft | #667286 | Metadata |
| elaman-blue | #244074 | Elaman/active |
| elaman-red | #d83034 | Protection |
| navy | #172033 | Dark band |
| on-dark | #f7f8fa | Primary on navy |
| on-dark-muted | #c7d0dc | Secondary on navy |

Use #ff6b6f only through the red-on-dark token. Never add a local brand-adjacent colour, raw hex value, gradient ramp, glow, or status palette.

Keep app/globals.css and lib/design/tokens.ts synchronized when a token change is explicitly approved.

## Enforce the one-accent law

For every dot composition:

1. Render exactly one blue dot for Elaman, focus, or the active state.
2. Render at most one red dot.
3. Use red only for protection semantics.
4. Render all other dots in low-opacity graphite or on-dark ink.
5. Reuse formation data from lib/design/formations.ts.

Do not introduce local coordinate systems when a shared formation can express the state. Do not repeat the same formation in adjacent sections or use dots as wallpaper.

For non-dot compositions, keep one primary accent event: one active rule, label, path, or signal. Do not distribute blue and red across unrelated decoration.

## Use the signature devices

- SectionRule: open each top-level homepage section with a full-width hairline, zero-padded index, and terse mono keyword.
- MonoLabel: use only for eyebrows, state, sequence, and technical metadata.
- Stat: pair one oversized factual value with a mono caption; keep one coherent group per viewport.
- DotMatrix: render shared formations statically; animated variants must consume the same formation data.

Do not recreate these contracts with one-off markup.

## Compose with the existing primitives

Use:

- Section variants: hero-screen, screen, screen-lite, content-band, legal-page.
- Container sizes: page, content, copy, narrow, legal.
- Surface variants: card, inset, navy; raised only for overlays.
- SectionHeader for title hierarchy.
- Button variants: primary, secondary, ghost.

Legacy section props and surface aliases are migration-only. Do not use them in new code.

Prefer asymmetric editorial compositions, ruled lists, and content-specific internal rhythms. Avoid repeating a centered heading plus equal-card grid from section to section.

## Preserve typography

- Keep Geist and Geist Mono; do not add or substitute fonts.
- Use the canonical display, H2, H3, lead, body, small, numeral, and mono-label tokens.
- Use mono only for terse technical content.
- Use text-balance for headings.
- Keep body copy within readable widths.
- Do not animate or arbitrarily override font size, tracking, or line height.

## Preserve surface discipline

- Ordinary surfaces are flat paper/paper-soft/navy with a hairline.
- Card radius is 2px.
- Control radius is 6px.
- Pills are reserved for genuinely pill-shaped controls.
- shadow-overlay is reserved for UI that physically overlays content.
- Do not use blur, translucency, frosted panels, card shadow stacks, or large rounded boxes.

## Respect page structure

Preserve this fixed sequence unless explicitly approved:

Hero → Experience → Story → Capabilities → Systems → Protection → Delivery → Contact.

Keep the Protection section as the selective navy band and the principal red moment. Keep the Formation Machine in the Story section.

Do not redesign sections outside the active implementation slice.

## Reject prohibited patterns

Reject any change that introduces:

- glassmorphism;
- technical-grid or graph-paper overlays;
- gradient blobs, washes, or glows;
- neon/cyberpunk styling;
- bento/mosaic layouts;
- icon tiles or generic feature-card grids;
- decorative stock/cyber-security imagery;
- large shadows or soft SaaS rounding;
- new colours;
- new fonts;
- ornaments without semantic meaning;
- hardcoded marketing strings;
- uniform motion pasted across every section;
- CI workflow or quality-gate edits.

Removed legacy primitives are not an alternative design vocabulary.

## Audit the change

Before editing:

1. Identify the active implementation slice.
2. Identify the existing primitive and token contracts.
3. Identify the composition’s single accent and hierarchy.
4. Inspect sibling sections to avoid visual repetition.

After editing:

1. Search for raw colours, arbitrary radii, shadows, and deprecated aliases.
2. Verify formation accent governance.
3. Verify Geist/Geist Mono only.
4. Verify SectionRule, MonoLabel, and Stat usage is semantic.
5. Check desktop and mobile composition.
6. Check focus, touch targets, contrast, and overflow.
7. If motion is present, also apply the motion-system skill.
8. Run npm run lint, npm run typecheck, and npm run build before signoff.

Report any intentional exception and its approval; do not silently bend the system.
