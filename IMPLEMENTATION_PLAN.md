# Elaman GmbH — Implementation Plan

Step-by-step build plan for the premium institutional Elaman website. Aligned with `DESIGN_DIRECTION.md`, `DESIGN_SYSTEM.md`, and `CONTENT_BLUEPRINT.md`.

**Rule:** One step per PR where possible. No step should redesign the entire page. Do not start a step until the prior step's exit criteria are met (unless explicitly parallel-safe).

---

## Goals

1. Switch/Stitch visual direction: white-first, selective dark contrast, technical diagrams, screen-composed scroll
2. Source-aligned bilingual content from `CONTENT_BLUEPRINT.md`
3. Sticky lifecycle, expandable solutions, subtle motion
4. Production-ready contact API, SEO, Vercel deployment

## Non-goals

- CMS, blog, auth, pricing
- User-toggle dark mode
- Stock imagery or Bento layouts
- Broad single-PR redesign

---

## Current baseline

| Item    | Location                                                                |
| ------- | ----------------------------------------------------------------------- |
| Stack   | Next.js 16, React 19, Tailwind 4, Framer Motion                         |
| Tokens  | `lib/design/tokens.ts`, `app/globals.css` (partial foundation in place) |
| Content | `lib/content/site.ts` (draft; drift from blueprint)                     |
| Page    | `app/(marketing)/[locale]/page.tsx` — 8 sections                        |

### Component ↔ step map

| Step | Blueprint section | Component            | Anchor          |
| ---- | ----------------- | -------------------- | --------------- |
| 4    | Hero              | `HeroSection`        | `#hero`         |
| 5    | Credentials       | `TrustSection`       | `#experience`   |
| 6    | Services          | `CapabilityOverview` | `#capabilities` |
| 7    | Approach          | `ScrollStory`        | `#story`        |
| 8    | Solutions         | `SystemsSection`     | `#systems`      |
| 9    | Protection        | `ProtectionSection`  | `#protection`   |
| 10   | Methodology       | `DeliverySection`    | `#delivery`     |
| 11   | Contact           | `ContactSection`     | `#contact`      |

---

## Phase 0 — Documentation ✓

**Status:** Complete (ongoing maintenance)

| File                     | Purpose                       |
| ------------------------ | ----------------------------- |
| `DESIGN_DIRECTION.md`    | Approved Switch/Stitch vision |
| `DESIGN_SYSTEM.md`       | Tokens, components, rules     |
| `CONTENT_BLUEPRINT.md`   | Source-aligned copy EN/DE     |
| `IMPLEMENTATION_PLAN.md` | This file                     |
| `AGENTS.md`              | Agent/contributor rules       |

**Exit:** All agents read direction + blueprint before UI work.

---

## Step 1 — Tokens

**Scope:** Complete design token foundation in CSS and TypeScript.

**Status:** Complete (2026-06-15)

**Tasks:**

- [x] Sync `lib/design/tokens.ts` and `app/globals.css` (containers, section modes, surfaces, colors, motion)
- [x] Add dark contrast tokens: `--surface-dark-panel`, `--color-on-dark`, `--border-dark-panel`
- [x] Add utility classes: `surface-card`, `surface-panel`, `surface-glass`, `surface-dark-panel`
- [x] Add section utilities: `screen-section`, `screen-lite-section`
- [x] Grep audit: no orphan hex in `components/` for touched token names
- [x] Update `DESIGN_SYSTEM.md` if token names change

**Files:** `lib/design/tokens.ts`, `app/globals.css`

**Exit:** `npm run build` passes; tokens documented in design system.

**Risk:** Low

---

## Step 2 — Layout primitives

**Scope:** `Section`, `Container`, `Surface`, `Button` conform to canonical modes and surfaces.

**Status:** Complete (2026-06-15)

**Tasks:**

