# Elaman GmbH — Precision Dossier Design System

Implementation reference for the current Elaman website. The canonical sources are app/globals.css, lib/design/tokens.ts, lib/design/formations.ts, and lib/motion/presets.ts. This document describes that code; it does not supersede it.

## 1. System thesis

The visual system is a white-first, institutional “Precision Dossier”:

- flat paper instead of simulated glass;
- hairline registers instead of card shadows;
- sharp 2px panels instead of soft SaaS rounding;
- Geist and Geist Mono instead of decorative brand-font substitutions;
- logo-derived dot formations instead of generic technical grids;
- deliberate oversized figures instead of badge walls;
- sparse Elaman blue and protection-only red instead of broad accent colour.

The result should feel engineered, calm, factual, and distinctive at procurement distance.

## 2. Canonical tokens

The CSS custom properties in app/globals.css and the typed mirror in lib/design/tokens.ts must stay identical. Never add a one-off colour, radius, duration, or container value in a component when a token exists.

### Colour

| Semantic token | CSS token | Value | Use |
|---|---|---:|---|
| paper | --color-paper | #ffffff | Primary canvas |
| paper-soft | --color-paper-soft | #f7f8fa | Quiet section or inset contrast |
| line | --color-line | rgba(22, 24, 29, 0.12) | Default hairline |
| graphite | --color-graphite | #16181d | Primary ink and text |
| graphite-muted | --color-graphite-muted | #555d6b | Body and secondary text |
| graphite-soft | --color-graphite-soft | #667286 | Metadata and tertiary text |
| elaman-blue | --color-elaman-blue | #244074 | Elaman, focus, active state |
| elaman-red | --color-elaman-red | #d83034 | Protection semantics |
| red-on-dark | --color-elaman-red-on-dark | #ff6b6f | Accessible protection accent on navy |
| navy | --color-navy | #172033 | Selective dark band |
| on-dark | --color-on-dark | #f7f8fa | Primary content on navy |
| on-dark-muted | --color-on-dark-muted | #c7d0dc | Secondary content on navy |

Action and selection tokens:

| Token | Value |
|---|---:|
| --color-action-primary | #16181d |
| --color-action-primary-hover | #244074 |
| --color-on-primary | #ffffff |
| --color-selection | rgba(36, 64, 116, 0.16) |

Rules:

- Blue means Elaman, active, selected, focused, or the single directed signal.
- Red means protection, countermeasure, risk, or the protected principal.
- Red is never a generic hover colour or a way to make a composition livelier.
- Do not add cyan, purple, green status palettes, gradient ramps, or “near-brand” blues.
- Focus uses one global 2px elaman-blue outline; components do not create competing focus systems.

### Surfaces and borders

| Token | Value | Rule |
|---|---:|---|
| --surface-paper | #ffffff | Default surface |
| --surface-paper-soft | #f7f8fa | Inset or alternating band |
| --surface-navy | #172033 | Protection band |
| --surface-raised | #ffffff | Overlaying UI only |
| --border-hairline | rgba(22, 24, 29, 0.12) | Default 1px rule |
| --border-hairline-strong | rgba(22, 24, 29, 0.24) | Strong control edge |
| --border-on-navy | rgba(255, 255, 255, 0.14) | Dark-band rule |
| --border-accent-blue | rgba(36, 64, 116, 0.24) | Blue interactive edge |
| --border-accent-red | rgba(216, 48, 52, 0.24) | Protection interactive edge |

All ordinary cards and panels are flat:

- 1px hairline border;
- paper or paper-soft background;
- 2px card radius;
- no blur, translucency, or card shadow.

The sole shadow is --shadow-overlay: 0 16px 48px rgba(22, 24, 29, 0.12). Reserve it for UI that overlays page content, such as mobile navigation or sticky chrome.

### Radius

| Token | Value | Use |
|---|---:|---|
| --radius-card | 0.125rem / 2px | Cards, panels, system fields |
| --radius-control | 0.375rem / 6px | Buttons, inputs, disclosure controls |
| --radius-pill | 999px | Language switcher and genuinely pill-shaped controls |

Do not introduce intermediate “friendly SaaS” radii.

## 3. Layout

### Containers

