# Elaman GmbH — current implementation and release plan

## Status

The approved Heritage Modern V2 release is the current production baseline. It combines the six-section homepage with three bilingual dossier pages, refined mobile navigation, release hardening, and automated desktop and iPhone browser coverage.

German remains the default at `/de`; English is complete at `/en`.

## Current release surface

The homepage contains six compositions:

1. Hero
2. Profile
3. Advice
4. Systems
5. Protection
6. Contact

Legal pages, bilingual navigation, global and localised 404 handling, metadata, structured data, sitemap, robots, the contact API, and the compact footer are part of the release surface. Company, Systems, and Protection dossiers are available in both languages.

## Completed release units

| Unit | Outcome                                                                          | State     |
| ---: | -------------------------------------------------------------------------------- | --------- |
|  P15 | Heritage homepage reconstruction                                                 | Published |
|  P16 | Responsive, accessibility, and interaction pass                                  | Published |
|  P17 | Contact API, validation, honeypot, and Resend integration                        | Published |
|  P18 | SEO, legal routes, metadata, and release hardening                               | Published |
|  P19 | Production deployment to `main`                                                  | Published |
|  P20 | Open capability ledger replacing the enclosed matrix                             | Published |
|  P21 | Remove abandoned source, obsolete assets, and unused Framer Motion dependency    | Published |
|  P22 | Six fullscreen-oriented sections with five approved images and soft desktop snap | Published |
|  P23 | Entity-led SEO, management association, canonical sitemap, and search metadata   | Published |
|  P24 | Terminal homepage snap point keeping the compact footer fully reachable          | Published |
|  P25 | Heritage Modern V2 dossiers, mobile navigation, imagery, metadata, and QA        | Published |

## P25 — Heritage Modern V2

### Scope

- Preserve the six-section homepage as the primary orientation layer.
- Add `/de/unternehmen` ↔ `/en/company`, `/de/systeme` ↔ `/en/systems`, and `/de/schutzloesungen` ↔ `/en/protection`.
- Use an office-led Company dossier without an invented portrait or biography.
- Expand the eight verified systems categories with concise, non-operational descriptions.
- Add the supplied Jammer and TSE motifs only to the Protection dossier and retain one red protection marker per composition.
- Add reciprocal locale routes, contextual homepage links, canonical/hreflang metadata, structured data, sitemap entries, and route-specific social images.
- Promote Company, Systems, and Protection to direct global-navigation destinations; retain Approach and Contact as homepage anchors and show Home / Start explicitly in the mobile menu.
- Refine the mobile menu into a focus-contained, document-locking navigation panel below the sticky header.
- Add safe-area-aware page gutters, intentional touch feedback, and one coordinated CSS-only route-hero entrance.
- Keep normal document flow on dossiers; the root receives scroll snap only while `main[data-scroll-snap-page]` marks the homepage, and section/footer alignment remains opt-in.

### Safety boundaries

- No portrait placeholder, generated person, biography, named customer, certification, new statistic, or operational detail.
- No new palette, font, animation dependency, glass, grid overlay, feature-card wall, or scroll-bound motion.
- No changes to legal wording or contact-delivery behavior.

### Acceptance

- All six detail routes render statically with correct reciprocal language switching and route-specific metadata.
- Global navigation identifies the current dossier or corresponding homepage section and exposes every primary route in both locales.
- Homepage anchors, soft snap, contact form, legal routes, and 404 remain regression-free.
- The mobile menu opens without document bleed, cycles focus, closes on Escape/navigation, and keeps every action reachable on short screens.
- German and English remain readable and overflow-free across the full viewport matrix.
- Route heroes remain immediate LCP candidates and reduced motion presents their final state without transition.
- Automated desktop and iPhone WebKit smoke tests cover every public route, modal menu behavior, serious accessibility findings, horizontal overflow, contact validation, 404 fallback, and production security headers.

## P22 — six-section viewport rhythm

### Scope

- Split company, project path, and systems content into independent compositions.
- Add canonical `screen` section mode with `svh` minimum-height behavior and natural growth.
- Make sticky header plus hero exactly one normal viewport.
- Add verified Profile and Advice anchors and expand the bilingual header to six entries.
- Integrate web derivatives of the supplied Stone Bridge and Media Mining images.
- Keep one `20+` fact, one protection H2, and one red protection dot.
- Use a genuine four-stage process line and an open row-major systems ledger.
- Refactor Contact into a desktop image/content split without changing validation or delivery.
- Apply soft proximity snap only to large fine-pointer, non-reduced-motion environments.
- Update content, design documentation, contributor guidance, and project skills.

### Safety boundaries

- Do not add customers, authorities, countries, certifications, or unsupported claims.
- Keep legal content unchanged.
- Preserve contact validation, honeypot, server validation, mail delivery, and security headers.
- Do not add an animation or icon dependency.
- Do not clip translations or force short displays into fixed-height pages.

### Acceptance

- Header plus Hero equal the viewport at normal desktop and mobile heights where content fits.
- Every subsequent section is at least the visible height below the header.
- Longer content grows without clipping or internal scroll areas.
- Six anchors, active navigation, deep links, skip link, and hash-preserving locale switch work.
- Mobile and tablet scroll freely; desktop snap is soft; reduced motion removes smooth/snap behavior.
- No horizontal overflow, automatic hyphenation, layout jumps, or browser-console errors.
- Contact validation and focus behavior are unchanged.

## P24 — terminal footer snap

- Keep the six section starts as soft `start` snap points.
- Let the homepage footer provide one terminal `end` snap point after Contact.
- Scope the terminal point to the homepage so legal and utility pages retain normal document scrolling.
- Preserve `y proximity`, native browser scrolling, reduced-motion behavior, and free touch/tablet scrolling.

## Final verification evidence

The release passed:

1. formatting, diff, lint, TypeScript, production build, and dependency audit gates;
2. DE and EN checks from compact mobile through wide desktop;
3. navigation, locale, mobile-menu, reduced-motion, form, legal, 404, and metadata paths;
4. desktop, tablet, and mobile production screenshots;
5. production-mode browser and API verification with no console errors or horizontal overflow;
6. Lighthouse accessibility, best-practices, and SEO scores of 100 on mobile and desktop.

## Operational follow-ups

- Have responsible counsel review the preserved imprint and privacy policy.
- Rotate the temporary demo Resend API key after stakeholder acceptance.
- Verify the domain property in Google Search Console, submit `/sitemap.xml`, and request recrawling for `/de`, `/en`, and `/imprint` after deployment.

## Release rule

Publish to `main` only after explicit stakeholder approval and a clean final verification run.
