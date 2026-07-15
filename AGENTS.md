# Agent and contributor guide — Elaman website

Instructions for AI agents and developers working on the Elaman GmbH website.

## Project summary

Production Next.js 16, React 19, Tailwind 4, and Framer Motion 12 site for Elaman GmbH. The bilingual EN/DE one-pager uses a white-first “Precision Dossier” aesthetic for an institutional communications and security-engineering audience.

The defining system is flat paper, hairline rules, disciplined typography, generous whitespace, and restrained logo-derived dot geometry. It must feel like an assured institutional company site, not a SaaS landing page or a design-system demonstration.

## Sources of truth

Read these before changing the site:

1. CONTENT_BLUEPRINT.md — authoritative facts and bilingual copy
2. IMPLEMENTATION_PLAN.md — active implementation slice and scope
3. app/globals.css and lib/design/tokens.ts — canonical visual tokens
4. lib/design/formations.ts — dot-formation geometry and accent governance
5. lib/motion/presets.ts — canonical motion tiers, easing, springs, and variants
6. DESIGN_DIRECTION.md — experience and art direction
7. DESIGN_SYSTEM.md — implementation rules and component vocabulary
8. README.md — local development, validation, and deployment

For visual or motion behavior, current code wins over prose. If code and documentation drift, verify the implementation, update the documentation in the same change, and do not invent a third system.

Conflict order for public wording remains: verified fact → CONTENT_BLUEPRINT.md → approved stakeholder wording. Never paraphrase legal copy without counsel approval.

## Hard constraints

### Do

- Follow the active implementation slice in IMPLEMENTATION_PLAN.md; keep one focused slice per PR.
- Use copy from CONTENT_BLUEPRINT.md when changing lib/content/site.ts.
- Update EN and DE content together.
- Use tokens from app/globals.css and lib/design/tokens.ts; update both mirrors together.
- Compose from components/ui, components/motion, and components/sections.
- Use the dot-formation system from lib/design/formations.ts instead of inventing decorative graphics.
- Preserve the fixed homepage order in app/(marketing)/[locale]/page.tsx unless the user explicitly approves a change.
- Respect prefers-reduced-motion in CSS and every Framer Motion component.
- Keep the contact honeypot, client validation, and server validation.
- Run npm run lint && npm run typecheck && npm run build before claiming implementation work is complete.
- Capture desktop and mobile screenshots for visual changes.

### Do not

- Introduce glassmorphism, blur-glass cards, large shadows, gradient washes, gradient blobs, grid overlays, neon/cyberpunk styling, bento layouts, icon-tile grids, or generic SaaS patterns.
- Add new brand colours or raw colour values outside the token sources.
- Add or replace fonts. Geist and Geist Mono are fixed.
- Add imagery beyond the three explicitly approved heritage assets, or turn the hero into a surveillance-first composition.
- Use uniform copy-pasted fade-ins for every section. Choreography must follow content and hierarchy.
- Add scroll-scrubbed animation without explicit approval.
- Animate layout properties, filters, blur, font size, or letter spacing.
- Add looping decorative motion.
- Use unsourced claims such as “100% sovereignty,” “secure portal,” invented statistics, certifications, or client logos.
- Hardcode locale strings in marketing components.
- add dependencies without a clear task-specific reason.
- Modify CI workflows, CI configuration, or the established quality gate.
- Commit secrets or create commits unless explicitly asked.

## Design law

### Canonical palette

| Token          |                  Value | Role                                    |
| -------------- | ---------------------: | --------------------------------------- |
| paper          |                #ffffff | Primary canvas and flat surfaces        |
| paper-soft     |                #f7f8fa | Quiet section contrast and inset fields |
| line           | rgba(22, 24, 29, 0.12) | Default hairline                        |
| graphite       |                #16181d | Primary text and ink                    |
| graphite-muted |                #555d6b | Body text                               |
| graphite-soft  |                #667286 | Tertiary text and technical metadata    |
| elaman-blue    |                #244074 | Elaman/active accent                    |
| elaman-red     |                #d83034 | Protection accent                       |
| navy           |                #172033 | Selective dark band                     |
| on-dark        |                #f7f8fa | Primary text on navy                    |
| on-dark-muted  |                #c7d0dc | Secondary text on navy                  |

No additional palette is permitted. Red on navy may use the accessibility token #ff6b6f.

### Typography

- Geist is the sole sans face.
- Geist Mono is the sole technical/label face.
- Display and section titles use restrained negative tracking and strong scale contrast.
- Mono labels are small, uppercase, and technical; they are not body copy.
- Oversized numerals are editorial anchors, not decorative counters.

### Shape and depth

- Cards and panels use a 2px radius.
- Controls use a 6px radius; pills are reserved for truly pill-shaped controls.
- Surfaces are flat paper or navy with a 1px hairline.
- The only shadow token is shadow-overlay, reserved for UI that physically overlays content such as mobile navigation or sticky chrome.
- Do not use shadows to make ordinary cards feel raised.