- [x] `Section`: modes `hero-screen`, `screen`, `screen-lite`, `content-band`, `legal-page` + legacy aliases
- [x] `Container`: sizes `page`, `content`, `copy`, `narrow`, `legal`
- [x] `Surface`: `card`, `panel`, `glass`, `darkPanel` (+ legacy compat)
- [x] `Button`: semantic color tokens; motion tokens
- [x] No section file changes in this step

**Files:** `components/ui/Section.tsx`, `Container.tsx`, `Surface.tsx`, `Button.tsx`

**Exit:** Primitives use tokens only; Storybook-style manual check not required; build + lint pass.

**Risk:** Low — minimal visual delta if tokens match existing values

---

## Step 3 — i18n / content structure

**Scope:** Content architecture and blueprint import — not full visual redesign.

**Status:** Complete (2026-06-15; locale-prefixed legal routes deferred to Step 11)

**Tasks:**

- [x] Apply `CONTENT_BLUEPRINT.md` navigation labels (Experience, Approach, Services, Solutions, Contact)
- [x] Update `siteContent.en` and `siteContent.de` together: hero, trust, nav, metadata
- [x] Remove drift: `B2G`, `360°`, “secure channel”, “discreet inquiry”, surveillance-heavy hero
- [x] Confirm no `types/site.ts` extension is needed until Step 8 accordion/tab detail fields
- [x] Plan legal locale routes; keep interim legal hrefs until Step 11 locale route work
- [x] Verify `hreflang` and sitemap entries for `/en`, `/de`

**Files:** `lib/content/site.ts`, `types/site.ts`, `lib/i18n.ts`, `app/sitemap.ts`

**Exit:** Both locales render updated strings; no component layout changes required yet.

**Risk:** Low–medium (legal copy needs counsel for EN privacy)

---

## Step 4 — Hero

**Scope:** `HeroSection` only — white-first, technical diagram, blueprint copy.

**Status:** Complete (2026-06-15)

**Tasks:**

- [x] `variant="hero-screen"`; white / plain tone
- [x] Copy from blueprint §4 (tagline, intro, body, CTAs)
- [x] `HeroSignalVisual`: diagram-led; no stock; minimal surveillance wording in visual labels
- [x] Stats strip: factual labels (20+ years, turnkey, training) — not `B2G`/`360°`
- [x] Primary CTA → `#contact`; secondary → `#capabilities`

**Files:** `components/sections/HeroSection.tsx`, `components/ui/HeroSignalVisual.tsx`, `lib/content/site.ts`

**Exit:** Hero matches direction screenshots at desktop + mobile; blueprint copy live.

**Risk:** Low

---

## Step 5 — Credentials

**Scope:** `TrustSection` (`#experience`) — experience and public-sector context.

**Tasks:**

- [ ] `content-band` + soft tone
- [ ] Blueprint §5 copy: metrics, pillars, body
- [ ] Client pillars list (authorities, CSPs) — no logo wall
- [ ] Optional: subtle metric cards on `surface-card`

**Files:** `components/sections/TrustSection.tsx`, `lib/content/site.ts`

**Exit:** Section reads institutional; claims match blueprint avoid-list.

**Risk:** Low

---

## Step 6 — Services (capabilities)

**Scope:** `CapabilityOverview` (`#capabilities`) — Advice, Surveillance, Protection, Training & Support.

**Tasks:**

- [ ] Blueprint §6 four cards
- [ ] Grid layout — **not** Bento; equal-weight columns or single column mobile
- [ ] Optional: expandable card detail (prepare markup; full expand pattern may ship in step 8)
- [ ] `SectionHeader` + `Container size="content"`

**Files:** `components/sections/CapabilityOverview.tsx`, `lib/content/site.ts`

**Exit:** Four service pillars match original Elaman structure.

**Risk:** Low

---

## Step 7 — Sticky lifecycle

**Scope:** `ScrollStory` (`#story`) — pinned approach narrative.

**Tasks:**

