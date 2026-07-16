# Elaman GmbH — current implementation and release plan

## Status

The heritage-modern website is published on `main`. The capability-ledger refinement and repository cleanup are complete and verified locally; they await an explicitly requested release.

German is the default at `/de`; English remains complete at `/en`.

## Current product

The production experience contains exactly four homepage compositions:

1. Hero
2. Company/portfolio
3. Protection
4. Contact

Legal pages, the bilingual navigation, 404 handling, metadata, structured data, and the contact API remain part of the release surface.

## Completed release units

| Unit | Outcome                                                                                                            | State            |
| ---: | ------------------------------------------------------------------------------------------------------------------ | ---------------- |
|  P15 | Heritage homepage reconstruction                                                                                   | Published        |
|  P16 | Responsive, accessibility, and interaction pass                                                                    | Published        |
|  P17 | Contact API, validation, honeypot, and Resend integration                                                          | Published        |
|  P18 | SEO, legal routes, metadata, and release hardening                                                                 | Published        |
|  P19 | Production deployment to `main`                                                                                    | Published        |
|  P20 | Open capability ledger replacing the enclosed 4×2 matrix                                                           | Verified locally |
|  P21 | Remove unreachable legacy source, obsolete assets/evidence, stale data shapes, and unused Framer Motion dependency | Verified locally |

## P20 — capability ledger refinement

### Scope

- Replace the enclosed matrix with an open editorial ledger.
- Remove vertical dividers and boxed-cell geometry.
- Pair sequence number and title on one baseline.
- Use one column on mobile and two columns from tablet upward.
- Disable automatic hyphenation on capability labels.
- Define the intended subtle navy hairline token explicitly.

### Acceptance

- German checked at 320, 390, 768, and 1440px.
- English checked at 320 and 1440px.
- No horizontal overflow or broken capability words.
- No browser-console errors.

## P21 — repository cleanup

### Scope

- Remove every source module unreachable from App Router entry points.
- Remove the abandoned Scroll Story, formation, signal-diagram, glass-surface, and legacy section implementations.
- Remove the unused `framer-motion` dependency.
- Consolidate bilingual content into the four structures rendered by the current page.
- Remove unused content fields, migration aliases, CSS classes, CSS variables, and old design tokens.
- Remove the unused bridge image.
- Remove committed screenshots and documents that described abandoned redesign alternatives.
- Align contributor docs and project skills with the reachable code.

### Safety boundaries

- Do not change public wording while reorganising content.
- Keep the three approved images and supplied brand assets.
- Preserve routes, anchors, legal content, metadata, contact validation, mail delivery, and security headers.
- Do not deploy or commit without explicit user instruction.

## Final verification gate

Before release:

1. Confirm the import graph has no unreachable production modules.
2. Search for stale names from removed systems and for undefined CSS variables.
3. Run Prettier and `git diff --check`.
4. Run `npm run lint`.
5. Run `npm run typecheck`.
6. Run `npm run format:check`.
7. Run `npm run build`.
8. Verify `/de`, `/en`, legal pages, 404, navigation, contact links, and form validation in a real browser.
9. Check desktop, tablet, mobile, and reduced-motion behavior.

## Operational follow-ups

These remain external to the code cleanup:

- Verify the final production domain and `NEXT_PUBLIC_SITE_URL`.
- Configure and test the verified Resend sender and recipient.
- Have responsible counsel review the preserved imprint and privacy policy.
- Submit a production inquiry and confirm delivery and reply-to behavior.

## Next action

After the local verification gate passes, present the cleaned diff for approval. Publish to `main` only when the user explicitly requests it.