## Signature devices

### DotMatrix formations

lib/design/formations.ts derives all formations from the Elaman logo grid. A visual composition must contain:

- exactly one blue dot for Elaman, focus, or the active state;
- at most one red dot, and only when the composition carries protection semantics;
- all remaining dots in low-opacity graphite or on-dark ink.

Do not scatter blue/red points as decoration, repeat the same formation in adjacent sections, or create local coordinate sets when a shared formation can express the state.

The active homepage does not render a standalone DotMatrix composition. Keep the shared formation library available for purposeful diagrams, but do not add dot graphics merely to fill the photography-led composition.

### Section rhythm

Do not add numbered register labels to top-level sections. Use the actual section title, whitespace, tonal contrast, and hairlines for orientation. Numbering is reserved for genuine ordered processes.

### MonoLabel

Use components/ui/MonoLabel for eyebrow labels, sequence identifiers, and concise technical metadata. It uses Geist Mono and the mono-label token. Do not use it for paragraphs.

### Stat and large figures

Use components/ui/Stat or the same typography tokens for factual metrics. One coherent stat group per viewport is the default. Do not invent figures.

## Layout primitives

| Need             | Primitive                                                           |
| ---------------- | ------------------------------------------------------------------- |
| Section mode     | Section: hero-screen, screen, screen-lite, content-band, legal-page |
| Width            | Container: page, content, copy, narrow, legal                       |
| Flat surface     | Surface: card, inset, navy                                          |
| Overlay surface  | Surface: raised                                                     |
| Heading block    | SectionHeader                                                       |
| Ruled structure  | Hairline borders within the section composition                     |
| Technical label  | MonoLabel                                                           |
| Editorial figure | Stat                                                                |
| Brand graphic    | DotMatrix and formation-specific components                         |
| Actions          | Button: primary, secondary, ghost                                   |

Legacy Section props and Surface aliases remain only for migration. Do not use them in new code.

## Motion law

lib/motion/presets.ts is the single source of truth.

| Tier                      |    Duration | Use                                             |
| ------------------------- | ----------: | ----------------------------------------------- |
| Micro / fast              |   120–180ms | Hover, focus, press, colour and border feedback |
| State / medium / expand   |   240–320ms | Menu, accordion, form state, text swaps         |
| Reveal / trace / entrance |   380–600ms | Once-only entrances and hairline draws          |
| Scroll-linked             | No duration | MotionValues smoothed with scrollSpring         |

Rules:

- The homepage has no scroll-scrubbed animation. Adding one requires explicit approval.
- Animate transform and opacity only. Draw lines with scaleX/scaleY, not width/height.
- Reveals fire once and total stagger per group stays at or below 0.36s.
- Hover lift is capped at 2px and disabled for reduced motion.
- No loops, bouncing, text parallax, scroll-scaled headlines, blur/filter animation, or decorative perpetual motion.
- Reduced motion must render the final state immediately and disable smooth scrolling.
- Avoid a page of identical fade-ins. Use a restrained mix of line draw, formation assembly, hierarchy-led reveal groups, and state transitions.

## Homepage structure

The order in app/(marketing)/[locale]/page.tsx is fixed:

| Index | Anchor      | Component                                       |
| ----: | ----------- | ----------------------------------------------- |
|  Hero | #hero       | HeroSection                                     |
|    01 | #experience | CapabilityOverview                              |
|     — | #systems    | Internal portfolio anchor in CapabilityOverview |
|    02 | #protection | ProtectionSection                               |
|    03 | #contact    | ContactSection                                  |

Trust, approach, systems, delivery, and support content is consolidated into these four visible compositions. The protection composition carries the principal red semantic signal; navy is used for the company overview and inquiry field.

## i18n and content

- Locales: en and de.
- All marketing strings come from getSiteContent(locale).
- Use sectionPath(locale, "#anchor") for anchored navigation.
- Keep the original tagline and verified 20+ years of experience as factual anchors.
- Lead the hero with trust, experience, and engineering, never surveillance.
- German and English changes ship together.
- Legal content requires counsel approval before substantive paraphrase.

## Contact form

- Present it as an inquiry form, never as a secure portal.
- Preserve the honeypot and server-side validation.
- Required environment variables: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, NEXT_PUBLIC_SITE_URL.

## Documentation maintenance

- Token change → update app/globals.css, lib/design/tokens.ts, and DESIGN_SYSTEM.md.
- Formation change → update lib/design/formations.ts and the formation rules in DESIGN_SYSTEM.md.
- Motion change → update lib/motion/presets.ts and the motion rules in DESIGN_SYSTEM.md.
- Visual-intent change → update DESIGN_DIRECTION.md.
- Copy change → update CONTENT_BLUEPRINT.md first, then lib/content/site.ts.
- Scope/status change → update IMPLEMENTATION_PLAN.md.

Do not let transitional aliases, removed primitives, or an earlier visual direction return through documentation.