- [ ] Blueprint §8 six steps
- [x] Wide desktop ≥1280px: `StickyStoryStage` + progress; `screen` mode
- [x] Tablet/mobile: responsive `MobileStorySequence` — no pin
- [x] `useReducedMotionPreference` gates motion and removes the sticky runway
- [ ] Diagrams in stage: `SystemMap`, `ProcessRail` — technical only
- [ ] Nav label: Approach / Vorgehen

**Files:** `components/sections/ScrollStory.tsx`, `DesktopScrollStory.tsx`, `MobileStorySequence.tsx`, `components/motion/*`, `lib/content/site.ts`

**Exit:** Sticky scroll works ≥1280px; tablet/mobile and reduced motion use a compact unpinned sequence; blueprint steps live.

**Risk:** Medium — scroll interaction QA

---

## Step 8 — Solutions accordion / tabs

**Scope:** `SystemsSection` (`#systems`) — expandable solution domains.

**Tasks:**

- [ ] Blueprint §7 eight solution items + descriptions
- [ ] Implement **one** pattern: accordion (preferred) or tabs — keyboard accessible
- [ ] `aria-expanded` / tab roles; `--motion-medium` expand
- [ ] White `content-band`; no Bento mosaic
- [ ] Single-open accordion default

**Files:** `components/sections/SystemsSection.tsx`, `types/site.ts`, `lib/content/site.ts`, possibly `components/ui/ExpandableCard.tsx` if reused later

**Exit:** All eight solutions accessible; expand/collapse smooth; reduced motion respected.

**Risk:** Low–medium

---

## Step 9 — Dark section (protection)

**Scope:** `ProtectionSection` (`#protection`) — deep navy contrast band.

**Tasks:**

- [ ] `surface-dark-panel` section tone; light text tokens
- [ ] Blueprint §9 copy — institutional, authorised-applications wording
- [ ] Four countermeasure cards on dark or nested `surface-card` insets
- [ ] Blue/red accents as thin rules and diagram nodes only
- [ ] **Not** cyberpunk / tactical marketing tone

**Files:** `components/sections/ProtectionSection.tsx`, `app/globals.css` (if dark tokens missing), `lib/content/site.ts`

**Exit:** Clear contrast vs adjacent light sections; readable WCAG contrast on text.

**Risk:** Low–medium — contrast audit

---

## Step 10 — Methodology (delivery)

**Scope:** `DeliverySection` (`#delivery`) — turnkey process rail.

**Tasks:**

- [ ] Blueprint §9 delivery steps (analyse → design → integrate → train → support)
- [ ] `ProcessRail` or step grid; soft light band
- [ ] Copy: turnkey, state-of-the-art (once), training, after-sales

**Files:** `components/sections/DeliverySection.tsx`, `components/ui/ProcessRail.tsx`, `lib/content/site.ts`

**Exit:** Five steps visible; aligns with story step 5–6 narrative.

**Risk:** Low

---

## Step 11 — Contact, footer, legal

**Scope:** Contact form, footer, bilingual legal routes.

**Tasks:**

- [ ] `ContactSection`: blueprint §10 — factual Munich details; no “secure portal”
- [ ] `ContactForm`: inquiry wording; honeypot preserved
- [ ] `Footer`: blueprint §11 legal labels; accent divider
- [ ] Legal routes EN/DE + redirects from `/imprint`, `/private-policy`
- [ ] `lib/content/legal.ts` locale split; counsel for EN privacy
- [ ] Sitemap + `hreflang` for all legal URLs

**Files:** `components/sections/ContactSection.tsx`, `ContactForm.tsx`, `components/layout/Footer.tsx`, `app/(legal)/**`, `lib/content/legal.ts`, `app/sitemap.ts`

**Exit:** Form works; legal pages both locales; footer links correct per locale.

**Risk:** Medium — legal review

---

## Step 12 — Motion system

**Scope:** Cross-cutting motion polish after sections exist.

