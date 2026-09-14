# Elaman GmbH — current implementation and release plan

## Status

The Heritage Modern release remains the production baseline. The current verified local release candidate incorporates Holger Rumscheidt's approved content revision across both languages and narrows the public site to the confirmed company and systems scope.

German remains the default at `/de`; English is complete at `/en`. The current changes are local and have not been committed, pushed, previewed, or deployed.

## Current release surface

The homepage contains five compositions:

1. Hero
2. Profile
3. Advice
4. Systems
5. Contact

The Company and Systems dossiers and the contact route are available in both languages. Legal pages, bilingual navigation, global and localised 404 handling, metadata, structured data, sitemap, robots, the contact API, and the three-column footer remain part of the release surface.

## Current release candidate — stakeholder copy revision

### Scope

- Use the approved bridge tagline in German and an idiomatic English equivalent.
- Show one `25+` experience statement on each localised homepage.
- Position Elaman as a Munich-based security-technology company working exclusively for security authorities and security-related organisations.
- Keep `German Security Solutions.` as the English profile heading and global brand descriptor.
- Replace the former eight-area portfolio with the five approved areas: covert audio and video observation, audio and video analysis systems, TSCM, radio monitoring systems for mobile communications in special-purpose vehicles, and training and support.
- Remove the Protection homepage composition, dossier routes, navigation items, metadata, structured-data terms, and associated production components.
- Rewrite untouched German and English marketing passages to match Holger's direct, factual, human style without adding new claims.
- Keep legal wording and contact-delivery behaviour unchanged.

### Safety boundaries

- No named customers, certifications, new statistics beyond the approved `25+`, operational detail, or performance claims.
- No new palette, font, imagery, animation dependency, glass, grid overlay, feature-card wall, or scroll-bound motion.
- No changes to the contact form's validation, honeypot, rate limit, payload limit, escaping, or email delivery.

### Acceptance

- `/de`, `/en`, both Company routes, and both Systems routes render with aligned localised copy and metadata.
- `/de/schutzloesungen` and `/en/protection` return the complete branded 404 page and are absent from navigation, sitemap, and generated metadata.
- Both homepages show the approved tagline, exactly one `25+` value, and exactly five system areas.
- English reads as original British English rather than a literal translation.
- Homepage anchors, locale switching, mobile navigation, contact form, legal routes, and global 404 remain regression-free.
- German and English remain readable and overflow-free on desktop and mobile.
- The full project quality gate and browser suite pass before signoff.

## Current architecture

- Homepage sections use the canonical `screen` mode with natural growth.
- Soft `y proximity` scroll snap applies only to the homepage on large fine-pointer displays without reduced motion.
- Detail and legal pages remain in normal document flow.
- The homepage footer remains the single terminal end-aligned snap point.
- Company, Systems, and Contact are direct localised routes; the header carries no anchors.
- Route heroes use the existing CSS-only entrance and remain immediate LCP candidates.

## Operational follow-ups

- Have responsible counsel review the preserved imprint and privacy policy.
- Rotate the temporary demo Resend API key after stakeholder acceptance.
- After an approved production deployment, submit the updated sitemap and request recrawling for the changed German and English pages.

## Verification evidence

- ESLint, TypeScript, Prettier, the production build, and `git diff --check` pass.
- The Playwright suite passes against the production build with 50 tests and one expected desktop skip across Chromium and iPhone WebKit profiles.
- Browser checks cover the German desktop homepage, German mobile homepage and Systems section, German Company dossier, English mobile homepage and menu, and English Systems dossier.
- The checked pages have no browser-console errors, error overlays, serious accessibility findings, or horizontal overflow.
- Next.js and its ESLint configuration are patched to 16.3.4; the lockfile also resolves the affected transitive packages. Both the complete dependency audit and the production-only audit report no known vulnerabilities.
- Unknown static parameters return the complete server-rendered global 404. Next.js also emits the confirmed upstream `NoFallbackError` log entry for those correct 404 responses; see `PROJECT_CONTEXT.md` for the accepted framework limitation.

## Release rule

Publish to `main` only after explicit stakeholder approval and a clean final verification run.