| Size | Max width | Use |
|---|---:|---|
| page | 80rem | Homepage composition |
| content | 64rem | Dense content blocks |
| copy | 42rem | Long-form copy and section introductions |
| narrow | 30rem | Focused side columns |
| legal | 56rem | Legal documents |

Horizontal page padding is clamp(1.25rem, 4vw, 4rem).

### Section modes

| Variant | Vertical rhythm | Minimum height |
|---|---|---|
| hero-screen | clamp(2rem, 5vw, 3rem) | viewport minus header |
| screen | clamp(4rem, 7vw, 6rem) | viewport minus header |
| screen-lite | clamp(3.25rem, 6vw, 5rem) | 24rem to 40rem, viewport-aware |
| content-band | clamp(3.75rem, 6vw, 5.5rem) | content-led |
| legal-page | clamp(2.75rem, 5vw, 4.25rem) | content-led |

Use components/ui/Section and components/ui/Container. The deprecated screen/compact props and legacy section aliases are migration-only.

### Composition

- Align each section to the same page spine, then vary internal composition by content.
- Use full-width rules to establish register and sequence.
- Prefer asymmetric editorial grids with clear hierarchy over a repeated centered heading plus card grid.
- Keep one dominant idea per viewport.
- Whitespace is structural; do not fill it with ornamental graphics.
- Avoid repeating the same card count, reveal, and column split in adjacent sections.

## 4. Typography

The type system is fixed:

- Geist via --font-elaman-sans for display, headings, body, controls, and numerals.
- Geist Mono via --font-elaman-mono for concise technical labels and sequence metadata.

Do not add Jost, Futura substitutes, display serifs, or additional monospace fonts.

### Scale

| Role | Token | Size | Leading | Tracking |
|---|---|---:|---:|---:|
| Display | --type-display | clamp(3rem, 8vw, 6.5rem) | 0.98 | -0.04em |
| H2 | --type-h2 | clamp(2rem, 4.5vw, 3.5rem) | 1.08 | -0.02em |
| H3 | --type-h3 | clamp(1.25rem, 1.8vw, 1.625rem) | 1.08 | -0.02em |
| Numeral | --type-numeral | clamp(2.5rem, 5vw, 4.5rem) | 1 | -0.02em |
| Lead | --type-lead | clamp(1rem, 1.35vw, 1.25rem) | 1.6 | normal |
| Body | --type-body | 1rem | 1.6 | normal |
| Small | --type-small | 0.875rem | contextual | contextual |
| Mono label | --type-mono-label | 0.6875rem | contextual | 0.1em |

Rules:

- One display-level statement in the hero.
- Section titles use H2; internal titles use H3.
- Use text-balance for titles, not arbitrary manual line breaks.
- Body copy normally stays within the copy container.
- Mono labels are uppercase, 500 weight, and terse.
- Large figures must be factual, legible, and paired with a mono caption.

## 5. Signature devices

The design is recognisable through four devices. They are functional, not decoration.

### D1 — DotMatrix formations

lib/design/formations.ts defines the logo geometry and all shared formation states.

The base mark is a Manhattan diamond of radius 3 on a 12px-pitch grid:

- 25 dots;
- exact blue centre at (0, 0);
- red protection point at (2, -1);
- all other points low-opacity ink.

Formation governance applies to each visual composition:

1. Exactly one blue dot.
2. At most one red dot.
3. Red appears only with protection semantics.
4. Every other dot uses graphite/on-dark ink at low opacity.
5. Coordinates live in shared formation data, not local ad hoc SVG arrays.
6. Adjacent sections do not repeat the same formation as wallpaper.

components/ui/DotMatrix is the static, server-renderable renderer. Animated formation components consume the same data and preserve dot identity.

The six lifecycle states are:

| Step | Formation | Meaning |
|---:|---|---|
| 01 | Dispersed field | Assessment and experience |
| 02 | Ordered columns | Advice and emerging structure |
| 03 | Connected chain | Communications and integration |
| 04 | Perimeter | Protection; red enters |
| 05 | Dense block | Implemented system; red remains contained |
| 06 | Diamond | Training/support resolve into the brand mark |

The story’s indexed dots are the same physical dots through every morph. Mobile uses static snapshots of these exact states.