**Status:** Complete (2026-06-15; advanced by explicit user request for full animation redesign)

**Tasks:**

- [x] Audit `MotionReveal` on section wrappers in `page.tsx`
- [x] Standardize hover transitions to token durations
- [x] Sticky story crossfade tune (`--motion-slow`)
- [x] Diagram animations: no continuous decorative motion; state changes only
- [x] Global `prefers-reduced-motion` regression pass
- [x] Remove any parallax or scale-on-scroll if introduced

**Files:** `components/motion/*`, `components/ui/HeroSignalVisual.tsx`, `components/sections/DesktopScrollStory.tsx`, `app/globals.css`

**Exit:** Motion feels subtle and consistent; reduced motion hides no essential content.

**Risk:** Low

---

## Step 13 — Responsive polish

**Scope:** Final breakpoint and device pass.

**Tasks:**

- [ ] Test `<640`, `640–1023`, `≥1024`, `≥1440` on `/en` and `/de`
- [ ] Hero, sticky story, accordion, dark section, contact form on iOS Safari
- [ ] No horizontal overflow on legal pages
- [ ] Touch targets, mobile menu, anchor scroll with header offset
- [ ] Lighthouse: a11y ≥ 95, performance ≥ 90 on marketing page
- [ ] Open Graph both locales

**Files:** Section components as needed for bugfixes only

**Exit:** README post-deployment checklist satisfied; stakeholder sign-off.

**Risk:** Low — fix-only PRs

---

## PR strategy

| PR    | Step | Scope                    |
| ----- | ---- | ------------------------ |
| PR-0  | 0    | Docs only                |
| PR-1  | 1    | Tokens                   |
| PR-2  | 2    | Layout primitives        |
| PR-3  | 3    | i18n / content structure |
| PR-4  | 4    | Hero                     |
| PR-5  | 5    | Credentials              |
| PR-6  | 6    | Services                 |
| PR-7  | 7    | Sticky lifecycle         |
| PR-8  | 8    | Solutions accordion      |
| PR-9  | 9    | Dark protection section  |
| PR-10 | 10   | Methodology              |
| PR-11 | 11   | Contact / footer / legal |
| PR-12 | 12   | Motion system            |
| PR-13 | 13   | Responsive polish        |

Each visual PR: reference `DESIGN_DIRECTION.md`; include before/after screenshots; do not mix unrelated steps.

---

## Known gaps (track here)

| Area                       | Current                      | Target step |
| -------------------------- | ---------------------------- | ----------- |
| Token / dark panel         | Complete                     | Step 1      |
| Content drift vs blueprint | `site.ts` has SaaS-isms      | Step 3      |
| Legal i18n                 | EN imprint / DE privacy only | Step 11     |
| Solutions expand           | Static cards                 | Step 8      |
| Protection dark band       | Light section today          | Step 9      |
| Nav labels                 | Story, Capabilities          | Step 3      |

---

## Decision log

| Date       | Decision                              | Rationale                       |
| ---------- | ------------------------------------- | ------------------------------- |
| 2026-06-15 | White-first + selective dark sections | Switch/Stitch approved          |
| 2026-06-15 | Technical diagrams only               | Institutional positioning       |
| 2026-06-15 | 13 incremental steps                  | Small reviewable PRs            |
| 2026-06-15 | Content from `CONTENT_BLUEPRINT.md`   | Source-aligned, legally careful |
| 2026-06-15 | Credentials = TrustSection            | Blueprint naming                |
| 2026-06-15 | Methodology = DeliverySection         | Turnkey process rail            |

---

## Open questions

Record answers here when resolved:

1. **EN privacy policy:** translate DE or counsel-drafted EN?
2. **Legal slugs:** `/de/impressum` confirmed?
3. **Analytics:** any tracking requiring privacy update?
4. **Certifications:** approved for credentials section?
5. **Solutions pattern:** accordion vs tabs — default accordion unless stakeholder prefers tabs?
