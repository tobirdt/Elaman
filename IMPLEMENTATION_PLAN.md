# Elaman GmbH — Delivery & Implementation Plan

Authoritative execution plan for the Elaman website. It translates the approved brand direction, bilingual content blueprint, current codebase, and launch requirements into small, reviewable implementation slices.

**Status:** Active — brand foundation approved; detailed build programme ready
**Primary language:** German at /de; English remains a complete, switchable version at /en
**Current execution unit:** P11 — SEO, social, and performance hardening
**Planning rule:** One numbered slice per pull request where practical. Do not merge unrelated visual, copy, legal, or infrastructure changes into one slice.

---

## 1. Delivery outcome

The finished website must feel like an institutional, highly considered digital presence for a German communications and security engineering company:

- white-first, calm, precise, and technically credible;
- discreet in public wording, especially around observation, protection, and specialist capabilities;
- modern through composition, interaction quality, and technical diagrams — never through cyberpunk spectacle;
- coherent in German and English;
- usable on mobile, keyboard, reduced-motion, and touch-first contexts;
- production-ready in legal, contact-form, SEO, performance, and deployment terms.

The site is not a sales funnel, product catalogue, surveillance showcase, or generic SaaS landing page. It is a professional public-sector-facing company presence.

---

## 2. Sources of truth and conflict order

Read these documents before changing a visual section or any public string:

1. **CONTENT_BLUEPRINT.md** — factual source and bilingual copy baseline
2. **DESIGN_DIRECTION.md** — approved experience, image, and brand intent
3. **DESIGN_SYSTEM.md** — tokens, components, motion, accessibility rules
4. This plan — execution order, acceptance criteria, dependencies
5. **README.md** — development, contact-form, Vercel, and deployment operations

When a public wording conflict exists, use this order:

verified company fact → approved stakeholder wording → content blueprint → design direction → implementation convenience

No named customer, authority, certification, operation, product guarantee, or classified/discreet-handling claim is added without written approval.

---

## 3. Locked decisions

| Area                     | Decision                                                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Primary market language  | German first; / redirects to /de                                                                                                    |
| English                  | Full equivalent experience at /en, reachable through the language switch                                                            |
| Header                   | Elaman point mark only                                                                                                              |
| Wordmark                 | Full wordmark in hero and footer only                                                                                               |
| Typography               | Jost via next/font/google; no unlicensed Wix Futura reuse                                                                           |
| Primary visual system    | Point constellation, technical maps, bridge traces, system/process diagrams                                                         |
| Colour                   | White/soft-grey canvas; restrained graphite/deep-navy contrast; logo blue/red as precise accents                                    |
| Photography              | The Munich office photo is approved for contact context; the bridge visual is prepared but optional; total photo use remains sparse |
| Excluded imagery         | Eyes, animals, tunnels, hacker, globe, smart-city, neon-network, and generic cybersecurity stock                                    |
| Sensitive public wording | Contextual and discreet; knowledgeable audiences may recognise the subject matter without operational detail                        |
| Client context           | Police, BKA, ministries, and customer relationships remain background context unless publication approval is supplied               |
| Interaction              | Subtle; state-based; reduced-motion-safe; no continuous decorative animation                                                        |

---

## 4. Verified baseline

The project is not a blank redesign. The following functionality and components already exist and are the baseline for the next stages.

