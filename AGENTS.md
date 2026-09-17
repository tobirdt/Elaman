# Agent and contributor guide — Elaman website

Instructions for AI agents and developers working on the production Elaman GmbH website.

## Project summary

The site is a bilingual German/English company website built with Next.js 16, React 19, and Tailwind CSS 4. A five-section homepage provides orientation; two localised dossier pages add measured depth for the company and systems; a localised contact page carries the inquiry form. Its audience is institutional: public-sector decision-makers, technical stakeholders, procurement teams, and security-related organisations.

The approved visual direction is a modern reconstruction of the former Elaman homepage: white-first, photography-led, restrained, and precise. It must feel like an established specialist company, not a SaaS product, a security-themed spectacle, or a design-system demo.

## Product and audience

- **Audience.** Decision-makers, technical stakeholders, procurement teams, and operational specialists in government security authorities and security-related organisations. They visit in a professional context and need to establish credibility, scope, and a clear route to contact without sales-funnel language or theatrical security imagery.
- **Purpose.** Present Elaman GmbH as an established German security-technology partner. The site communicates trust, technical competence, more than 25 years of experience, and full-service delivery in German and English, then makes a direct business inquiry easy. Success means a qualified visitor can understand the company, its approach, and its relevance without unsupported claims or public operational detail.
- **Brand personality.** Calm, exact, and assured. Institutional without bureaucracy; technical without spectacle; distinctive without fashion-led decoration. The emotional goal is earned confidence.
- **Principles.** Make trust visible through hierarchy, restraint, and sourced facts rather than badges or claims. Preserve the supplied heritage photography and verified content while giving each composition a distinct, calm role. Let the supplied points-only signet carry the header identity; do not repeat its geometry as decoration. Give each viewport one dominant idea and make German copy a first-class composition constraint, not a translation afterthought. Keep motion limited to orientation and direct state feedback; static content remains complete without it.
- **Accessibility goal.** Target WCAG 2.2 AA for contrast, keyboard access, focus visibility, semantics, and touch targets. Respect `prefers-reduced-motion` with immediate final states. Do not rely on colour alone, preserve readable document order, prevent horizontal overflow, and test both languages at mobile, tablet, and desktop widths.

Anti-references (no glassmorphism, gradient washes, glow fields, cyberpunk/hacker imagery, surveillance-first hero language, bento layouts, icon-tile grids, invented metrics, unsourced certifications, named clients, or implied secure-portal handling) are enforced as the "Do not" list under Hard constraints below — this section states intent, that section states the rule.

## Sources of truth

Read these before changing the site:

1. `lib/content/site.ts`, `lib/content/detail-pages.ts`, `lib/content/contact-page.ts`, `lib/content/legal.ts` — exact bilingual copy rendered by the current site
2. `CONTENT_BLUEPRINT.md` — approved facts, content boundaries, and information architecture
3. `app/globals.css` and `lib/design/tokens.ts` — canonical visual and motion tokens
4. `DESIGN_SYSTEM.md` — current design direction and implementation contracts
5. `README.md` — development, validation, and deployment

For visual behavior, current reachable application code wins over prose. If documentation drifts, update it in the same change. Do not preserve an obsolete component or token merely because an old document mentions it.

Conflict order for public wording: verified fact → `CONTENT_BLUEPRINT.md` → approved stakeholder wording. Never paraphrase legal copy without counsel approval.

## Hard constraints

### Do

- Keep German and English content complete and aligned.
- Use tokens from `app/globals.css`; keep `lib/design/tokens.ts` synchronized.
- Compose with the reachable primitives in `components/ui`, the five homepage sections, the two dossier compositions, and `ContactPage`.
- Keep the homepage order: Hero → Profile → Advice → Solutions → Contact.
- Preserve the contact-form honeypot, client validation, server validation, and safe email rendering.
- Respect `prefers-reduced-motion` for all transitions, entrances, and the scroll-linked reveal.
- Use `next/image` with an accurate `sizes` value for site imagery.
- Run `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run test:unit`, `npm run build`, and `npm run test:e2e` before signoff.
- After an intended visual change, refresh the screenshot baselines with `npm run test:visual:update` and read the diff; CI compares every route against `tests/e2e/__screenshots__`.
- When copy changes, bump that route's date in `lib/seo/content-dates.ts`; the unit test names the file when it is forgotten.

### Do not