### D2 — SectionRule

Every top-level homepage section begins with components/ui/SectionRule:

- full-width top hairline;
- zero-padded index on the left;
- terse keyword on the right;
- Geist Mono label styling;
- optional blue accent;
- red only for protection semantics.

The rule behaves like the title block of a technical drawing and makes the one-page sequence legible.

### D3 — MonoLabel

components/ui/MonoLabel provides the technical voice for:

- eyebrows;
- short state labels;
- sequence counters;
- visual captions;
- concise metadata.

It is not a body-copy style and should not appear on every line of a section.

### D4 — Stat and oversized numerals

components/ui/Stat pairs a large factual value with a mono caption. Use one coherent stat group per viewport. Values must come from the approved content source; do not invent counters or animate them as a growth gimmick.

### One-accent rule

Each composition has one primary accent event. For a dot composition this is exactly one blue dot, plus at most one protection-semantic red dot. For typographic compositions, choose the one active label, line, or signal; do not distribute accent colour across unrelated elements.

## 6. Component vocabulary

| Component | Contract |
|---|---|
| Button | Primary, secondary, or ghost action; control radius; 2px max hover lift |
| Container | Canonical horizontal padding and max widths |
| Section | Canonical section mode and paper/soft/navy tone |
| SectionHeader | Label + title + optional body with canonical type scale |
| SectionRule | Indexed register line for top-level sections |
| MonoLabel | Geist Mono technical eyebrow |
| Stat | Oversized factual figure and mono caption |
| Surface | Flat card/inset/navy; raised only for overlays |
| DotMatrix | Static renderer for shared formations |
| HeroDotField | One-time logo-field assembly |
| ProtectionPerimeter | Protection section’s red formation |
| SystemsMatrix | Active system path paired with the accordion |
| DeliveryTimeline | Hairline methodology sequence |
| SystemsAccordion | Sole interactive control for solution disclosure |

Legacy surface names remain temporarily mapped to flat dossier surfaces. New work uses card, inset, navy, or raised and must not revive glass semantics.

## 7. Motion

lib/motion/presets.ts is the single source of truth for Framer Motion.

### Duration tiers

| Tier | Presets | Duration | Purpose |
|---|---|---:|---|
| Micro | micro, fast | 120ms, 180ms | Hover, focus, press, colour/border feedback |
| State | state, medium, expand | 240ms, 300ms, 320ms | Menu, accordion, form feedback, text swaps |
| Reveal | reveal, trace, entrance | 380ms, 500ms, 600ms | Once-only content entrance and line draw |
| Scroll-linked | scrollSpring | no duration | Smooth a 0–1 MotionValue |

The signature ease is [0.22, 1, 0.36, 1]. A symmetric [0.65, 0, 0.35, 1] ease is available only when an element moves and returns.

CSS exposes matching micro/fast/state/medium/expand tokens. --motion-slow remains at 650ms for CSS compatibility, but new Framer Motion work must use the 380–600ms reveal/trace/entrance tier from presets.ts.

### Springs

| Spring | Stiffness | Damping | Use |
|---|---:|---:|---|
| scrollSpring | 140 | 30 | Scroll-progress smoothing |
| formationSpring | 110 | 22 | Dots moving between formation positions |

### Allowed choreography

- Once-only reveal: opacity plus 10px translation.
- Strong rise: opacity plus 16px translation for a larger panel.
- State swap: opacity-only or a very small vertical offset.
- Hairline draw: scaleX from the left.
- Dot assembly/morph: transform/position MotionValues derived from shared formations.
- Hover lift: maximum 2px.
- Stagger: 0.06s for small items, 0.09s for cards, with total group delay no greater than 0.36s.

### Exactly two scroll-scrubbed systems

1. Hero exit — HeroSection maps hero scroll progress to the dot field’s subtle -16px transform.
2. Formation Machine — DesktopScrollStory smooths runway progress and drives StoryProgress plus StickyStoryStage’s continuous formation morph.

Do not add a third scrub system without explicit approval. The story progress rail and formation stage are two consumers of the same story MotionValue, not separate systems.

### Motion prohibitions