| Area                 | Current state                                                                                | Plan treatment                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Next.js app          | Next.js 16, React 19, Tailwind 4, Framer Motion                                              | Preserve architecture; no framework migration                                                |
| Locales              | /de, /en, German root redirect, alternate metadata                                           | Refine and test, do not rebuild                                                              |
| Header, hero, footer | Brand foundation approved: point mark, wordmark hierarchy, Jost, German-first routing        | Treat as accepted; polish only when a later regression requires it                           |
| Sections             | All eight homepage sections and technical visual primitives exist                            | Improve them one section at a time rather than replacing the page wholesale                  |
| Content model        | **lib/content/site.ts** carries EN/DE strings                                                | Keep languages in lockstep; revise sensitive wording before public launch                    |
| System interaction   | **SystemsSection** and **SystemMap** already provide a single-active detail pattern          | Audit semantics and refine disclosure behaviour instead of adding a second interaction model |
| Sticky lifecycle     | Desktop pinned narrative and mobile sequence exist                                           | Recalibrate breakpoint, motion, performance, and accessibility                               |
| Contact form         | Client validation, honeypot, server validation, Resend handler, best-effort rate limit exist | Production configuration and operational verification remain open                            |
| Legal                | Interim English imprint and German privacy route exist                                       | Locale-specific routes and counsel review are still a release gate                           |
| SEO                  | Metadata, sitemap, robots, manifest, organisation JSON-LD exist                              | Complete locale/legal metadata, OG imagery, and pre-launch audit                             |
| Assets               | Office and bridge images are locally optimised; current point mark is production SVG         | Replace with original vector artwork only when found; no design work is blocked              |

### Current constraints to preserve

- Use tokens from **lib/design/tokens.ts** and **app/globals.css**; do not introduce arbitrary hex colours.
- Compose from **components/ui**, **components/sections**, and existing motion primitives before adding abstractions.
- Preserve the contact honeypot and server-side validation.
- Treat .next as disposable build output. In the iCloud workspace, run clean validation from a fresh preview copy or clean generated duplicates before interpreting TypeScript errors as source failures.
- Do not add dependencies merely for a visual effect or a test that can be executed with existing tools.

---

## 5. Execution model

### Status vocabulary

| Status      | Meaning                                                                               |
| ----------- | ------------------------------------------------------------------------------------- |
| Complete    | Implemented, verified, and stakeholder-approved                                       |
| Ready       | Technically prepared; awaits its scheduled slice                                      |
| In progress | The only slice currently being changed                                                |
| Blocked     | Cannot proceed without a specific approval, legal input, asset, or configured service |
| Deferred    | Deliberately postponed; it does not block the next scheduled slice                    |

### Required evidence for every visual slice

1. Scope is limited to the current slice.
2. EN and DE are updated together if public copy changes.
3. Desktop and mobile preview are checked.
4. prefers-reduced-motion is not regressed.
5. Keyboard/focus behaviour is checked where an interaction changes.
6. Lint, typecheck, and production build pass in a clean validation environment.
7. Before/after screenshots or an equivalent preview record accompany the review.

### Git and review convention

- When Git work is requested, create one branch per slice using the codex/ prefix.
- Keep source, content, legal, and deployment configuration changes separate whenever possible.
- A Vercel preview deployment is the preferred review surface for a visual slice once the repository is pushed.
- Do not commit, push, or open a pull request until explicitly requested.

---

## 6. Programme map

| Order | Slice                                         | Status                         | Main result                                                                             | Gate                                           |
| ----- | --------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 00    | Programme hygiene and baseline record         | Complete                       | Accurate current-state audit and clean validation route                                 | None                                           |
| 01    | Editorial restraint and credentials           | Complete                       | Public tone calibrated; experience section becomes a stronger institutional proof point | Copy owner review                              |
| 02    | Services / capability composition             | Complete                       | Four service pillars become clearer and more refined without sales language             | None                                           |
| 03    | Lifecycle / approach experience               | Complete                       | Sticky desktop story and mobile sequence are robust and calm                            | Responsive and reduced-motion check            |
| 04    | Solutions disclosure                          | Complete                       | Accessible, discreet single-open system detail interaction                              | No operational detail beyond approved copy     |
| 05    | Protection contrast section                   | Complete                       | Distinct deep-navy moment with restrained public detail                                 | Sensitive wording review                       |
| 06    | Delivery methodology                          | Complete                       | Clear five-step delivery rail, visually connected to lifecycle                          | None                                           |
| 07    | Contact, footer, and image restraint          | Complete                       | Human Munich presence, factual contact, durable inquiry experience                      | Live email configuration needed for final test |
| 08    | Legal and locale routing                      | Blocked for final wording      | Locale-specific legal architecture and redirects                                        | Counsel/owner approval                         |
| 09    | Motion and interaction system                 | Complete                       | Final motion budget and state transitions                                               | Reduced-motion audit                           |
| 10    | Responsive accessibility pass                 | Complete                       | Device, touch, keyboard, screen-reader, contrast polish                                 | Test matrix                                    |
| 11    | SEO, social, and performance                  | **Next**                       | Search/social readiness and fast visual delivery                                        | Final domain decision                          |
| 12    | Form security and operations                  | Ready before launch            | Reliable inquiry delivery, spam posture, operational monitoring                         | Resend/Vercel setup                            |
| 13    | Staging, launch, and post-launch verification | Blocked until all gates clear  | Controlled public release                                                               | Legal, form, domain, stakeholder sign-off      |