- Reintroduce removed Scroll Story, DotMatrix, formation, glass, technical-grid, signal-diagram, feature-card, or scroll-snap implementations.
- Add glassmorphism, gradient blobs, grid overlays, glow, cyberpunk styling, icon-tile grids, bento layouts, large shadows, or soft SaaS rounding.
- Add colours outside the canonical palette or add/replace fonts.
- Add imagery beyond the four approved heritage photographs, their route-specific social crops, and supplied brand assets.
- Invent statistics, certifications, client logos, named customers, portals, or sovereignty claims.
- Add Framer Motion or another animation dependency for behavior achievable with the current CSS system.
- Add scroll-scrubbed motion, parallax, loops, decorative perpetual motion, blur animation, or layout-property animation. The `.reveal` / `.reveal-group` scroll-linked entrance (opacity and transform only, driven by `animation-timeline: view()`) is the one approved exception — see the Motion section in `DESIGN_SYSTEM.md` before extending it.
- Hardcode locale-specific marketing copy inside components.
- Change legal wording without explicit approval.
- Modify CI or add a dependency without a task-specific reason.
- Commit or push unless the user explicitly asks.

## Canonical visual system

### Palette

| Token          |     Value | Role                           |
| -------------- | --------: | ------------------------------ |
| paper          | `#ffffff` | Primary canvas                 |
| paper-soft     | `#f7f8fa` | Quiet contrast                 |
| graphite       | `#16181d` | Primary text                   |
| graphite-muted | `#555d6b` | Body text                      |
| graphite-soft  | `#667286` | Metadata                       |
| elaman-blue    | `#244074` | Brand and active state         |
| elaman-red     | `#d83034` | Required and error form states |
| navy           | `#172033` | Solutions composition          |
| on-dark        | `#f7f8fa` | Primary text on navy           |
| on-dark-muted  | `#c7d0dc` | Secondary text on navy         |

No additional palette is permitted.

### Typography and shape

- Geist is the sole editorial face; Geist Mono is reserved for terse labels and sequence numbers.
- Headings use strong scale contrast and restrained negative tracking.
- Body copy stays within readable line lengths.
- Card radius is 2px; control radius is 6px.
- Ordinary content has no shadow. `shadow-overlay` is only for physically overlaid mobile navigation.
- Hairlines structure information locally; they must not create dominant boxed matrices.

### Photography

The approved source photographs are:

- `public/images/elaman-advice.jpg`
- `public/images/elaman-profile-bridge.jpg`
- `public/images/elaman-systems-media-mining.jpg`
- `public/images/elaman-munich-office.jpg`

The route-specific `elaman-home-og`, `elaman-company-og`, `elaman-systems-og`, and `elaman-contact-og` files are derived social previews, not additional editorial motifs. Keep all crops static and deliberate. The current route hero is the LCP image and must remain immediately available.

## Current component vocabulary

| Need                        | Current primitive                                  |
| --------------------------- | -------------------------------------------------- |
| Page width                  | `Container`                                        |
| Screen/content/legal rhythm | `Section` (`screen`, `content-band`, `legal-page`) |
| Page opening                | `PageHeader` + `Breadcrumb`                        |
| Section opening             | `SectionIntro` + `SectionLabel`                    |
| Full-width photograph       | `MediaBand`                                        |
| Page close                  | `ClosingBand`                                      |
| Actions                     | `Button`                                           |
| Editorial route link        | `TextLink`                                         |
| Navigation                  | `Header` + `LanguageSwitcher`                      |
| Footer                      | `Footer`                                           |
| Detail composition          | `DetailDossier`                                    |
| Contact page composition    | `ContactPage` (direct details, `ContactForm`)      |

The application intentionally has no generic card, surface, diagram, animation, or anchor-scroll-management component layer. Add a primitive only when at least two current consumers need the same contract.

## Homepage structure

