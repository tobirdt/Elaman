# Elaman GmbH — Design System

Technical specification for the Elaman corporate website. Governs tokens, layout, motion, and components.

**Read first:** `DESIGN_DIRECTION.md` (approved vision) · `CONTENT_BLUEPRINT.md` (copy) · `IMPLEMENTATION_PLAN.md` (build order)

Token implementation: `lib/design/tokens.ts` and `app/globals.css`.

---

## 1. Visual direction

### Positioning

Elaman GmbH is a **premium, minimal, institutional** communications and security engineering partner for public authorities and security-sector clients — not a SaaS product, not a cyberpunk vendor, not a startup template.

### Design personality

| Attribute        | Expression                                                                |
| ---------------- | ------------------------------------------------------------------------- |
| Government-grade | Restrained palette, formal typography, sourced claims only                |
| Calm             | Large whitespace, slow motion, low visual noise                           |
| Precise          | Grid-aligned layout, consistent spacing, technical labels                 |
| Technical        | Diagrams, signal lines, system maps, and rare approved contextual imagery |
| Trustworthy      | Real company data, legal clarity, blueprint-aligned copy                  |
| Minimal          | One idea per screen; content leads                                        |
| Premium          | Subtle depth, refined surfaces, intentional contrast                      |

### White-first with contrast sections

- **Default canvas:** white (`#ffffff`) with porcelain (`#f7f8fa`) and mist (`#eef1f5`) bands.
- **Contrast sections:** black / deep navy (`--surface-dark-panel`, graphite `#16181d` or deep navy `#1a2332`) for designated blocks — primarily **protection / countermeasures**. Light text on dark (`--color-on-dark`).
- Contrast sections are **intentional bands**, not a global dark theme. No user-toggle dark mode.
- Background atmosphere on light sections: very low-opacity radial washes (blue ~4–8%, red ~4%) at edges only.
- Brand marker: **Elaman blue–red split line** — thin, precise, logo-derived.

### Imagery

- **Use:** `HeroSignalVisual`, `SystemMap`, `ProcessRail`, `TechnicalMark`, SVG signal geometry, the Elaman point mark, the approved Munich office photograph, and a restrained bridge visual where it supports the brand line.
- **Use sparingly:** explicitly approved licensed technical imagery only when it provides factual context; photographs remain static after their entrance reveal.
- **Do not use:** eyes, animals, tunnel imagery, generic smart-city/globe/network stock, AI blobs, 3D characters, isometric SaaS art, bento mosaic layouts.

### Anti-patterns

- Generic SaaS startup landing page
- Playful Bento / uneven card mosaics
- AI gradient blobs and mesh backgrounds
- Neon / cyberpunk (matrix, glitch, skull icons)
- Fake claims (`100% sovereignty`, `secure portal` without a portal)
- Surveillance-heavy hero copy (reserve for services/solutions sections)

---

## 2. Layout rules

### Page architecture

- Single-page scroll at `/[locale]` (`en`, `de`).
- Sections composed as **screens** using `Section` modes.
- Sticky-scroll lifecycle (`ScrollStory`) — desktop pinned, mobile sequential.
- Legal pages on separate routes.

### Container widths

Use `Container` `size` prop — no ad-hoc `max-w-*` in sections.

| Size      | Token                 | Value |
| --------- | --------------------- | ----- |
| `page`    | `--container-page`    | 80rem |
| `content` | `--container-content` | 64rem |
| `copy`    | `--container-copy`    | 42rem |
| `narrow`  | `--container-narrow`  | 30rem |
| `legal`   | `--container-legal`   | 56rem |

Horizontal padding: `--page-x` = `clamp(1.25rem, 4vw, 4rem)`.

### Grid

- Single left alignment spine per container.
- Copy left, diagram/visual right on desktop; stack copy-first on mobile.
- Internal gap: `--section-gap` = `clamp(2rem, 4vw, 3.5rem)`.
- Header: `--header-h` (4rem mobile, 5rem desktop). `scroll-padding-top` accounts for header.

### Section composition

```
[SectionLabel]   eyebrow
[Headline]       h1 / h2
[Lead]           optional
[Body / Grid]    cards, diagram, accordion
[Action]         optional CTA
```