---

## 7. Detailed implementation slices

### P00 — Programme hygiene and baseline record

**Status:** Complete, with an ongoing pre-commit check.

**Purpose:** Establish a truthful starting point before visual work continues.

**Completed**

- Read the design direction, content blueprint, design system, existing implementation plan, and README.
- Confirmed the eight-section marketing route is already implemented.
- Confirmed German-first routing, point-mark header, Jost typography, office asset usage, and the core preview/build path.
- Recorded the difference between source-level checks and stale generated .next files in the iCloud working directory.

**Still required before the first Git commit**

- Check repository index integrity and preserve any user-owned changes before staging.
- Run git status, git diff --check, and the full quality gate from a clean state.
- Confirm only intentionally imported assets are tracked.

**Exit criteria**

- A reviewer can identify what changed in the slice without relying on stale historical task statuses.

---

### P01 — Editorial restraint and credentials

**Status:** Completed — 2026-07-11.

**Purpose:** Make the public voice consistently institutional and discreet before additional visual depth is added.

**Scope**

- TrustSection and the experience anchor
- Relevant EN/DE strings in **lib/content/site.ts**
- **CONTENT_BLUEPRINT.md** only if approved public wording needs to be corrected
- Small supporting changes to SectionHeader or TechnicalMark only if they directly improve the section

**Tasks**

1. Audit all public strings mentioning observation, countermeasures, jamming, intelligence, forensics, law enforcement, or operational contexts.
2. Convert overly explicit product-language into capability-level, authorised-context language where the stakeholder direction requires discretion.
3. Retain the factual anchors: 20+ years, communications and security engineering, advice, implementation, training, after-sales support, public-authority context.
4. Keep audience groups as categories, never as a client list or logo wall.
5. Rebalance the trust layout so it reads as a calm evidence band rather than a metric-card sales section.
6. Use the point system as a subtle evidence/progress motif only; do not introduce a new decorative pattern.
7. Ensure the German version reads naturally in formal institutional German, not as a literal English translation.

**Non-goals**

- No certification badges without approval.
- No customer testimonials, project counts, or named references.
- No new image in this section unless a specific factual need is approved.

**Acceptance criteria**

- The section answers “why trust Elaman?” within one screen without making unsupported claims.
- Every metric is factual and source-aligned.
- The German/English content has equivalent meaning, hierarchy, and density.
- Desktop and mobile retain clear scanning order.

**Potential blocker**

- If a desired credential, certificate, client category, or claim cannot be sourced, it stays out.

---

### P02 — Services / capability composition

**Status:** Completed — 2026-07-11.

**Purpose:** Present the four established service pillars as a precise, equal-weight capability system.

**Scope**

- CapabilityOverview
- TechnicalMark where direct refinement is required
- siteContent.capabilities

**Tasks**

