# Elaman GmbH — current implementation and release plan

## Status

The previous heritage-modern release remains on `main`. The active `codex/fullscreen-sections` slice implements the approved six-section viewport rhythm, has passed the full local production gate, and is ready for Vercel Preview acceptance.

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

| Unit | Outcome                                                                          | State            |
| ---: | -------------------------------------------------------------------------------- | ---------------- |
|  P15 | Heritage homepage reconstruction                                                 | Published        |
|  P16 | Responsive, accessibility, and interaction pass                                  | Published        |
|  P17 | Contact API, validation, honeypot, and Resend integration                        | Published        |
|  P18 | SEO, legal routes, metadata, and release hardening                               | Published        |
|  P19 | Production deployment to `main`                                                  | Published        |
|  P20 | Open capability ledger replacing the enclosed matrix                             | Published        |
|  P21 | Remove abandoned source, obsolete assets, and unused Framer Motion dependency    | Published        |
|  P22 | Six fullscreen-oriented sections with five approved images and soft desktop snap | Verified locally |

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

## Final verification gate

Before Preview acceptance:

1. Run `npm run format` and `git diff --check`.
2. Run `npm run lint`.
3. Run `npm run typecheck`.
4. Run `npm run format:check`.
5. Run `npm run build`.
6. Run `npm audit --omit=dev`.
7. Verify DE and EN at 320×568, 390×844, 768×1024, 1024×768, 1366×768, 1440×900, and 1600×1000.
8. Verify all navigation, locale, mobile-menu, reduced-motion, form, legal, 404, and metadata paths.
9. Push the feature branch and obtain a Vercel Preview URL.
10. Capture desktop, tablet, and mobile Preview screenshots.

## Operational follow-ups

- Verify final production domain and `NEXT_PUBLIC_SITE_URL`.
- Configure and test the verified Resend sender and recipient.
- Have responsible counsel review the preserved imprint and privacy policy.
- Submit a production inquiry and confirm delivery and reply-to behavior.

## Release rule

Do not merge this slice to `main` until the Preview stand and required screenshots have been reviewed. Publishing to `main` remains a separate explicit action.