- Animate only transform and opacity. Use scaleX/scaleY for lines.
- Never animate width, height, top, left, filter, blur, font size, or letter spacing.
- No loops, bouncing, particles, radar sweeps, breathing nodes, marching dashes, scroll-scaled text, or parallax copy.
- Do not apply the same generic fade-in to every section. Choreography should express hierarchy through rules, formations, groups, and state changes.
- Reveals fire once.
- Reduced-motion support is mandatory.

### Reduced motion

- CSS collapses animation and transition duration and disables smooth scrolling.
- Framer components branch to the final static state.
- ScrollStory selects the linear sequence instead of the sticky runway.
- Dot formations render with the static DotMatrix renderer.
- Programmatic anchor and story navigation use auto, not smooth, behavior.

## 8. Homepage register

The order is fixed in app/(marketing)/[locale]/page.tsx:

| Register | Anchor | Section | Visual role |
|---:|---|---|---|
| Hero | #hero | HeroSection | Display statement + logo-field assembly |
| 01 | #experience | TrustSection | Credentials and large figures on paper-soft |
| 02 | #story | ScrollStory | Formation Machine / linear sequence |
| 03 | #capabilities | CapabilityOverview | Ruled service index |
| 04 | #systems | SystemsSection | Accordion plus integration matrix |
| 05 | #protection | ProtectionSection | Selective navy band and red perimeter |
| 06 | #delivery | DeliverySection | Hairline methodology sequence |
| 07 | #contact | ContactSection | Inquiry details and validated form |

The protection band is the page’s dominant red moment. The rest of the page remains paper-led.

## 9. Interaction and accessibility

- All touch targets are at least 44×44px.
- Interactive state cannot rely on colour alone.
- Disclosure controls use native buttons or details, aria-expanded, aria-controls, and labelled regions.
- Focus uses the single global focus-visible rule.
- Decorative SVG formations are aria-hidden and non-focusable.
- Text and rules must retain sufficient contrast on paper and navy.
- There is no horizontal overflow at supported widths.
- The sticky Formation Machine is wide-desktop only; tablet/mobile get a readable linear sequence.
- Reduced-motion behavior is part of acceptance, not an optional polish pass.

## 10. Content and i18n

- Locales: en and de.
- Marketing strings live in lib/content/site.ts and come through getSiteContent(locale).
- CONTENT_BLUEPRINT.md controls factual claims and approved EN/DE wording.
- Components do not hardcode marketing copy.
- Update both languages together.
- Keep anchor names locale-agnostic.
- Do not change legal copy without counsel approval.

## 11. Prohibited patterns

### Visual

- Glassmorphism, translucent glass cards, blur-backed panels.
- Repeating technical-grid or graph-paper overlays.
- Gradient blobs, gradient washes, glow fields, neon, cyberpunk.
- Bento or mosaic layouts.
- Icon tiles and generic feature-card grids.
- Large decorative shadows.
- Large friendly radii.
- Stock cyber-security, hacker, surveillance, globe, tunnel, or smart-city imagery.
- Decorative ornaments without semantic meaning.
- New colours or local raw hex/rgba values.
- New fonts; Geist + Geist Mono are fixed.

### Motion

- Uniform fade-ins copied across the entire page.
- More than two scroll-scrubbed systems.
- Perpetual or looping decorative animation.
- Layout/filter/blur/type animation.
- Text parallax or scroll scaling.
- Motion without a reduced-motion final state.

### Engineering

- New code using transitional aliases or deprecated primitive props.
- Local tokens that duplicate the canonical system.
- Component-specific focus outlines that conflict with the global rule.
- CI workflow or quality-gate changes.
- Dependency changes without explicit justification.

## 12. Maintenance checks

Before merging a visual or motion change:

1. Compare app/globals.css with lib/design/tokens.ts.
2. Search for raw colours, arbitrary radii, shadows, and legacy aliases.
3. Verify dot formations obey the one-blue/at-most-one-red law.
4. Verify motion imports presets from lib/motion/presets.ts.
5. Confirm no third useScroll system was introduced.
6. Check reduced motion.
7. Check 1280px+ sticky story and 375px linear story.
8. Run npm run lint, npm run typecheck, and npm run build.

Token changes update both token files and this document. Formation or motion-law changes update their source modules and this document in the same change.