1. Keep the four-pillared structure: Beratung/Advice, Observation/Surveillance, Schutz/Protection, Training & Betreuung/Training & Support.
2. Make card hierarchy consistent: section number, mark, title, concise description, optional low-emphasis detail cue.
3. Refine whitespace, baseline alignment, hover/focus states, and mobile stacking.
4. Preserve equal visual importance; avoid a Bento or featured-product layout.
5. Ensure descriptions signal domains and professional support without exposing sensitive implementation details.
6. Test text wrapping with both German and English titles at compact widths.

**Acceptance criteria**

- A visitor can understand the four pillars without opening anything.
- No card reads as a purchasable product tile.
- The red accent appears as a controlled exception, not a promotional warning.

---

### P03 — Lifecycle / approach experience

**Status:** Completed — 2026-07-11.

**Purpose:** Make the procedural Vorgehen section the site’s most distinctive technical interaction without making it theatrical.

**Scope**

- ScrollStory
- DesktopScrollStory
- MobileStorySequence
- StickyStoryStage, StoryProgress, MobileStoryVisual
- siteContent.story

**Tasks**

1. Confirm the desktop pinned layout activates only at the documented wide-desktop threshold (≥1280px); tablet and mobile retain the unpinned sequence.
2. Ensure the mobile sequence remains a normal scroll flow with no pinned or excessive-height behaviour.
3. Review the six stages for the new discreet-public-language policy; keep the intent intelligible without operational disclosure.
4. Verify the progress calculation reaches the final step smoothly and never skips a stage at common viewport heights.
5. Reduce any visual movement that does not communicate stage change.
6. Ensure keyboard users can read the entire narrative in document order without relying on scroll position.
7. Test browser zoom, short laptop heights, touch scrolling, and reduced-motion preference.

**Acceptance criteria**

- Desktop interaction feels deliberate and stable, not like a presentation deck.
- Mobile remains fast, readable, and fully equivalent in information.
- Every stage appears without text overlap or clipped panel content.

**Risk**

- Scroll-linked experience is the highest interaction-risk area; it receives manual testing at all core breakpoints.

---

### P04 — Solutions disclosure

**Status:** Completed — 2026-07-11.

**Purpose:** Turn the existing system map into a fully accessible, discreet, single-open disclosure pattern.

**Scope**

- SystemsSection
- SystemMap
- types/site.ts and siteContent.systems only if the content model needs clarified short/long descriptions

**Tasks**

1. Keep one interaction model: accessible single-open accordion with an optional map as visual context.
2. Allow an active item to collapse; do not force one item to stay open if that harms expectations.
3. Preserve aria-expanded, aria-controls, labelled regions, focus visibility, and keyboard activation.
4. Audit whether every item title/description is appropriate for public visibility; move sensitive detail into neutral category wording.
5. Separate decorative SVG from the semantic controls so assistive technology gets a clean reading order.
6. Ensure the active system map node reflects the selected detail without requiring colour perception alone.
7. Test 8-item layout on mobile, tablet, and desktop for overflow, tap targets, and scroll position.

**Acceptance criteria**

- The control pattern works with mouse, touch, keyboard, and screen reader.
- One visitor action exposes one clear detail; nothing relies solely on animation.
- Solution descriptions show range and credibility without operating as a sensitive capability list.

---

### P05 — Protection contrast section

**Status:** Completed — 2026-07-11.

**Purpose:** Create the page’s selective deep-navy contrast moment while keeping the wording restrained and institutional.

**Scope**

- ProtectionSection
- siteContent.protection
- Dark-surface tokens only if a measured contrast adjustment is necessary

**Tasks**

1. Retain the dark surface as a single intentional pause in the scroll rhythm.
2. Rework public copy from equipment/product detail toward protective capability categories and authorised contexts.
3. Decide per card whether it belongs publicly at all; remove or generalise any item that is too operationally explicit.
4. Use blue/red only as state/structure accents; no glow, radar, scanning, threat, or command-centre aesthetic.
5. Audit white, muted text, borders, and focus states against WCAG contrast targets.
6. Keep card density lower than a catalogue; the section should communicate assurance, not inventory.

