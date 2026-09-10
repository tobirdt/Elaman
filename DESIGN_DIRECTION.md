# Elaman design direction — Heritage Modern

## Status

Approved production direction for the bilingual five-section homepage and its two focused dossier pages.

## Experience statement

The site should feel like the carefully modernised digital presence of an established German specialist company: direct, calm, discreet, and technically credible. The homepage gives a clear overview; two focused dossiers provide additional substance for the company and systems. Recognisable content and supplied photography remain, while hierarchy, whitespace, responsive composition, and accessible interaction are contemporary.

The objective is confidence, not conversion theatre. Each desktop viewport communicates one dominant idea; mobile and short displays retain the same order without clipping or forced pagination.

## Visual character

- White and paper-soft are the default environment.
- Navy is reserved for the systems composition.
- Elaman blue marks identity, active state, and one restrained local accent.
- Red is limited to required and error form states.
- Hairlines organise content locally without turning the page into a dashboard.
- Geist and Geist Mono provide a contemporary but neutral institutional voice.
- The supplied points-only Elaman signet stays visible in the compact header.

## Photography

Four approved supplied images create the site rhythm:

1. Chameleon macro — hero
2. Stone bridge — profile
3. Media Mining — systems
4. Munich office — contact

Each image has a distinct structural role. Images are static, tightly cropped, and colour-calmed where needed. Route-specific social crops are derivatives of this set. Never decorate images with grids, diagrams, gradient washes, parallax, or animated effects. Do not add further photography without explicit approval.

## Homepage sequence

| Anchor     | Experience                                                                      |
| ---------- | ------------------------------------------------------------------------------- |
| `#hero`    | 50/50 chameleon and concise Elaman identity; header plus hero form one viewport |
| `#profile` | Asymmetric white text/image composition with the stone bridge                   |
| `#advice`  | Paper-soft four-stage process using numerals and a continuous hairline          |
| `#systems` | Navy split with Media Mining and an open, row-major capability ledger           |
| `#contact` | Office image and a functional contact/form split within one desktop viewport    |

The footer follows as a compact legal close. On the homepage it supplies the terminal end-aligned snap point so the last wheel or trackpad gesture settles at the real page end instead of returning to the Contact section. Legal and utility pages do not opt into this behavior.

## Fullscreen rhythm

- `screen` sections use `min-height: calc(100svh - var(--header-h))` with a `vh` fallback.
- Height is never fixed. Content, translations, validation messages, and short displays may grow naturally.
- The marked homepage uses `scroll-snap-type: y proximity` on desktops with a fine pointer; dossier and legal routes remain unsnapped.
- The homepage footer is the sole terminal `end` snap target; it keeps the compact legal close fully reachable after Contact.
- Touch devices, tablet widths, and reduced-motion users scroll freely.
- There is no wheel interception, strict paging, nested scroll container, or scroll-bound animation.

## Section-specific direction

- Profile is spacious and left aligned; the single blue line supports the heading, while one quiet ruled management reference provides a factual internal link to the imprint.
- Advice is an actual ordered process, not a row of feature cards. Large mono numerals and one hairline communicate sequence.
- Systems is the highest-density section but remains open: horizontal rules, natural row-major order, no enclosed matrix.
- Contact is functional and human. The office title is subordinate to the `Kontakt / Contact` heading, and the form remains visibly standard rather than a secure portal.

## Dossier pages

- Company is office-led and human without inventing a portrait or biography. Three working principles and the stone-bridge composition carry the narrative.
- Systems begins with the established navy photography language, then opens into a calm five-area ledger and a concise project approach.
- All dossiers use normal document flow, localised reciprocal routes, contextual links back to the homepage, and a restrained contact close.

## Content tone

- Factual, concise, and human.
- Professional without bureaucratic filler.
- Discreet enough for the sector; no named clients or operational specifics.
- No invented claims, certifications, or statistics.
- German is composed as a primary language, not treated as a translation afterthought.
- Exactly one visible `25+` statement is enough.

## Motion character

Motion is nearly invisible:

- one coordinated route-hero entrance for image and copy;
- short colour and rule feedback in navigation and controls;
- a direct mobile-menu state transition;
- native smooth anchor movement when reduced motion is not requested;
- no section reveals, scroll scrubbing, parallax, loops, or diagram animation.

Reduced-motion users receive the final state immediately and no smooth scrolling or snap behavior.

The header acts as global orientation rather than a homepage table of contents: the two substantive dossier pages are directly visible, while Approach and Contact return to their precise homepage sections. The points-only signet remains the quiet desktop home action; mobile adds an explicit Home / Start entry.

## Responsive behavior

- Mobile: natural vertical stacks, mobile menu, no snap, no internal scrolling.
- Tablet: stacked or two-column local layouts as space permits, no snap.
- Desktop: five clearly separated compositions with soft proximity snap.
- Short desktop: sections grow beyond one viewport when their content requires it.

All versions retain source order, visible focus, 44px targets, readable copy, and zero horizontal overflow.

## Explicit anti-direction

Do not reintroduce an abandoned alternative through code or documentation. The current site has no Scroll Story, DotMatrix decoration, signal map, technical grid, glass panels, floating cards, diagram system, or Framer Motion layer. It also has no place for cyberpunk imagery, a secure-portal claim, or sales-funnel urgency.