Primitives: `Section`, `SectionHeader`, `SectionLabel`, `Container`, `Surface`, `Button`.

---

## 3. Section modes and rhythm

### Canonical modes (`Section` variant)

| Mode           | Use                                              |
| -------------- | ------------------------------------------------ |
| `hero-screen`  | Above-the-fold; min-height viewport minus header |
| `screen`       | Full-screen pinned moments (sticky lifecycle)    |
| `screen-lite`  | Near-viewport emphasis without full pin          |
| `content-band` | Default content sections (services, methodology) |
| `legal-page`   | Legal headers and dense document layout          |

Legacy aliases (resolved automatically): `hero` → `hero-screen`, `band` → `content-band`, `compact` → `legal-page`.

### Tone alternation (target)

| Section          | Mode                            | Tone                            |
| ---------------- | ------------------------------- | ------------------------------- |
| Hero             | `hero-screen`                   | `plain` / white                 |
| Credentials      | `content-band`                  | `soft`                          |
| Sticky lifecycle | `screen`                        | glass stage on light            |
| Services         | `content-band`                  | `soft` or white                 |
| Solutions        | `content-band`                  | `white`                         |
| Protection       | `screen-lite` or `content-band` | **dark** (`surface-dark-panel`) |
| Methodology      | `content-band`                  | `soft`                          |
| Contact          | `content-band`                  | `white`                         |

Avoid two identical adjacent bands without a label, divider, or tone shift.

### Screen classes

- `.screen-section` — full viewport minus header, vertically centered.
- `.screen-lite-section` — reduced min-height for lighter screen moments.

---

## 4. Typography scale

Font: **Jost** through `next/font/google` and `--font-elaman-sans`, with system fallbacks. Jost retains the controlled, geometric Futura-derived feeling while being supplied under an OFL licence and self-hosted in the Next.js output. The current Wix site uses Futura LT Book/Light for its key typography, but its hosted font files must not be reused without a licence. `text-rendering: geometricPrecision`.

| Role    | Token            | Size                    | Weight  | Tracking | Leading |
| ------- | ---------------- | ----------------------- | ------- | -------- | ------- |
| Display | `--type-display` | clamp(2.75rem → 5.9rem) | 600–700 | -0.04em  | 0.94    |
| H1      | `--type-h1`      | clamp(2.6rem → 5.4rem)  | 600–700 | -0.04em  | 1.04    |
| H2      | `--type-h2`      | clamp(2.1rem → 3.75rem) | 600     | -0.04em  | 1.04    |
| H3      | `--type-h3`      | clamp(1.35rem → 1.9rem) | 600     | -0.04em  | 1.04    |
| Lead    | `--type-lead`    | clamp(1rem → 1.25rem)   | 400     | normal   | 1.65    |
| Body    | `--type-body`    | 1rem                    | 400     | normal   | 1.65    |
| Small   | `--type-small`   | 0.875rem                | 400–500 | normal   | 1.55    |
| Micro   | `--type-micro`   | 0.75rem                 | 500     | 0.16em   | 1.4     |

Rules: one display/h1 per viewport; body max-width `copy`; `text-balance` on headlines; EN/DE share scale.

**Dark sections:** headings `--color-on-dark`; body `--color-on-dark-muted`.

---

## 5. Color roles

### Light surfaces

| Role           | Token                             | Value     |
| -------------- | --------------------------------- | --------- |
| Canvas         | `--surface-white`                 | `#ffffff` |
| Soft band      | `--surface-soft`                  | `#f7f8fa` |
| Muted fill     | `--color-mist`                    | `#eef1f5` |
| Line           | `--color-line`                    | `#dfe4ea` |
| Text primary   | `--color-text-primary` / graphite | `#16181d` |
| Text secondary | `--color-text-secondary`          | `#555d6b` |
| Text tertiary  | `--color-text-tertiary`           | `#667286` |

### Brand accents (logo-derived)

| Role        | Token                        | Value     | Usage                                      |
| ----------- | ---------------------------- | --------- | ------------------------------------------ |
| Elaman blue | `--color-brand-blue`         | `#244074` | Focus, hover, diagram nodes, labels        |
| Elaman red  | `--color-brand-red`          | `#d83034` | Accent nodes, split line — ≤5% of viewport |
| Red on navy | `--color-elaman-red-on-dark` | `#ff6b6f` | Accessible small red labels on navy only   |