**Acceptance criteria**

- The section is visually memorable but not cinematic.
- Sensitive subject matter is implied professionally rather than advertised.
- Contrast remains readable at normal, high-contrast, and reduced-transparency settings.

**Required stakeholder check**

- The final public level of specificity for protection-related terms is approved before merge.

---

### P06 — Delivery methodology

**Status:** Completed — 2026-07-11.

**Purpose:** Make the delivery model a compact proof of process, tying advice to implementation, training, and after-sales support.

**Scope**

- DeliverySection
- ProcessRail
- siteContent.delivery

**Tasks**

1. Present five plain-language steps: analyse, design, integrate, train, support.
2. Tie the visual rail to the point/bridge system without repeating the sticky-story visual.
3. Maintain a readable horizontal relationship on desktop and sequential relationship on mobile.
4. Review German wording for formal, concise verb forms.
5. Avoid end-to-end platform, 360°, cutting-edge, or outcome promises.

**Acceptance criteria**

- The model can be scanned in seconds and understood without sales framing.
- It reinforces lifecycle content without duplicating it verbatim.

---

### P07 — Contact, footer, and controlled photography

**Status:** Completed — 2026-07-11.

**Purpose:** End the page with a credible Munich presence and an uncomplicated inquiry path.

**Scope**

- ContactSection, ContactForm, Footer
- public/images/elaman-munich-office.jpg
- Contact-related content in siteContent

**Tasks**

1. Keep the Munich office image as the only guaranteed photograph in the public experience; retain neutral grading and static presentation.
2. Review the crop at mobile, tablet, desktop, and high-density screens; the sign/reception must not dominate the layout.
3. Maintain factual address, phone, fax, email, and inquiry wording.
4. Keep the form’s client validation, server validation, honeypot, focus-first-error behaviour, and live status announcements.
5. Verify translated errors and helper content remain coherent with server-side error responses.
6. Ensure footer links, company details, and language-specific labels are correct.
7. Decide only at review time whether the bridge image adds value elsewhere; do not add it merely because it exists.

**Acceptance criteria**

- Contact is calm and factual; it makes no promise of a secure portal or classified communication.
- The office image supports credibility without becoming a decorative hero.
- All form fields are reachable, labelled, and usable on small touch screens.

---

### P08 — Legal architecture and locale routing

**Status:** Blocked for final copy approval; route architecture can be prepared earlier.

**Purpose:** Replace interim legal URLs with a consistent bilingual route model and verified legal copy.

**Target route model**

| Locale  | Imprint                                                                            | Privacy         |
| ------- | ---------------------------------------------------------------------------------- | --------------- |
| German  | /de/impressum                                                                      | /de/datenschutz |
| English | /en/imprint                                                                        | /en/privacy     |
| Legacy  | /imprint and /private-policy redirect permanently to the appropriate primary pages |

**Tasks**

1. Define locale-aware legal content types; preserve the approved current German content verbatim until counsel authorises changes.
2. Obtain an English privacy policy from counsel or a company-approved source; do not machine-paraphrase legal text into production.
3. Add locale-specific layouts, metadata, canonical URLs, alternates, sitemap entries, and legacy redirects.
4. Update Header/Footer legal links through the central content model.
5. Check all legal pages for long-text typography, mobile overflow, printing, and accessible headings.
6. Reconcile the privacy policy with actual hosting, contact form, email delivery, analytics, cookies, and embedded services.

**Release gate**

- No public production launch until the responsible owner/counsel confirms legal content and the actual data-processing model.

---

### P09 — Motion and interaction budget

**Status:** Completed — 2026-07-11.

**Purpose:** Make the experience feel expensive through restraint, not constant movement.

**Scope**

- components/motion
- Section-level transition classes
- app/globals.css motion tokens only when a token gap is demonstrated

