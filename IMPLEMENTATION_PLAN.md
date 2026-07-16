# Elaman GmbH — Heritage Modernisation Implementation Plan

Authoritative execution plan for the approved reconstruction of the former Elaman homepage as a modern, bilingual Next.js experience.

**Status:** Published to `main` and verified on the Vercel production alias. Live mail delivery, final-domain wiring, and counsel-controlled legal review remain operational follow-ups.

**Primary language:** German at `/de`; English remains complete at `/en`

**Current execution unit:** P19 — complete; operational follow-ups are tracked separately

**Planning rule:** Keep visual, content, legal, and deployment work reviewable. Do not mix unapproved claims or infrastructure changes into a design slice.

This plan supersedes the earlier eight-section visual programme. The stakeholder explicitly approved a shorter reconstruction that preserves the former site’s layout, imagery, section rhythm, and text hierarchy while modernising typography, responsiveness, accessibility, and implementation quality.

---

## 1. Delivery outcome

The homepage should be immediately recognisable as the successor to the former Elaman website:

- compact white header with the complete Elaman wordmark;
- close-cropped advice image beside the Elaman introduction;
- deep-navy company and capability field;
- tiger image band introducing the protection composition;
- factual protection information on paper;
- Munich office image, direct contact information, and a navy inquiry field;
- compact factual footer.

The result remains an institutional public-sector-facing company presence. It is not a sales funnel, product catalogue, surveillance showcase, or generic cybersecurity landing page.

“Faithful reconstruction” refers to composition, image choice, order, and recognisable brand rhythm. It does not mean reproducing obsolete typography, fixed desktop dimensions, inaccessible form patterns, unsafe claims, or the excessive empty space visible in the old capture.

---

## 2. Sources of truth

Use this order:

1. **CONTENT_BLUEPRINT.md** — factual claims and bilingual copy
2. **app/(marketing)/[locale]/page.tsx** — active homepage composition
3. **app/globals.css** and **lib/design/tokens.ts** — canonical visual tokens
4. **lib/motion/presets.ts** — canonical motion tiers
5. **DESIGN_DIRECTION.md** — approved heritage-modernisation intent
6. **DESIGN_SYSTEM.md** — implementation rules and active component vocabulary
7. This plan — delivery state, remaining gates, and release order
8. **README.md** — local development and deployment operations

For visual and motion behaviour, current code wins over prose. When code and documentation drift, verify the implementation and update the documentation in the same change.

Public wording follows:

verified fact → CONTENT_BLUEPRINT.md → approved stakeholder wording

Do not add named customers, authorities, certifications, guarantees, or operational claims without publication approval. Do not paraphrase legal copy without counsel approval.

---

## 3. Locked decisions

| Area               | Approved decision                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Market language    | German first; `/` redirects to `/de`                                                                   |
| English            | Complete equivalent experience at `/en`                                                                |
| Header             | Complete official Elaman wordmark in a compact white header                                            |
| Hero               | Responsive 50/50 advice photograph and factual Elaman introduction                                     |
| Typography         | Geist and Geist Mono only                                                                              |
| Palette            | Paper, paper-soft, graphite, Elaman blue, protection red, and navy tokens only                         |
| Structure          | Four visible compositions: hero, company/portfolio, protection, contact                                |
| Navigation         | DE: Start, Beratung, Observation, Schutz, Kontakt; EN: Home, Advice, Surveillance, Protection, Contact |
| Photography        | The supplied advice, tiger, and Munich office images are approved heritage assets                      |
| Additional imagery | No further stock or generic cybersecurity imagery without explicit approval                            |
| Dot geometry       | Shared formation library remains available; no standalone homepage DotMatrix is required               |
| Public wording     | Discreet, factual, and capability-level; sensitive customer context stays private                      |
| Motion             | One-time hero entrance and restrained state feedback; no homepage scroll-scrub system                  |
| Contact            | Inquiry form, never a secure portal; honeypot and server validation remain mandatory                   |

The user confirmed that the supplied heritage images are licensed for use.

---

## 4. Active homepage architecture

The route renders this fixed order:

| Anchor        | Component            | Responsibility                                                                                    |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| `#hero`       | `HeroSection`        | Advice image, Elaman H1, original trust tagline, verified company introduction, experience anchor |
| `#experience` | `CapabilityOverview` | Navy company statement and integrated eight-field portfolio index                                 |
| `#systems`    | internal anchor      | Navigation target within the portfolio index                                                      |
| `#protection` | `ProtectionSection`  | Tiger band, original bridge-to-trust line, protection copy, four ruled capability groups          |
| `#contact`    | `ContactSection`     | Munich office band, direct contact row, navy inquiry field                                        |
| footer        | `Footer`             | Company address, legal links, copyright                                                           |

Trust, approach, systems, delivery, training, and support data remains available in the content model. It is consolidated into the visible compositions instead of appearing as repetitive standalone screens.

---

## 5. P14 — Heritage layout modernisation

**Status:** Complete locally.

### Purpose

Recreate the former homepage’s recognisable composition using the current Next.js architecture and the approved Precision Dossier tokens.

### Implemented scope

#### Header and navigation

- Replaced the point-only header mark with the supplied complete wordmark.
- Preserved sticky navigation, active-anchor state, mobile disclosure, language switching, and keyboard operation.
- Restored the former site’s five navigation concepts in German and English.

#### Hero

- Rebuilt the introduction as a responsive split composition.
- Added the supplied advice image with a deliberate eye-focused crop.
- Restored “Elaman” as the primary heading and retained the original trust-and-security positioning.
- Kept verified experience copy and one factual 20+ years figure.
- Removed sales-style calls to action from the opening composition.

#### Company and portfolio

- Consolidated company positioning, trust, advice, systems, training, delivery, and support into one navy field.
- Reconstructed the former eight-capability overview as a ruled typographic index.
- Avoided icon tiles, cards, unsupported claims, and catalogue language.

#### Protection

- Added the supplied tiger image as a static full-width transition band.
- Retained protection as the page’s principal red semantic moment.
- Reframed the detailed content as four factual, discreet capability groups.
- Kept the public language recognisable to informed audiences without naming sensitive customers or operations.

#### Contact and footer

- Added the supplied Munich office image as a static section band.
- Exposed factual address, phone, and email links directly.
- Rebuilt the form as a responsive white panel on navy.
- Preserved labels, validation, honeypot, server handling, focus behaviour, and live status messaging.
- Simplified the footer to the former site’s compact factual ending.

#### Content and localisation

- Updated German and English together.
- Retained safe factual content instead of restoring unsourced superlatives from the former page.
- Kept legal content and legal routes unchanged.

#### Motion and accessibility

- Uses only canonical reveal/entrance tiers and the signature easing.
- Animates transform and opacity only.
- Keeps hero stagger within the approved budget.
- Reduced motion renders the final hero state immediately.
- Photographic bands remain static.
- No scroll-linked homepage animation was introduced.

### Explicitly excluded

- Literal reuse of old claims such as “global leader,” “second to none,” or equivalent unsupported superiority statements.
- Named authority/customer references.
- New product promises, certification badges, metrics, or client logos.
- Additional stock imagery.
- Glassmorphism, gradients, glows, grid overlays, bento layouts, icon-card grids, or cyberpunk effects.
- Legal rewrites, analytics, CMS, portal, authentication, or CI changes.

---

## 6. Release acceptance evidence

### Automated

- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run format:check` passes.
- `npm run build` passes with the Next.js production build.
- `npm audit` and `npm audit --omit=dev` report no vulnerabilities.
- German and English routes render.
- Image assets resolve with valid intrinsic dimensions.
- No horizontal overflow at the tested mobile, tablet, and desktop widths.

### Browser and responsive

Verified in the production preview:

| Context                      | Result                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| German 320–1440 px           | Correct hierarchy, crops, section rhythm, and no overflow                                                     |
| English 320–1440 px          | Equivalent content hierarchy and no overflow                                                                  |
| Tablet 768 and 1024 px       | Stable split/stack transitions, readable portfolio, and usable contact form                                   |
| Legal routes 390 and 1440 px | Readable long headings, correct landmarks, and no overflow                                                    |
| Keyboard and mobile menu     | Skip link, focus order, Escape, focus return, active anchors, and language switch work                        |
| Contact form                 | Client/server validation, honeypot, oversized payload, provider error, rate limit, and success state verified |
| Reduced motion               | Hero copy is immediately visible; smooth scrolling and nonessential movement are disabled                     |
| Console and hydration        | No application errors, warnings, or hydration failures                                                        |
| Accessibility                | Automated WCAG scans report zero violations on both locales and legal routes                                  |
| Lighthouse mobile            | Performance 95, Accessibility 100, Best Practices 100, SEO 100                                                |
| Lighthouse desktop           | Performance 100, Accessibility 100, Best Practices 100, SEO 100                                               |

### Visual record

The review images are stored under:

- `output/playwright/heritage-modern/de-desktop.png`
- `output/playwright/heritage-modern/de-mobile.png`
- `output/playwright/heritage-modern/en-mobile.png`

---

## 7. Release programme

| Order | Slice                              | Status                   | Result                                                                | Remaining follow-up                |
| ----: | ---------------------------------- | ------------------------ | --------------------------------------------------------------------- | ---------------------------------- |
|    14 | Heritage layout modernisation      | Complete                 | Recognisable modern reconstruction                                    | None                               |
|    15 | Visual and bilingual copy sign-off | Complete                 | Approved crops, density, and discreet public wording                  | None                               |
|    16 | Legal and locale routes            | Existing routes verified | Current legal pages remain accessible and technically sound           | Counsel review of final wording    |
|    17 | Contact operations                 | Technical QA complete    | All form paths verified without sending real test mail                | Add Vercel mail environment values |
|    18 | SEO and performance                | Technical audit complete | Metadata, sitemap, robots, manifest, JSON-LD, images, and CWV audited | Final domain and social preview    |
|    19 | Main and production release        | Complete                 | Reviewed tree published to `main` and verified on Vercel              | None                               |

The earlier P01–P13 visual sequence is superseded. Its legal, form, SEO, accessibility, and release concerns remain represented in P15–P19.

---

## 8. P15 — Visual and bilingual copy sign-off

**Status:** Complete. The stakeholder approved the visual direction, bilingual presentation, discreet wording, and release to `main` after final QA.

### Review points

1. Confirm the desktop hero crop and the stacked mobile crop.
2. Confirm the compact header wordmark scale.
3. Confirm the eight portfolio labels in German and English.
4. Confirm the public specificity of the four protection groups.
5. Confirm the tiger and Munich office band crops.
6. Confirm that retaining safe current copy instead of the former page’s superlatives is acceptable.
7. Review desktop and mobile captures side by side.

### Acceptance

- The stakeholder recognises the former site’s identity and approves the modernised density.
- German and English express equivalent meaning.
- No sensitive, unsupported, or legally risky claim is introduced.

---

## 9. P16 — Legal and locale routes

**Status:** Existing routes are technically verified and remain unchanged. Substantive legal wording and any future locale-specific route migration remain counsel-controlled follow-ups.

Target model:

| Locale  | Imprint                                                  | Privacy                                                  |
| ------- | -------------------------------------------------------- | -------------------------------------------------------- |
| German  | `/de/impressum`                                          | `/de/datenschutz`                                        |
| English | `/en/imprint`                                            | `/en/privacy`                                            |
| Legacy  | Permanent redirects only after final routes are approved | Permanent redirects only after final routes are approved |

Do not machine-paraphrase legal text into production. Reconcile the privacy policy with the actual host, inquiry form, email provider, analytics, cookies, and embeds.

---

## 10. P17 — Contact operations

**Status:** Client and server behaviour is QA-complete. Real outbound delivery remains pending until the production environment values and verified sender domain are supplied.

Required environment variables:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

Required checks:

1. Verify the sender domain and receiving mailbox.
2. Test a successful staging inquiry and reply-to.
3. Test client validation, server validation, malformed payload, honeypot, provider failure, and rate-limit responses.
4. Confirm that logs do not expose message bodies or sender details unnecessarily.
5. Assign an owner for the receiving mailbox.

---

## 11. P18 — SEO, social, and performance

**Status:** Technical audit complete. Final custom-domain wiring and a dedicated social preview asset remain operational follow-ups.

Tasks:

1. Verify German as x-default and validate canonical/hreflang output.
2. Create a restrained 1200×630 social image from approved brand material.
3. Finalise the canonical site URL after the domain decision.
4. Validate metadata, sitemap, robots, manifest, and organisation JSON-LD.
5. Audit responsive image output, loading priority, client JavaScript, and Core Web Vitals.
6. Add no tracker, map, font, chat, or embedded service without explicit privacy approval.

---

## 12. P19 — Staging and production

**Status:** Published to `main` and verified at `https://elaman-alpha.vercel.app` on mobile, tablet, and desktop viewports.