### Dark contrast surfaces

| Role          | Token                               | Usage                         |
| ------------- | ----------------------------------- | ----------------------------- |
| Dark panel    | `--surface-dark-panel` (`#172033`)  | Protection section background |
| On-dark text  | `--color-on-dark` (`#f7f8fa`)       | Headlines on dark             |
| On-dark muted | `--color-on-dark-muted` (`#c7d0dc`) | Body on dark                  |
| Dark border   | `--border-dark-panel`               | Subtle edge on dark bands     |

### Semantic

- Focus: brand blue 48% border, 10% ring
- Selection: `rgba(36, 64, 116, 0.16)`
- Error: brand red — forms only

No purple, cyan, or neon. No unsourced sovereignty or security superlatives in UI chrome.

### Point-mark system

- The header displays the Elaman point mark only; its accessible label remains “Elaman home”.
- The full wordmark is reserved for the hero and footer.
- The blue and red points indicate a deliberate state, layer, or focus; grey points form the quiet structural field.
- Reuse the point geometry in a limited number of places: navigation state, story progress, system map, and a single low-contrast background field. Never turn it into a repeating wallpaper.

---

## 6. Surfaces and cards

### Canonical surface levels

| Level  | Token / class                                   | Use                          |
| ------ | ----------------------------------------------- | ---------------------------- |
| Card   | `surface-card` / `Surface variant="card"`       | Service cards, metrics       |
| Raised | `surface-raised` / `Surface variant="raised"`   | Overlaying UI such as menus  |
| Inset  | `Surface variant="inset"`                       | Recessed technical groupings |
| Navy   | `surface-dark-panel` / `Surface variant="navy"` | Protection contrast sections |

Legacy: `panel`, `glass`, `strongGlass`, `darkPanel` — migrate toward canonical levels when touching components.

### Card rules

- One title, one description, optional eyebrow per card.
- Padding `p-5`–`p-9`; radius `--radius-card` (0.125rem).
- Hover: border shift or subtle translate — no dramatic shadow growth.
- **Expandable detail:** inline accordion/tab; `aria-expanded`; no modals.

### Glass

Permitted: header, sticky stage, form fields. Do not glass-wrap entire light sections.

Glass surfaces must provide a solid-fill fallback for reduced-transparency environments.

---

## 7. Buttons and interactions

### Button variants

| Variant     | Use                                     |
| ----------- | --------------------------------------- |
| `primary`   | Graphite → blue hover; one per viewport |
| `secondary` | Glass border; header/secondary CTAs     |
| `ghost`     | Tertiary / inline                       |

Shape: `control` default; `pill` for footer legal chips only.

### Interaction

- Hover: `-translate-y-0.5` on primary/secondary; **no scale**
- Duration: `--motion-fast` (180ms); easing `--motion-ease`
- Focus-visible: 2px outline, 4px offset, brand blue

### Accordion / tabs (solutions)

- Single-open accordion or horizontal tabs — one pattern per section
- Keyboard: Enter/Space toggle; arrow keys for tabs
- Motion: `--motion-medium`; collapse under `prefers-reduced-motion`
- Content from `CONTENT_BLUEPRINT.md` §7

### Forms

`.form-field` — glass bg, soft border, blue focus. No “secure portal” messaging.

---

## 8. Motion

| Token             | Value                            | Use                            |
| ----------------- | -------------------------------- | ------------------------------ |
| `--motion-fast`   | 180ms                            | Hover, focus, toggles          |
| `--motion-medium` | 300ms                            | Reveals and state transitions  |
| `--motion-expand` | 320ms                            | Accordion expansion            |
| `--motion-slow`   | 650ms                            | Hero mark entrance only        |
| `--motion-ease`   | `cubic-bezier(0.22, 1, 0.36, 1)` | All transitions                |

**Allowed:** `Reveal`, `LineDraw`, sticky story progress, static logo-derived matrix nodes, and static bridge traces.

**Photographic motion:** a photograph may appear with its containing section’s one-time reveal only. No image transform, parallax, or loop.

