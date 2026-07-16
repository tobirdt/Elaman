# Agent and contributor guide — Elaman website

Instructions for AI agents and developers working on the production Elaman GmbH website.

## Project summary

The site is a bilingual German/English one-page company website built with Next.js 16, React 19, and Tailwind CSS 4. Its audience is institutional: public-sector decision-makers, technical stakeholders, procurement teams, and security-related organisations.

The approved visual direction is a modern reconstruction of the former Elaman homepage: white-first, photography-led, restrained, and precise. It must feel like an established specialist company, not a SaaS product, a security-themed spectacle, or a design-system demo.

## Sources of truth

Read these before changing the site:

1. `lib/content/site.ts` — exact bilingual marketing copy rendered by the current site
2. `CONTENT_BLUEPRINT.md` — approved facts, content boundaries, and section purpose
3. `app/globals.css` and `lib/design/tokens.ts` — canonical visual and motion tokens
4. `DESIGN_DIRECTION.md` — current experience and art direction
5. `DESIGN_SYSTEM.md` — current implementation contracts
6. `IMPLEMENTATION_PLAN.md` — current release state and active work
7. `README.md` — development, validation, and deployment

For visual behavior, current reachable application code wins over prose. If documentation drifts, update it in the same change. Do not preserve an obsolete component or token merely because an old document mentions it.

Conflict order for public wording: verified fact → `CONTENT_BLUEPRINT.md` → approved stakeholder wording. Never paraphrase legal copy without counsel approval.

## Hard constraints

### Do

- Keep German and English content complete and aligned.
- Use tokens from `app/globals.css`; keep `lib/design/tokens.ts` synchronized.
- Compose with the reachable primitives in `components/ui` and the four current homepage sections.
- Keep the homepage order: Hero → Company/portfolio → Protection → Contact.
- Preserve the contact-form honeypot, client validation, server validation, and safe email rendering.
- Respect `prefers-reduced-motion` for all transitions and entrances.
- Use `next/image` with an accurate `sizes` value for site imagery.
- Run `npm run lint`, `npm run typecheck`, `npm run format:check`, and `npm run build` before signoff.
- Capture desktop and mobile screenshots for visual changes.

### Do not

- Reintroduce removed Scroll Story, DotMatrix, formation, glass, technical-grid, signal-diagram, or feature-card implementations.
- Add glassmorphism, gradient blobs, grid overlays, glow, cyberpunk styling, icon-tile grids, bento layouts, large shadows, or soft SaaS rounding.
- Add colours outside the canonical palette or add/replace fonts.
- Add imagery beyond the three approved heritage photographs and supplied brand assets.
- Invent statistics, certifications, client logos, named customers, portals, or sovereignty claims.
- Add Framer Motion or another animation dependency for behavior achievable with the current CSS system.
- Add scroll-scrubbed motion, parallax, loops, decorative perpetual motion, blur animation, or layout-property animation.
- Hardcode locale-specific marketing copy inside components.
- Change legal wording without explicit approval.
- Modify CI or add a dependency without a task-specific reason.
- Commit or push unless the user explicitly asks.

## Canonical visual system

### Palette

| Token          |     Value | Role                                      |
| -------------- | --------: | ----------------------------------------- |
| paper          | `#ffffff` | Primary canvas                            |
| paper-soft     | `#f7f8fa` | Quiet contrast                            |
| graphite       | `#16181d` | Primary text                              |
| graphite-muted | `#555d6b` | Body text                                 |
| graphite-soft  | `#667286` | Metadata                                  |
| elaman-blue    | `#244074` | Brand and active state                    |
| elaman-red     | `#d83034` | Protection semantics and required markers |
| navy           | `#172033` | Company and inquiry bands                 |
| on-dark        | `#f7f8fa` | Primary text on navy                      |
| on-dark-muted  | `#c7d0dc` | Secondary text on navy                    |

No additional palette is permitted.

### Typography and shape

- Geist is the sole editorial face; Geist Mono is reserved for terse labels and sequence numbers.
- Headings use strong scale contrast and restrained negative tracking.
- Body copy stays within readable line lengths.
- Card radius is 2px; control radius is 6px.
- Ordinary content has no shadow. `shadow-overlay` is only for physically overlaid mobile navigation.
- Hairlines structure information locally; they must not create dominant boxed matrices.

### Photography

The only approved homepage photographs are:

- `public/images/elaman-advice.png`
- `public/images/elaman-protection.png`
- `public/images/elaman-munich-office.jpg`

Keep the crops static and deliberate. The hero image is the LCP image and must remain immediately available.

## Current component vocabulary

| Need                   | Current primitive                |
| ---------------------- | -------------------------------- |
| Page width             | `Container`                      |
| Content/legal spacing  | `Section`                        |
| Legal and 404 headings | `SectionHeader` + `SectionLabel` |
| Actions                | `Button`                         |
| Navigation             | `Header` + `LanguageSwitcher`    |
| Footer                 | `Footer`                         |
| Anchor correction      | `AnchorScrollManager`            |

The application intentionally has no generic card, surface, diagram, or animation component layer. Add a primitive only when at least two current consumers need the same contract.

## Homepage structure

| Anchor        | Component            | Purpose                                                                                  |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| `#hero`       | `HeroSection`        | Advice photograph, Elaman name, original tagline, verified introduction, single 20+ stat |
| `#experience` | `CapabilityOverview` | Navy company statement and open capability ledger                                        |
| `#systems`    | internal anchor      | Portfolio navigation target inside `CapabilityOverview`                                  |
| `#protection` | `ProtectionSection`  | Tiger band and factual protection/countermeasure information                             |
| `#contact`    | `ContactSection`     | Munich office, direct contact routes, and inquiry form                                   |

Do not add top-level sections without explicit approval.

## Motion law

The active site uses CSS only:

- 120ms: micro feedback
- 180ms: hover/focus feedback
- 240ms: menu state
- 600ms: the single hero-copy entrance
- signature easing: `cubic-bezier(0.22, 1, 0.36, 1)`

Animate only opacity and transforms for movement. Colour, border, and focus feedback may use the micro tiers. The global reduced-motion query must render final states immediately and disable smooth scrolling.

## Content and i18n

- Locales are `de` and `en`; German is the default route.
- All marketing strings come from `getSiteContent(locale)`.
- Use `sectionPath(locale, "#anchor")` for anchored navigation.
- Keep exactly one visible 20+ experience statement in the hero.
- Public detail remains discreet: describe capability categories without operational specifics or named customers.
- `/imprint` and `/private-policy` remain language-neutral preserved legal pages until counsel approves revisions.

## Contact form

- Present it as an inquiry form, never a secure portal.
- Required environment variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `NEXT_PUBLIC_SITE_URL`.
- Missing mail configuration must fail safely; do not fake successful delivery.
- Preserve rate limiting, payload-size protection, HTML escaping, and reply-to behavior.

## Documentation maintenance

- Copy or content-shape change → update `CONTENT_BLUEPRINT.md` and `lib/content/site.ts` together.
- Token change → update `app/globals.css`, `lib/design/tokens.ts`, and `DESIGN_SYSTEM.md`.
- Visual-intent change → update `DESIGN_DIRECTION.md`.
- Scope or release-state change → update `IMPLEMENTATION_PLAN.md`.
- Component removal → remove stale documentation and tests/evidence that describe the removed implementation.

Keep the repository limited to the current product. Do not retain abandoned alternatives, historical screenshots, migration aliases, or unreachable components in production source.
