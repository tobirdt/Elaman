# Elaman GmbH — current implementation and release plan

## Status

The approved six-section viewport release is the current production release on `main` and has passed the full production gate.

German remains the default at `/de`; English is complete at `/en`.

## Current release surface

The homepage contains six compositions:

1. Hero
2. Profile
3. Advice
4. Systems
5. Protection
6. Contact

Legal pages, bilingual navigation, 404 handling, metadata, structured data, sitemap, robots, the contact API, and the compact footer remain part of the release surface.

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

## Final verification evidence

The release passed:

1. formatting, diff, lint, TypeScript, production build, and dependency audit gates;
2. DE and EN checks from compact mobile through wide desktop;
3. navigation, locale, mobile-menu, reduced-motion, form, legal, 404, and metadata paths;
4. desktop, tablet, and mobile Preview screenshots;
5. production-mode browser and API verification with no console errors or horizontal overflow;
6. Lighthouse accessibility, best-practices, and SEO scores of 100 on mobile and desktop.

## Operational follow-ups

- Have responsible counsel review the preserved imprint and privacy policy.
- Rotate the temporary demo Resend API key after stakeholder acceptance.
- Verify the domain property in Google Search Console, submit `/sitemap.xml`, and request recrawling for `/de`, `/en`, and `/imprint` after deployment.

## Release rule

Publish to `main` only after explicit stakeholder approval and a clean final verification run.
