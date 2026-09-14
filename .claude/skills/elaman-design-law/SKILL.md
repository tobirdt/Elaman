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
3. `app/globals.css` and `lib/design/tokens.ts`
4. `DESIGN_SYSTEM.md`
5. The affected reachable component and its sibling sections

Reachable code is the final visual source of truth. Do not revive a removed implementation because an old commit or screenshot contains it.

## Protect the thesis

Require:

- white/paper-soft canvas with selective navy bands;
- the four approved heritage photographs, each in its assigned homepage, dossier, or contact-page role;
- supplied points-only Elaman signet in the header;
- Geist and Geist Mono only;
- strong editorial hierarchy and readable measures;
- flat surfaces, 1px hairlines, 2px content radius, and 6px control radius;
- one primary blue accent event per local composition;
- red limited to required and error form states;
- deliberate whitespace and discreet factual copy.

Reject glass, blur, gradients, grid overlays, glow, diagrams, DotMatrix decoration, feature-card walls, bento layouts, icon tiles, cyberpunk imagery, large shadows, new colours, new fonts, scroll snap, and unsupported claims.

## Current composition

Preserve this sequence unless explicitly changed:

Hero → Profile → Advice → Systems → Contact.

- Hero: chameleon, Elaman name, approved tagline, verified copy, one `25+` stat. Uses `Section` `variant="screen"`.
- Profile: white asymmetric composition with the stone-bridge image. `variant="feature"`.
- Advice: paper-soft ordered four-stage process with numerals and one hairline. `variant="feature"`.
- Systems: Navy Media Mining split and open five-area capability ledger, fifth entry spanning the full row. `variant="feature"`.
- Contact: Munich-office split, direct routes, and one action to the contact page. `variant="feature"`. **No form on the homepage** — the inquiry form lives only on `/de/kontakt` ↔ `/en/contact` (`ContactPage`).

`feature` sections fill the viewport below the header on a laptop but cap at `--section-feature-max` (46rem) on tall displays, so short compositions never float in empty paper; only the route `Hero` uses the uncapped `screen` variant. Each dossier hero and the contact-page hero replicate the same `calc(100svh - var(--header-h))` minimum in a hand-built section rather than through the `Section` primitive.

The capability ledger uses horizontal rules and an unambiguous DOM order. Do not restore a boxed matrix or vertical cell dividers.

## Use current primitives

Use only reachable primitives in `components/ui`: `Button`, `Container`, `Section`, `SectionHeader`, `SectionLabel`, and `TextLink`. Add a new abstraction only when at least two current consumers share a stable contract.

The two approved dossier compositions (`DetailDossier`) are:

- Company: office-led hero, the four-stage "So arbeiten wir." / "How we work." process (the same four steps as the homepage `AdviceSection`, told at greater length), bridge composition, factual management reference;
- Systems: navy Media Mining hero, open five-area ledger, project approach.

Dossiers use normal document flow, reciprocal localised routes, and no scroll snap. They may deepen verified homepage categories but must not add specifications, customers, tactical detail, or unsupported claims. Each ends in a `DetailClosing` band linking to the contact page.

The contact page (`ContactPage`) shares the dossier hero contract: a hero split with the Munich office photograph, then a content band pairing the direct contact `dl` with `ContactForm`.

The global header exposes Company, Systems, and Contact as three direct localised pages, plus the locale switch — no anchors anywhere in the menu. The signet acts as Home on desktop; the mobile overlay prepends an explicit Start / Home entry ahead of the other destinations. The active rule (`aria-current="page"`) matches the exact current path only.

The active codebase intentionally has no generic Surface, GlassPanel, TechnicalMark, DotMatrix, signal diagram, or anchor-scroll-management layer.

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
5. If transitions, entrances, or the scroll-linked reveal change, also apply `motion-system`.
6. Run lint, typecheck, format check, unit tests, and build.

For fullscreen work also verify:

- header plus Hero equal one normal viewport;
- `feature` sections cap correctly on tall/short desktop displays;
- mobile, tablet, short displays, and form-error states never clip or create internal scrollers;
- Company, Systems, and Contact all render correctly and the language switch lands on the matching reciprocal route from every page.

There is no scroll snap in the product; do not verify for it or reintroduce it.

Report intentional exceptions; do not silently create a parallel design system.