| Component          | Purpose                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HeroSection`      | Elaman, approved tagline, and the single 25+ experience stat                                                                                       |
| `ProfileSection`   | Company profile, factual management link, and supplied stone-bridge image                                                                          |
| `AdviceSection`    | Four-stage project path from analysis to support                                                                                                   |
| `SolutionsSection` | Navy Media Mining split and open five-area ledger                                                                                                  |
| `ContactSection`   | Munich office, direct contact routes, and the link to the contact page — **no inquiry form**; the form lives only on `/de/kontakt` ↔ `/en/contact` |

Do not change this approved section set or order without explicit approval.

## Motion law

The active site uses CSS only:

- 120ms: micro feedback
- 180ms: hover/focus feedback
- 240ms: menu state
- 600ms: the coordinated route-hero image and copy entrance
- signature easing: `cubic-bezier(0.22, 1, 0.36, 1)`

Animate only opacity and transforms for movement. Colour, border, and focus feedback may use the micro tiers. The global reduced-motion query must render final states immediately.

A scroll-linked reveal (`.reveal`, `.reveal-group > *` in `app/globals.css`) is the one approved section-entrance effect: `animation-timeline: view()` inside `@supports`, only under `prefers-reduced-motion: no-preference`, animating only `opacity` and `transform` (the same 12px rise as the hero entrance), with the final state as the unconditional fallback. It requires no JavaScript and no observer. There is no scroll snap anywhere in the site — it was removed along with `AnchorScrollManager`. Never add strict paging, wheel interception, a nested page scroller, parallax, loops, or any other scroll-bound animation beyond this one reveal.

## Content and i18n

- Locales are `de` and `en`; German is the default route.
- Homepage strings come from `getSiteContent(locale)`; dossier strings come from `getDetailPageContent(locale, kind)`; contact-page strings come from `getContactPageContent(locale)`; legal strings from `getLegalPageContent(locale, kind)`; the error boundary from `getErrorContent(locale)`.
- Build every internal path with the helpers in `lib/i18n.ts` — `homePath`, `detailPagePath`, `contactPagePath`, `legalPagePath`. They return `Route`, so the single `typedRoutes` assertion lives there and content files and components stay cast-free.
- Detail routes are `/de/unternehmen` ↔ `/en/company` and `/de/loesungen` ↔ `/en/solutions` (the old `/de/systeme` and `/en/systems` redirect permanently); the contact route is `/de/kontakt` ↔ `/en/contact`.
- Global navigation exposes four pages — Start / Home, Unternehmen / Company, Lösungen / Solutions, Kontakt / Contact — plus the locale switch, at every width and in that order; the points-only signet leads to the homepage as well, carrying an `sr-only` name rather than a visible word. The menu contains no anchors.
- Active navigation is purely path-based: `aria-current="page"` on an exact path match, never colour alone. The header carries no scroll observation.
- Keep exactly one visible 25+ experience statement in the hero.
- Public detail remains discreet: describe capability categories without operational specifics or named customers.
- `/de/impressum` ↔ `/en/site-notice` and `/de/datenschutz` ↔ `/en/privacy-policy` are the current legal routes; `/imprint` and `/private-policy` redirect permanently (308) to the German pages. Legal wording changes require explicit approval.

## Contact form

- It lives on the contact page (`/de/kontakt` ↔ `/en/contact`) only; the homepage closes with the direct contact details and one primary action that leads there — it never embeds the form itself.
- Present it as an inquiry form, never a secure portal.
- Server checks run in this order: payload size → JSON parsing → request origin (`Sec-Fetch-Site` / `Origin` vs. request host, `403` on mismatch) → rate limit → honeypot → completion-time check (`startedAt`, silently discarded under 3 seconds) → field validation → Resend.
- Required environment variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `NEXT_PUBLIC_SITE_URL`.
- Missing mail configuration must fail safely (`send_failed`); do not fake successful delivery.
- Preserve rate limiting, payload-size protection, HTML escaping, and reply-to behavior.
- The API's function region is pinned to `fra1` through `vercel.json`, not a `preferredRegion` export (deprecated in Next 16).

## Quality gate

Before signoff: `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run test:unit`, `npm run build`, `npm run test:e2e`. The same sequence, plus the screenshot comparison (`CI=true`) and the Lighthouse budget (`npm run lighthouse`), runs in `.github/workflows/ci.yml` on every push to `main` and every pull request.

## Documentation maintenance

- Copy or content-shape change → update `CONTENT_BLUEPRINT.md` and the relevant `lib/content/*.ts` module together.
- Token or motion change → update `app/globals.css`, `lib/design/tokens.ts`, and `DESIGN_SYSTEM.md`.
- Scope, tooling, or deployment change → update `README.md`.
- Component removal → remove stale documentation and tests/evidence that describe the removed implementation.

This repository's documentation is limited to `README.md`, `AGENTS.md`, `CONTENT_BLUEPRINT.md`, `DESIGN_SYSTEM.md`, and `OPTIMIZATION_PLAN.md` (the active release-state tracker). Do not retain abandoned alternatives, historical screenshots, migration aliases, or unreachable components in production source.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
