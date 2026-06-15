# Agent and contributor guide — Elaman website

Instructions for AI agents and developers working on the Elaman GmbH website.

## Project summary

Production Next.js 16 site for **Elaman GmbH** — premium, minimal, institutional communications and security engineering for public authorities, governmental organisations, security-sector clients, and communication service providers.

**Experience target:** white-first single-page scroll, selective deep navy contrast sections, technical diagrams, sticky lifecycle, expandable solutions — per approved Switch/Stitch direction.

## Required reading (in order)

1. **`DESIGN_DIRECTION.md`** — approved visual and content vision
2. **`CONTENT_BLUEPRINT.md`** — source-aligned copy EN/DE (authoritative for strings)
3. **`DESIGN_SYSTEM.md`** — tokens, components, motion, prohibited patterns
4. **`IMPLEMENTATION_PLAN.md`** — current build step and scope
5. **`README.md`** — dev setup, env vars, deployment

## Hard constraints

### Do

- Follow the **active implementation step** in `IMPLEMENTATION_PLAN.md` — one step per PR
- Use copy from `CONTENT_BLUEPRINT.md` when touching `lib/content/site.ts`
- Use tokens from `lib/design/tokens.ts` and `app/globals.css`
- Compose UI from `components/ui/` and `components/sections/`
- Use technical diagrams (`HeroSignalVisual`, `SystemMap`, `ProcessRail`) — never stock images
- Respect `prefers-reduced-motion`
- Update EN and DE content together
- Run `npm run lint && npm run typecheck && npm run build` before claiming done

### Do not

- Redesign sections outside the active implementation step
- Introduce Bento layouts, AI blobs, neon/cyberpunk, or generic SaaS patterns
- Use unsourced claims: `100% sovereignty`, `secure portal` (no portal exists), invented stats
- Lead the hero with surveillance language — see blueprint §4
- Hardcode locale strings in components
- Add dependencies without justification
- Commit secrets or create git commits unless explicitly asked
- Paraphrase legal content without counsel approval

## Document roles

| File | When to use |
|------|-------------|
| `DESIGN_DIRECTION.md` | Why the site looks and feels this way |
| `CONTENT_BLUEPRINT.md` | What to write in each section |
| `DESIGN_SYSTEM.md` | How to implement tokens, spacing, motion |
| `IMPLEMENTATION_PLAN.md` | What to build now vs later |

Conflict resolution: **blueprint (facts) → direction (vision) → system (rules)**.

## Repository map

```
app/
  (marketing)/[locale]/     # Bilingual homepage
  (legal)/                  # Imprint, privacy
  api/contact/              # Resend handler
  globals.css               # CSS tokens

components/
  layout/                   # Header, Footer
  sections/                 # Hero, Trust, ScrollStory, etc.
  motion/                   # Reveals, sticky story
  ui/                       # Section, Container, Surface, Button

lib/
  content/site.ts           # Marketing copy
  content/legal.ts          # Legal blocks
  design/tokens.ts          # Design tokens
  i18n.ts                   # Locale helpers

CONTENT_BLUEPRINT.md        # Copy plan
DESIGN_DIRECTION.md         # Vision
DESIGN_SYSTEM.md            # Rules
IMPLEMENTATION_PLAN.md      # Build steps
```

## Implementation steps (summary)

| Step | Focus |
|------|--------|
| 1 | Tokens |
| 2 | Layout primitives |
| 3 | i18n / content structure |
| 4 | Hero |
| 5 | Credentials (`TrustSection`) |
| 6 | Services (`CapabilityOverview`) |
| 7 | Sticky lifecycle (`ScrollStory`) |
| 8 | Solutions accordion/tabs (`SystemsSection`) |
| 9 | Dark section (`ProtectionSection`) |
| 10 | Methodology (`DeliverySection`) |
| 11 | Contact / footer / legal |
| 12 | Motion system |
| 13 | Responsive polish |

Do not skip ahead without user approval.

## Design system quick reference

| Need | Use |
|------|-----|
| Section mode | `Section` variant: `hero-screen`, `screen`, `screen-lite`, `content-band`, `legal-page` |
| Width | `Container` size: `page`, `content`, `copy`, `narrow`, `legal` |
| Surfaces | `card`, `panel`, `glass`, `darkPanel` |
| Headings | `SectionHeader`, `SectionLabel` |
| Buttons | `primary`, `secondary`, `ghost` |
| Dark band | `surface-dark-panel` on protection section |
| Motion | `--motion-fast` 180ms · `--motion-medium` 300ms · `--motion-slow` 650ms |

## Section ↔ blueprint map

| Blueprint | Anchor | Component |
|-----------|--------|-----------|
| Hero | `#hero` | `HeroSection` |
| Credentials | `#experience` | `TrustSection` |
| Approach | `#story` | `ScrollStory` |
| Services | `#capabilities` | `CapabilityOverview` |
| Solutions | `#systems` | `SystemsSection` |
| Protection | `#protection` | `ProtectionSection` |
| Methodology | `#delivery` | `DeliverySection` |
| Contact | `#contact` | `ContactSection` |

Homepage order is fixed in `app/(marketing)/[locale]/page.tsx` unless explicitly approved.

## Navigation (target labels)

| EN | DE | Anchor |
|----|-----|--------|
| Experience | Erfahrung | `#experience` |
| Approach | Vorgehen | `#story` |
| Services | Leistungen | `#capabilities` |
| Solutions | Lösungen | `#systems` |
| Contact | Kontakt | `#contact` |

## i18n

- Locales: `en` (default), `de`
- `getSiteContent(locale)` for all marketing strings
- `sectionPath(locale, "#anchor")` for hash links
- Legal: locale-prefixed routes (Step 11)

## Contact form

- Honeypot and server validation must remain
- Copy: inquiry form — not “secure portal”
- Env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`

## Agent workflow

1. Read active step in `IMPLEMENTATION_PLAN.md`
2. Read relevant blueprint section in `CONTENT_BLUEPRINT.md`
3. Check `DESIGN_DIRECTION.md` for visual intent
4. Implement within step scope only
5. Lint, typecheck, build
6. Screenshot desktop + mobile for visual PRs

## Copy tone

- Formal, precise, factual — procurement-grade
- Original tagline and 20+ years experience as anchors
- No SaaS verbs, no fake metrics, no surveillance-first hero
- German: institutional Sie-tone where appropriate
- English: international government/security register

## Questions to ask the user

- Is the current implementation step authorized?
- Accordion or tabs for solutions (Step 8)?
- Legal counsel approval needed?
- Certifications or client logos approved?

## Documentation maintenance

- Token changes → update `DESIGN_SYSTEM.md` + both token files
- Vision changes → `DESIGN_DIRECTION.md`
- Copy changes → `CONTENT_BLUEPRINT.md` first, then `site.ts`
- Step completion → check off tasks in `IMPLEMENTATION_PLAN.md`
