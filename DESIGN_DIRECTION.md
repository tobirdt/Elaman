# Elaman design direction — Heritage Modern

## Status

Approved production direction for the bilingual six-section website.

## Experience statement

The site should feel like the carefully modernised homepage of an established German specialist company: direct, calm, discreet, and technically credible. It preserves recognisable content and supplied photography while replacing the former presentation with stronger hierarchy, generous whitespace, responsive composition, and accessible interaction.

The objective is confidence, not conversion theatre. Each desktop viewport communicates one dominant idea; mobile and short displays retain the same order without clipping or forced pagination.

## Visual character

- White and paper-soft are the default environment.
- Navy is reserved for the systems composition.
- Elaman blue marks identity, active state, and one restrained local accent.
- Red is concentrated in protection semantics and required form markers.
- Hairlines organise content locally without turning the page into a dashboard.
- Geist and Geist Mono provide a contemporary but neutral institutional voice.
- The supplied points-only Elaman signet stays visible in the compact header.

## Photography

The five approved supplied images create the page rhythm:

1. Chameleon macro — hero
2. Stone bridge — profile
3. Media Mining — systems
4. Tiger — protection
5. Munich office — contact

Each image has a distinct structural role. Images are static, tightly cropped, and colour-calmed where needed. Never decorate them with grids, diagrams, gradient washes, parallax, or animated effects. Do not add further photography without explicit approval.

## Homepage sequence

| Anchor        | Experience                                                                      |
| ------------- | ------------------------------------------------------------------------------- |
| `#hero`       | 50/50 chameleon and concise Elaman identity; header plus hero form one viewport |
| `#profile`    | Asymmetric white text/image composition with the stone bridge                   |
| `#advice`     | Paper-soft four-stage process using numerals and a continuous hairline          |
| `#systems`    | Navy split with Media Mining and an open, row-major capability ledger           |
| `#protection` | Panoramic tiger moment followed by one heading and four factual areas           |
| `#contact`    | Office image and a functional contact/form split within one desktop viewport    |

The footer follows as a compact legal close and does not participate in scroll snap.

## Fullscreen rhythm

- `screen` sections use `min-height: calc(100svh - var(--header-h))` with a `vh` fallback.
- Height is never fixed. Content, translations, validation messages, and short displays may grow naturally.
- Desktop with a fine pointer uses `scroll-snap-type: y proximity` for gentle orientation.
- Touch devices, tablet widths, and reduced-motion users scroll freely.
- There is no wheel interception, strict paging, nested scroll container, or scroll-bound animation.

## Section-specific direction

- Profile is spacious and left aligned; the single blue line supports the heading, while one quiet ruled management reference provides a factual internal link to the imprint.
- Advice is an actual ordered process, not a row of feature cards. Large mono numerals and one hairline communicate sequence.
- Systems is the highest-density section but remains open: horizontal rules, natural row-major order, no enclosed matrix.
- Protection carries exactly one red dot and one primary heading.
- Contact is functional and human. The office title is subordinate to the `Kontakt / Contact` heading, and the form remains visibly standard rather than a secure portal.

## Content tone

- Factual, concise, and human.
- Professional without bureaucratic filler.
- Discreet enough for the sector; no named clients or operational specifics.
- No invented claims, certifications, or statistics.
- German is composed as a primary language, not treated as a translation afterthought.
- Exactly one visible `20+` statement is enough.

## Motion character

Motion is nearly invisible:

- one progressive hero-copy entrance;
- short colour and rule feedback in navigation and controls;
- a direct mobile-menu state transition;
- native smooth anchor movement when reduced motion is not requested;
- no section reveals, scroll scrubbing, parallax, loops, or diagram animation.

Reduced-motion users receive the final state immediately and no smooth scrolling or snap behavior.

## Responsive behavior

- Mobile: natural vertical stacks, mobile menu, no snap, no internal scrolling.
- Tablet: stacked or two-column local layouts as space permits, no snap.
- Desktop: six clearly separated compositions with soft proximity snap.
- Short desktop: sections grow beyond one viewport when their content requires it.

All versions retain source order, visible focus, 44px targets, readable copy, and zero horizontal overflow.

## Explicit anti-direction

Do not reintroduce an abandoned alternative through code or documentation. The current site has no Scroll Story, DotMatrix decoration, signal map, technical grid, glass panels, floating cards, diagram system, or Framer Motion layer. It also has no place for cyberpunk imagery, a secure-portal claim, or sales-funnel urgency.