### Staging

1. Isolate the intended source changes from any unrelated worktree changes.
2. Commit and push only the approved scope.
3. Inspect the Vercel preview at desktop, tablet, mobile, keyboard, and reduced-motion settings.
4. Test staging inquiry delivery.
5. Freeze approved copy, assets, legal text, and route structure.

### Production

1. Confirm the final domain and production environment variables.
2. Confirm legal and stakeholder sign-off.
3. Promote the reviewed deployment.
4. Verify HTTPS, redirects, canonical URLs, social preview, contact delivery, phone/email links, and legal pages.
5. Retain the previous production deployment as a rollback point.

---

## 13. Required inputs and release gates

| Input / decision                   | Needed by       | Blocks                                     | State                                            |
| ---------------------------------- | --------------- | ------------------------------------------ | ------------------------------------------------ |
| Visual and bilingual copy approval | P15             | Approved release candidate                 | Approved                                         |
| Sensitive service wording approval | P15             | Protection wording sign-off                | Approved in its current discreet form            |
| English privacy policy             | P16             | Production launch                          | Counsel/company input required                   |
| Final legal route model            | P16             | Legal-route release                        | Proposed, not approved                           |
| Analytics/cookies/embeds decision  | P16/P18         | Privacy representation                     | Do not add until approved                        |
| Final domain                       | P18/P19         | Custom-domain production data              | Follow-up; Vercel production alias is deployable |
| Resend sender and recipient        | P17/P19         | Live inquiry delivery                      | Follow-up; code fails safely until configured    |
| Original vector wordmark           | Optional polish | Nothing; current supplied raster is usable | Deferred until found                             |

Client names, logos, case studies, and certifications remain omitted unless separately approved.

---

## 14. Quality gates

### Code

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
npm audit --omit=dev
```

### Functional

- `/` redirects to `/de`.
- `/de` and `/en` render with correct locale content.
- Desktop navigation, mobile menu, anchors, and language switch work.
- Telephone, email, form, and legal links remain usable.
- Client and server form validation, honeypot, and error handling remain intact.

### Accessibility

- One H1 and logical landmarks/headings.
- Every interactive element is keyboard-operable and visibly focused.
- Form controls have persistent labels and associated errors.
- Meaningful imagery has localised alternative text; decorative imagery is hidden.
- No essential information depends on animation.
- Reduced motion disables nonessential movement.
- No horizontal overflow at supported widths.

### Visual

- Compact white wordmark header.
- Correct split hero and image crop.
- Navy company/portfolio field.
- Static tiger and office bands.
- Protection red appears once as a semantic signal.
- No new colours, fonts, gradients, glows, stock assets, or generic SaaS patterns.
- German and English feel equally considered.

---

## 15. Definition of done

The website is production-ready only when:

1. The stakeholder approves the final German and English experience.
2. Public copy is factual, discreet, bilingual, and legally safe.
3. No unapproved authority, customer, certification, guarantee, or metric is visible.
4. The complete quality gate passes from a clean environment.
5. Desktop, tablet, mobile, keyboard, zoom, and reduced-motion checks pass.
6. Contact delivery works in production configuration.
7. Legal text and routes are approved.
8. Metadata, sitemap, robots, social preview, canonical URLs, and domain are correct.
9. The reviewed deployment has a rollback path and receives post-launch verification.

---

## 16. Immediate next action

Configure the verified Resend sender/recipient values before treating live inquiry delivery as operational. Final custom-domain wiring and counsel review of the inherited legal copy remain separate owner-controlled follow-ups.