Diagram visuals follow the Elaman mark: sparse matrix nodes, calm blue bridge paths, and selective red countermeasure accents. They should be still by default; motion is reserved for state changes such as scroll progress, accordion open/close, and focus feedback. Avoid node breathing, marching dash lines, radar sweeps, crosshair scans, particles, and spectacle motion.

**Prohibited:** parallax, particles, bounce, scroll-scale headlines, autoplay carousel, Lottie spectacle.

**Reduced motion:** `useReducedMotionPreference` + global CSS; sticky story unpins or shows static steps.

---

## 9. Responsive

| Breakpoint       | Behavior                                            |
| ---------------- | --------------------------------------------------- |
| `< 640px`        | Tighter section padding; single column; mobile menu |
| `640px – 1279px` | Two-column tablet sequence; unpinned story          |
| `≥ 1280px`       | Sticky lifecycle; full three-column grid            |

Touch targets ≥ 44×44px. No horizontal scroll. Typography uses `clamp()` — avoid breakpoint font overrides.

---

## 10. Bilingual / i18n

- Locales: `de` (primary), `en` — `/de`, `/en`
- Copy: `lib/content/site.ts` via `getSiteContent(locale)`
- Blueprint: `CONTENT_BLUEPRINT.md` — implement EN + DE together
- Anchors locale-agnostic: `#experience`, `#story`, `#capabilities`, `#systems`, `#protection`, `#delivery`, `#contact`
- `sectionPath(locale, href)` for hash links
- Legal: locale-prefixed routes (see §11)

---

## 11. Legal pages

| Page    | DE                   | EN             |
| ------- | -------------------- | -------------- |
| Imprint | Impressum            | Imprint        |
| Privacy | Datenschutzerklärung | Privacy Policy |

Target routes: `/en/imprint`, `/de/impressum`, `/en/privacy`, `/de/datenschutz` (redirect legacy paths).

Content: `lib/content/legal.ts`. Layout: `LegalDocument` + `Container size="legal"`. Counsel review before privacy changes.

---

## 12. Prohibited patterns

### Visual

- Bento / mosaic marketing grids
- AI blobs, mesh gradients, neon cyberpunk
- Stock photos and decorative illustration
- User-toggle dark mode
- Certification badges without approval
- Marketing pop-ups, chat widgets, countdown timers

### Copy (see also `CONTENT_BLUEPRINT.md` §12)

- `100% sovereignty`, `secure portal` (no portal), surveillance-first hero
- `B2G`, `360°`, `unlock`, `AI-powered`
- Invented stats, unnamed client logos
- `Secure channel` for standard email form

### Technical

- Hardcoded locale strings in components
- Orphan hex outside tokens
- Client-side locale override of URL
- `!important` layout hacks

---

## Token reference

| File                   | Role                                        |
| ---------------------- | ------------------------------------------- |
| `lib/design/tokens.ts` | TypeScript token export, section mode types |
| `app/globals.css`      | CSS custom properties, utility classes      |

Update **both** when tokens change.

## Component map

| Concern    | Component                                                                     |
| ---------- | ----------------------------------------------------------------------------- |
| Sections   | `components/sections/*`                                                       |
| Layout     | `Header`, `Footer`, `Container`                                               |
| Primitives | `Button`, `Section`, `Surface`, `GlassPanel`, `SectionHeader`, `SectionLabel` |
| Motion     | `Reveal`, `LineDraw`, `ScrollStory`, `StickyStoryStage`, `AnchorScrollManager` |
| Diagrams   | `SystemMap`, `ProcessRail`, `TechnicalMark`, `HeroSignalVisual`               |

Compose from primitives before adding new abstractions.

## Section ↔ blueprint map

| Blueprint   | Component            | Content key    |
| ----------- | -------------------- | -------------- |
| Hero        | `HeroSection`        | `hero`         |
| Credentials | `TrustSection`       | `trust`        |
| Approach    | `ScrollStory`        | `story`        |
| Services    | `CapabilityOverview` | `capabilities` |
| Solutions   | `SystemsSection`     | `systems`      |
| Protection  | `ProtectionSection`  | `protection`   |
| Methodology | `DeliverySection`    | `delivery`     |
| Contact     | `ContactSection`     | `contact`      |
