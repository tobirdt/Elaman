---
name: elaman-design-law
description: Enforce the current Elaman heritage-modern visual system and review workflow. Use for every change to components, styles, CSS, Tailwind classes, visual primitives, typography, spacing, surfaces, colours, responsive layout, imagery, or page composition in the Elaman website, including small UI edits and visual audits.
---

# Elaman Design Law

Preserve the current production direction: a restrained, photography-led reconstruction of the former Elaman homepage for an institutional security-engineering audience.

## Read before editing

Read the relevant current source in this order:

1. `AGENTS.md`
2. `CONTENT_BLUEPRINT.md` when public copy is touched
3. `IMPLEMENTATION_PLAN.md`
4. `app/globals.css` and `lib/design/tokens.ts`
5. `DESIGN_DIRECTION.md` and `DESIGN_SYSTEM.md`
6. The affected reachable component and its sibling sections

Reachable code is the final visual source of truth. Do not revive a removed implementation because an old commit or screenshot contains it.

## Protect the thesis

Require:

- white/paper-soft canvas with selective navy bands;
- the four approved heritage photographs, each in its assigned homepage or dossier role;
- supplied points-only Elaman signet in the header;
- Geist and Geist Mono only;
- strong editorial hierarchy and readable measures;
- flat surfaces, 1px hairlines, 2px content radius, and 6px control radius;
- one primary blue accent event per local composition;
- red limited to required and error form states;
- deliberate whitespace and discreet factual copy.

Reject glass, blur, gradients, grid overlays, glow, diagrams, DotMatrix decoration, feature-card walls, bento layouts, icon tiles, cyberpunk imagery, large shadows, new colours, new fonts, and unsupported claims.

## Current composition

Preserve this sequence unless explicitly changed:

Hero → Profile → Advice → Systems → Contact.

- Hero: chameleon, Elaman name, approved tagline, verified copy, one `25+` stat.
- Profile: white asymmetric composition with the stone-bridge image.
- Advice: paper-soft ordered four-stage process with numerals and one hairline.
- Systems: Navy Media Mining split and open five-area capability ledger.
- Contact: Munich-office split, direct routes, standard inquiry form, footer after the section.

Each `screen` section owns at least the visible height below the sticky header but must grow naturally. The capability ledger uses horizontal rules and an unambiguous DOM order. Do not restore a boxed matrix or vertical cell dividers.

## Use current primitives

Use only reachable primitives in `components/ui`: `Button`, `Container`, `Section`, `SectionHeader`, `SectionLabel`, and `TextLink`. Add a new abstraction only when at least two current consumers share a stable contract.

The two approved dossier compositions are:

- Company: office-led hero, three working principles, stone bridge, factual management reference;
- Systems: navy Media Mining hero, open five-area ledger, project approach.

Dossiers use normal document flow, reciprocal localised routes, and no scroll snap. They may deepen verified homepage categories but must not add specifications, customers, tactical detail, or unsupported claims.

The global header exposes Company and Systems as direct localised dossier routes. Approach and Contact return to homepage anchors; the signet acts as Home on desktop, and the mobile overlay prepends an explicit Home / Start entry. The active rule must represent either the exact dossier route or its mapped homepage section.

The active codebase intentionally has no generic Surface, GlassPanel, TechnicalMark, DotMatrix, signal diagram, or reveal-wrapper layer.

## Audit every visual change

Before editing:

1. Identify the active implementation slice.
2. Identify the existing token and primitive contract.
3. Identify hierarchy, reading order, and the local accent.
4. Inspect sibling sections for consistency without repetition.

After editing:

1. Search for raw colours, undefined variables, arbitrary radii, ordinary shadows, and stale component names.
2. Confirm only approved imagery and fonts are used.
3. Check German and English at mobile, tablet, and desktop widths.
4. Check focus, touch targets, contrast, and overflow.
5. If transitions or entrances change, also apply `motion-system`.
6. Run lint, typecheck, format check, and build.

For fullscreen work also verify:

- header plus Hero equal one normal viewport;
- soft snap exists only on large fine-pointer non-reduced-motion environments;
- mobile, tablet, short displays, and form-error states never clip or create internal scrollers;
- all five anchors and hash-preserving locale changes land below the header.

Report intentional exceptions; do not silently create a parallel design system.