**Tasks**

1. Inventory every motion path: section reveal, header, lifecycle, system disclosure, cards, photo entrance, form states.
2. Assign a purpose to each path: orientation, feedback, progress, or focus.
3. Remove any motion without a clear purpose.
4. Use only the shared fast, medium, slow, and easing tokens.
5. Keep images static after a one-time entrance reveal; no parallax spectacle.
6. Confirm the global reduced-motion mode removes transformation/animation without hiding content or breaking controls.

**Acceptance criteria**

- No perpetual decorative animation.
- No scroll-scale headline, bounce, particle, radar, scanning, or autoplay behaviour.
- Interaction feedback remains perceivable without motion.

---

### P10 — Responsive, accessibility, and content-resilience pass

**Status:** Completed — 2026-07-11.

**Purpose:** Make the site robust in the contexts most likely for public-sector visitors: locked-down browsers, laptops, tablets, mobile devices, keyboard use, and zoom.

**Required viewport matrix**

| Viewport    | Primary checks                                                                       |
| ----------- | ------------------------------------------------------------------------------------ |
| 320–390px   | Header, menu, German wrapping, form, office crop, accordion tap targets              |
| 640–768px   | Two-column transitions, language switch, system disclosure, mobile lifecycle         |
| 1024px      | Nav fit, desktop card grids, unpinned lifecycle sequence                             |
| 1280–1440px | Sticky lifecycle activation, full layout rhythm, long English copy, visual alignment |
| 1600px+     | Whitespace, container limits, image crop, no excessive line length                   |

**Tasks**

1. Check for horizontal overflow on every public and legal route.
2. Check heading hierarchy, landmarks, labels, alt text, visible focus rings, skip order, and screen-reader announcements.
3. Test language switching while a hash anchor is present.
4. Test navigation, mobile menu, accordion, contact form, tel/mail links, and legal links entirely by keyboard.
5. Test 200% browser zoom and system text scaling.
6. Check dark section contrast and form error contrast.
7. Run an automated accessibility scan where available, then manually validate the interaction-specific results.

**Acceptance criteria**

- No touch target smaller than 44×44px where interaction is intended.
- No route loses functionality with reduced motion, keyboard-only use, or mobile layout.
- German and English layouts remain equally considered.

---

### P11 — SEO, social, and performance hardening

**Status:** Next.

**Purpose:** Ensure the site is discoverable, accurately represented when shared, and fast without relying on marketing trackers.

**Scope**

- lib/seo/site.ts and lib/seo/structured-data.ts
- app/sitemap.ts, app/robots.ts, app/manifest.ts
- Page metadata and final social assets

**Tasks**

1. Verify German as the x-default locale and English/German hreflang alternates on all relevant pages.
2. Create a dedicated, restrained 1200×630 Open Graph asset from approved logo/brand geometry; do not use generic stock imagery.
3. Make social title, description, locale, and alt text language-specific where the framework supports it.
4. Review organisation JSON-LD fields for factual accuracy, including contact type and address language.
5. Finalise canonical production URL after the domain is confirmed.
6. Add final legal routes to sitemap and ensure legacy URLs do not compete as canonical content.
7. Verify robots, manifest start URL, favicon, and social preview rendering.
8. Audit image dimensions, sizes, loading priority, and unused public media.
9. Establish a performance budget: avoid unnecessary client code, defer nonessential code, and keep hero rendering lean.

**Acceptance criteria**

- /de and /en have correct locale, canonical, alternate, social, and title data.
- Social previews look like Elaman, not a raw logo export.
- No third-party analytics, map, font, or chat script is introduced without legal/privacy approval.

---

### P12 — Contact-form security and operations

**Status:** Ready before staging.

**Purpose:** Move the existing form implementation from code-complete to reliable production operation.

**Scope**

- app/api/contact/route.ts
- lib/validation/contact.ts
- lib/email/contact-email.ts
- Vercel and Resend configuration

**Tasks**

1. Configure RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, and NEXT_PUBLIC_SITE_URL only in local secrets/Vercel project settings — never in Git.
2. Verify the From domain/sender in Resend and verify replies reach the submitted sender address.
3. Test valid submission, missing/invalid fields, oversized request, malformed JSON, honeypot, missing configuration, Resend failure, and rate-limit response.
4. Assess whether in-memory rate limiting is sufficient for expected traffic; if not, choose a managed, auditable rate-limit control only with explicit approval and a justified dependency.
5. Confirm error logging contains no message body, sender email, or sensitive inquiry content.
6. Add Vercel firewall/rate-limit configuration only if it suits the expected operational risk and privacy stance.
7. Document the owner responsible for monitoring the receiving mailbox and responding to inquiries.

**Acceptance criteria**

- Valid staging inquiry reaches the designated mailbox with correct reply-to.
- Sensitive user input is not unnecessarily exposed in logs.
- Failure states remain understandable and do not claim delivery when it failed.

---

### P13 — Staging, launch, and post-launch verification

**Status:** Blocked until P08, P10, P11, and P12 gates clear.

**Purpose:** Publish deliberately with a reversible, evidence-based release process.

**Staging sequence**

1. Push the approved branch and inspect the Vercel preview deployment.
2. Set non-production Resend/contact configuration if a safe test recipient is available.
3. Run the complete visual, functional, accessibility, SEO, and form checklists below.
4. Freeze public copy, legal content, assets, and route structure for final stakeholder review.
5. Record known non-blocking limitations, if any.

**Production sequence**

1. Confirm final domain and NEXT_PUBLIC_SITE_URL.
2. Configure production secrets and verified sender.
3. Confirm legal sign-off.
4. Promote the reviewed deployment.
5. Verify HTTPS, redirects, canonical URLs, social preview, contact delivery, phone/email links, and legal routes live.
6. Retain the immediately prior production deployment as rollback point.

**Post-launch checks**

- Re-test key routes and the inquiry form after DNS/cache propagation.
- Confirm no unexpected errors in Vercel/Resend logs.
- Confirm indexed pages match the intended locale/route model.
- Review analytics only if explicitly approved and privacy-aligned.
- Schedule a lightweight content/legal review whenever services, tracking, contact routing, or public claims change.

---

## 8. Required stakeholder inputs and release gates

| Input / decision                                  | Needed by             | Blocks                                     | Current state                                           |
| ------------------------------------------------- | --------------------- | ------------------------------------------ | ------------------------------------------------------- |
| Original vector logo (SVG/AI/EPS)                 | Optional brand polish | Nothing; current SVG mark is usable        | Deferred until found                                    |
| Sensitive service wording                         | P01, P04, P05         | Public wording merge for affected sections | Direction confirmed; final strings need review          |
| Client names, logos, case studies, certifications | Credentials only      | Nothing; omit without approval             | Not approved / not needed                               |
| English privacy policy                            | P08                   | Production launch                          | Counsel/company input required                          |
| German legal route slugs                          | P08                   | Legal route release                        | Target proposed; needs confirmation                     |
| Analytics, cookies, maps, embeds                  | P08/P11               | Privacy and launch                         | Do not add until decision and legal review              |
| Final domain                                      | P11/P13               | Canonical/social production data           | Required before launch                                  |
| Resend sender and recipient                       | P12/P13               | Live inquiry delivery                      | Required before launch                                  |
| Bridge image use                                  | P07 or later          | Nothing                                    | Optional; decide only if it improves a specific section |

---

## 9. Quality gates

### Code and build

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
npm audit --omit=dev
```

If generated files in the iCloud workspace produce duplicate-type noise, rerun the quality gate in a clean temporary preview copy rather than changing source code to accommodate cache artefacts.

### Functional checks

| Area         | Required evidence                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Routing      | / redirects to /de; /de and /en render; invalid locale returns not found                        |
| Navigation   | Desktop nav, mobile menu, anchor offset, language switch, legal links                           |
| Interactions | System disclosure, lifecycle progression, buttons, hover/focus states                           |
| Contact      | Client validation, server validation, invalid payload, honeypot, configured successful delivery |
| Assets       | Logo, point mark, office image, favicon, responsive images                                      |
| Legal        | All final locale routes, redirects, canonical/alternate metadata                                |

### Accessibility checks

| Check     | Minimum standard                                                                    |
| --------- | ----------------------------------------------------------------------------------- |
| Keyboard  | Every interactive element operable and visibly focused                              |
| Semantics | One H1 per page; logical landmarks/headings; labelled regions                       |
| Motion    | No essential content depends on animation; reduced-motion works                     |
| Contrast  | Text, focus, errors, and dark section meet accessible contrast                      |
| Forms     | Labels, errors, focus restoration, live status messages work                        |
| Images    | Meaningful imagery has appropriate alternative text; decorative graphics are hidden |

### Visual checks

- White-first rhythm remains calm at all breakpoints.
- Point mark appears as a system, never as wallpaper.
- Red accent remains sparse and meaningful.
- No generic cybersecurity imagery, bento grid, glow, or SaaS treatment appears.
- Section transitions are intentional; no two adjacent sections feel visually identical without reason.
- German copy does not look compressed or secondary to English.

---

## 10. Risks and mitigations

| Risk                                                       | Level      | Mitigation                                                                              |
| ---------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| Sensitive capabilities are too explicit publicly           | High       | P01/P04/P05 wording review; capability-level language; stakeholder approval             |
| Legal/privacy text does not match production behaviour     | High       | Counsel gate; no unapproved tracking; verify Resend/form/hosting data flow              |
| Contact form appears to work but delivery fails            | High       | Staging delivery test with configured Resend before launch                              |
| Visual work becomes generic or over-animated               | Medium     | Design-system guardrails; per-slice screenshot review; motion budget                    |
| New claims drift from verified source facts                | Medium     | Blueprint-first content changes; no client/certification claims without approval        |
| Sticky lifecycle fails on tablet or short desktop heights  | Medium     | Breakpoint matrix; progressive mobile fallback; reduced-motion checks                   |
| Local iCloud build cache produces false errors             | Medium     | Clean temporary validation environment; never edit source to satisfy stale .next output |
| Asset use becomes decorative or legally ambiguous          | Low–medium | Use only approved assets; record source; one-to-three-photo budget                      |
| SEO metadata diverges across locales                       | Medium     | Metadata/alternate/sitemap audit as a dedicated slice                                   |
| Scope expands to CMS, portal, authentication, or analytics | Medium     | Treat as a separately approved project; not part of this delivery plan                  |

---

## 11. Definition of done

The website is ready for production only when all of the following are true:

1. The stakeholder approves the final German and English visual experience.
2. Public copy is discreet, factual, bilingual, and legally safe.
3. No unapproved client, authority, certificate, or operational claim is visible.
4. All homepage sections meet their individual acceptance criteria.
5. Contact delivery works in the production configuration and has been tested end-to-end.
6. Legal content, locale routes, redirects, and privacy representation are approved.
7. Lint, typecheck, formatting, build, and dependency audit pass from a clean environment.
8. Desktop, tablet, mobile, keyboard, reduced-motion, and accessibility checks pass.
9. Metadata, social preview, sitemap, robots, canonical URLs, and production domain are correct.
10. The live deployment has a verified rollback path and a post-launch check has been completed.

---

## 12. Immediate next action

Begin **P01 — Editorial restraint and credentials**:

1. Create a focused source/blueprint wording audit for the public-sensitive sections.
2. Propose the exact German and English copy adjustments before changing the interface.
3. Implement the credentials-section composition and verify it in preview.
4. Present the result for review before moving to P02.

No other section will be redesigned in the same implementation slice.
