# Elaman design system

Implementation contract for the current production website. `app/globals.css`, `lib/design/tokens.ts`, and reachable components are the final source of truth.

## 1. Design thesis

Elaman presents as an established German security-technology specialist through restraint: disciplined typography, four approved photographs, selective navy, local hairlines, factual copy, and one dominant idea per composition. The five-section homepage provides orientation; two editorial dossier pages provide depth without becoming a catalogue; the contact page carries the inquiry form in the same editorial language. The site intentionally avoids a decorative technical interface.

## 2. Design direction

**Experience statement.** The site should feel like the carefully modernised digital presence of an established German specialist company: direct, calm, discreet, and technically credible. The homepage gives a clear overview; two focused dossiers and a contact page provide additional substance. Recognisable content and supplied photography remain, while hierarchy, whitespace, responsive composition, and accessible interaction are contemporary. The objective is confidence, not conversion theatre — each desktop viewport communicates one dominant idea, and mobile/short displays retain the same order without clipping.

**Photography roles.** Four supplied images create the site rhythm, each with one structural role: the chameleon macro opens the hero; the stone bridge grounds the Profile section and the Company dossier's bridge composition; the Media Mining photograph carries the navy Systems section and dossier hero; the Munich office photograph carries the homepage Contact section and is the hero image on both the Company dossier and the contact page. Route-specific social crops (`*-og.jpg`) are derivatives of this same set, never new motifs.

**Content tone.** Factual, concise, and human. Professional without bureaucratic filler. Discreet enough for the sector — no named clients or operational specifics. No invented claims, certifications, or statistics. German is composed as a primary language, not a translation afterthought. Exactly one visible `25+` statement is enough.

**Anti-direction.** Do not reintroduce an abandoned alternative through code or documentation. The current site has no Scroll Story, DotMatrix decoration, signal map, technical grid, glass panel, floating card, diagram system, scroll-snap, or Framer Motion layer. It also has no place for cyberpunk imagery, a secure-portal claim, or sales-funnel urgency. See § 9 (Prohibited patterns) for the enforced list.

## 3. Canonical tokens

### Colour

| CSS token                |     Value | Use                            |
| ------------------------ | --------: | ------------------------------ |
| `--color-paper`          | `#ffffff` | Main canvas                    |
| `--color-paper-soft`     | `#f7f8fa` | Quiet contrast                 |
| `--color-graphite`       | `#16181d` | Primary ink                    |
| `--color-graphite-muted` | `#555d6b` | Body copy                      |
| `--color-graphite-soft`  | `#667286` | Labels and metadata            |
| `--color-elaman-blue`    | `#244074` | Brand and active state         |
| `--color-elaman-red`     | `#d83034` | Required and error form states |
| `--color-navy`           | `#172033` | Systems composition            |
| `--color-on-dark`        | `#f7f8fa` | Primary on navy                |
| `--color-on-dark-muted`  | `#c7d0dc` | Secondary on navy              |

### Structure

| Token                      |                                Value | Use                              |
| -------------------------- | -----------------------------------: | -------------------------------- |
| `--border-hairline`        |             `rgba(22, 24, 29, 0.12)` | Default paper rule               |
| `--border-hairline-strong` |             `rgba(22, 24, 29, 0.24)` | Strong paper rule and fields     |
| `--border-on-navy`         |          `rgba(255, 255, 255, 0.14)` | Subtle navy rule                 |
| `--radius-card`            |                           `0.125rem` | Content/form surface when needed |
| `--radius-control`         |                           `0.375rem` | Controls                         |
| `--shadow-overlay`         | `0 16px 48px rgba(22, 24, 29, 0.12)` | Mobile navigation only           |

No ordinary content shadow, glass surface, gradient surface, or alternative radius is part of the system.

### Layout

| Token                      |                                            Value |
| -------------------------- | -----------------------------------------------: |
| `--container-page`         |                                          `80rem` |
| `--container-content`      |                                          `64rem` |
| `--container-copy`         |                                          `42rem` |
| `--container-narrow`       |                                          `30rem` |
| `--container-legal`        |                                          `56rem` |
| `--page-x`                 |                      `clamp(1.25rem, 4vw, 4rem)` |
| `--page-x-left`            |  `max(var(--page-x), env(safe-area-inset-left))` |
| `--page-x-right`           | `max(var(--page-x), env(safe-area-inset-right))` |
| `--section-screen-min`     |         `calc(100vh - var(--header-h))` fallback |
| `--section-y-screen`       |                      `clamp(3rem, 6svh, 5.5rem)` |
| `--section-y-content-band` |                    `clamp(3.75rem, 6vw, 5.5rem)` |
| `--section-y-legal-page`   |                   `clamp(2.75rem, 5vw, 4.25rem)` |
| `--section-y-page-header`  |                    `clamp(3rem, 5.5vw, 4.75rem)` |
| `--media-band-h`           |                     `clamp(15rem, 40svh, 27rem)` |
| `--section-y-closing`      |                    `clamp(2.75rem, 4vw, 3.5rem)` |

`.section-screen` upgrades its minimum height to a `100svh`-based value when supported (`@supports (height: 100svh)`). The property is applied directly rather than inside a custom-property declaration, because the production CSS compiler may strip `svh` there.

### Typography

- Geist: all editorial and interface copy.
- Geist Mono: sequence indices and concise technical labels.
- Display: `--type-display` (`clamp(3rem, 7.2vw, 6rem)`, rising to a fixed `7rem` at `min-width: 1536px`) with `--leading-display` and `--tracking-display`.
- Dossier H1: `--type-h1` on narrow screens and `--type-h2` in split desktop heroes so long German compounds retain their full form without crossing the image boundary.
- Section heading: `--type-h2` (`clamp(1.8rem, 4.1vw, 3.75rem)`) with `--leading-title` and `--tracking-title`; the mobile minimum keeps long German compounds intact.
- Subheading: `--type-h3` for subordinate editorial titles. The hero tagline additionally steps up to `2.25rem` at `2xl`.
- Long-form marketing copy: at least `--type-body` with `--leading-body` and a bounded `ch` measure.
- Interface labels and compact metadata may use `--type-small` or `--type-micro`.
- `text-balance` is for headings, not paragraph columns.

Do not add a font, a local heading clamp, undersized long copy, or arbitrary decorative tracking.

## 4. Component contracts

### Container

`Container` owns safe-area-aware page gutters and maximum width. Supported sizes are `page`, `content`, `copy`, `narrow`, and `legal`.

### Section

`Section` owns section mode and tone via `lib/design/tokens.ts`'s `SectionMode`:

- `screen`: minimum visible height below the sticky header, used only by the homepage `HeroSection`. Nothing below the homepage may claim the full first screen;
- `content-band`: the ordinary band, and the only mode any section below a hero uses;
- `legal-page`: legal/document rhythm.

Supported tones are `plain`, `white`, and `soft`. A band's height follows its content: the retired `feature` mode centred content inside a minimum height, which left between 54 and 281 pixels of air above a heading depending on how much copy a section happened to carry. Fixed padding gives one rhythm instead.

### SectionIntro and SectionLabel

`SectionIntro` opens every section below a page header: label, `h2`, optional lead, built like `PageHeader` and therefore on the same left edge. A section never composes its own heading block, and never places its label in a column beside the heading.

`SectionLabel` is the one way a section names itself: Geist Mono, uppercase, house blue, directly above the heading. There is no second treatment. A rule without text, a large grey word and a heading with no label at all each made the same role look like a different one.

Do not add decorative numbering; numbering is reserved for genuine ordered processes and ledgers.

### ClosingBand

How the homepage and both dossiers end: one sentence and one `TextLink`, on navy, across the full width. It is the only place navy carries a band of text, which gives the colour a single job and every page the same closing beat. The contact route and the legal documents have none; they are the destination.

### PageHeader

The opening band of every page below the homepage: company, systems, contact, imprint, privacy policy, and the error page. It is the single most important consistency device on the site, so it takes no tone, width, or alignment options.

- Always `--surface-paper`, always on the `page` container, always closed by a hairline.
- Always the same four slots in the same order: breadcrumb, mono label, `h1`, optional lead. An optional `actions` slot carries a button, and only the error page uses it.
- Padding is `--section-y-page-header`, a fixed clamp rather than a share of the viewport, so the `h1` starts at the same left edge and the same height on every subpage. The band's own height follows its content.
- The `h1` is one step, `--type-h2`, on every subpage. The larger `--type-h1` and `--type-display` steps belong to the homepage. A legal page must never carry a bigger title than a content page.
- `PageHeader` reads the breadcrumb strings from `lib/content/site.ts` itself; callers pass only the locale and the page's own short name.

### Breadcrumb

Two steps, `Start`/`Home` linked and the current page as plain text with `aria-current="page"`, separated by a slash that is hidden from assistive technology. It replaced the former "back to the homepage" link, which said how to leave but never said where the visitor was. Every subpage carries one, including the legal and error pages, where the header shows no active navigation item.

### MediaBand

The full-bleed photograph that follows a `PageHeader` on a page that has one. Fixed height (`--media-band-h`), `100vw`, closed by a hairline. The `navy` tone sets the house colour behind the picture and lays a light tint over it; it is the only full-bleed dark surface below the homepage and belongs to the systems page. No text ever sits on a media band, so the tint stays a tint and never becomes a scrim.

### Header

- Sticky white header with the supplied points-only Elaman signet.
- The signet is the desktop home action; the desktop navigation exposes Company, Systems, and Contact.
- All three are real pages of their own; the menu contains no anchors, and the header runs no scroll observation. Only the hairline under the header reacts to scrolling.
- Mobile prepends Start / Home and keeps the same global destinations below it.
- One blue rule communicates hover and the current page, matched on the exact path (`aria-current="page"`).
- Mobile navigation is the only raised overlay. It fills the available height below the header, locks the document while open, keeps legal and locale actions at the end, and traps keyboard focus.
- Escape and outside-pointer behavior remain intact.
- The locale switch on the homepage falls back to preserving a hash (a leftover accommodation, not a current in-page anchor); every other route passes an explicit reciprocal-route href, so the language switch always lands on the matching localised page.

### Footer

Identical on every route: three columns (Navigation, Contact, Legal) that collapse to two at `sm` and one below it, followed by a hairline-separated row with the copyright and the locale switch. Navigation repeats the header's destinations, including the Home/Start entry the header only shows on mobile. Column titles are Geist Mono micro labels; links keep a 44px target. No box, no shadow, no repeated address block beyond the one contact column.

### Button

Variants are `primary`, `secondary`, and `ghost`; shapes are `control` and `pill`. Primary actions use graphite and turn Elaman blue on hover. All controls retain visible focus and at least 44px touch height.

### TextLink

`TextLink` is the shared editorial route link for homepage-to-dossier and dossier-to-contact transitions. It uses a local hairline and a small directional arrow; only the arrow translates on hover.

### DetailDossier

Switches on `content.kind` (`company` | `systems`) to render the Company or Systems dossier composition (§ 8). Both open with `PageHeader` and a `MediaBand`, and both close with a `DetailClosing` band (heading plus a `TextLink` to the contact page).

### ContactPage

The contact-route composition (§ 8a): `PageHeader`, then one content band pairing a ruled `dl` of direct contact facts with the `ContactForm`. It carries no photograph; the form is the content, and the office picture already opens the company page.

## 5. Homepage section contracts

### HeroSection

- Chameleon image and copy use a 50/50 desktop split.
- Header plus hero equal one normal viewport (`variant="screen"`).
- Mobile stacks naturally and may grow on short displays.
- The image is the sole LCP asset.
- Company positioning begins in Profile; the hero contains no service paragraph.
- `25+` appears exactly once.

### ProfileSection

- Text band on white (`variant="content-band"`), opened by `SectionIntro`.
- The stone-bridge photograph follows as a full-width `MediaBand`, not beside the copy.
- Body copy is left aligned and bounded to 62ch.
- The managing director is named on the company page only; printing the same reference twice was one of the duplicates this composition removed.

### AdviceSection

- Paper-soft text band, opened by `SectionIntro`.
- Semantic ordered list with the four fixed stage names and their numerals. No descriptions: the company page tells the stages at length, and printing both meant reading the same four paragraphs twice.
- One `TextLink` to the company page closes the section.
- Desktop uses four columns, mobile one natural sequence. No cards, icons, or enclosed cells.

### SystemsSection

- White text band, opened by `SectionIntro`.
- The five approved areas as a plain two-column list, names only, flowing down the first column before the second (`sm:grid-flow-col sm:grid-rows-3`) so the list reads in its real order.
- No numerals and no rules here: the systems page sets the same five as a numbered ledger with descriptions, and when the homepage matched that treatment the subpage read as a repeat rather than the detail.
- One `TextLink` to the systems page closes the section.

### Homepage close

The homepage ends in the shared `ClosingBand`. It carries no contact details: the footer repeats address, phone and email one screen further down, and the same three facts twice in one view is the repetition the content blueprint rules out.

## 6. Approved photography

| Asset                                     | Role                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| `/images/elaman-advice.jpg`               | Hero                                                         |
| `/images/elaman-profile-bridge.jpg`       | Profile, Company dossier bridge composition                  |
| `/images/elaman-systems-media-mining.jpg` | Systems section, Systems dossier hero                        |
| `/images/elaman-munich-office.jpg`        | Contact section, Company dossier hero, and contact page hero |

The source set is limited to these four photographs. `elaman-home-og.jpg`, `elaman-company-og.jpg`, `elaman-systems-og.jpg`, and `elaman-contact-og.jpg` are route-specific crops for search and social sharing; the last is generated by `scripts/generate-icons.mjs` from the office photograph (see `README.md`). Static crop, saturation, contrast, and overlay adjustments are allowed when they preserve legibility and a calm palette.

## 7. Motion

| Token               |                         Duration | Use                                            |
| ------------------- | -------------------------------: | ---------------------------------------------- |
| `--motion-micro`    |                          `120ms` | Compact link and control feedback              |
| `--motion-fast`     |                          `180ms` | Hover/focus colour and active rule             |
| `--motion-state`    |                          `240ms` | Mobile-menu state                              |
| `--motion-entrance` |                          `600ms` | Coordinated route-hero copy and image entrance |
| `--motion-ease`     | `cubic-bezier(0.22, 1, 0.36, 1)` | Shared easing                                  |

There is no client animation library. Movement uses only `opacity` and `transform`, in two tiers:

1. **Opening entrance.** `.hero-copy-enter` and `.hero-image-enter` use `@starting-style` for a once-only 12px rise / fade on the homepage hero, on every `PageHeader`, and on every `MediaBand`, at `--motion-entrance` / `--motion-ease`. These are time-based transitions: they finish on their own shortly after load.
2. **Scroll-linked reveal.** `.reveal` and `.reveal-group > *` (`app/globals.css`) animate the same 12px rise via `animation-timeline: view()` and `animation-range: entry 0% entry 32%` (each `.reveal-group` child gets a staggered range, from the 2nd child on). This requires no JavaScript and no `IntersectionObserver`. It is gated by `@supports (animation-timeline: view())` and, inside that, by `@media (prefers-reduced-motion: no-preference)` — a browser without the feature, or a reader who asks for reduced motion, simply gets the final state as the unanimated base style. `.reveal`/`.reveal-group` mark most homepage and dossier content blocks below the opening.

   **The scroll-linked reveal moves `transform` only, never `opacity`.** A scroll timeline has no end of its own: a block that is half inside the viewport when the page loads holds its half-way value until someone scrolls. A fade parks real text at a fraction of its opacity there, which drops it under the WCAG contrast floor for as long as the visitor sits still, and axe reports it as a serious violation. A rise has no such failure mode. Fades belong to the time-based tier above, which always completes.

Short colour/border/background feedback (hover, focus, form fields, the mobile-menu state) uses plain CSS transitions at the micro tiers. The global `prefers-reduced-motion: reduce` query collapses every transition and animation duration to effectively zero and leaves content in its final state; it does not need to separately handle smooth scrolling because the site sets none (`scroll-behavior` is not used for snap or anchor purposes any more).

There is no scroll snap anywhere in the product. It was removed together with `AnchorScrollManager`; do not reintroduce root-document `scroll-snap-type`, a `main[data-scroll-snap-page]` marker, or any per-section snap point.

## 7a. Print

Printed, a page is its document and nothing else. The header, every `MediaBand`, the `ClosingBand` and the footer navigation carry `print:hidden`; the `@media print` block in `app/globals.css` turns the soft bands white, puts every entrance and reveal at rest, keeps headings with their first paragraph and list entries whole, and prints the address after any link that leaves the site. Nothing else changes: same type, same measure, same left edge.

## 8. Dossier composition

| Kind    | Routes                           | Contract                                                                                                                   |
| ------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Company | `/de/unternehmen`, `/en/company` | Office media band, the four-stage "So arbeiten wir." / "How we work." process, bridge composition, factual management link |
| Systems | `/de/systeme`, `/en/systems`     | Navy-toned media band, open five-area ledger, project approach                                                             |

Both dossiers open with the shared `PageHeader` and a `MediaBand`, give every section below it a `SectionIntro`, end in the shared `ClosingBand`, use normal document flow, and never opt into any scroll snap. Their language switcher targets the matching localised route. Each has a contextual route-specific social image, a breadcrumb back to the homepage, and a closing band (`DetailClosing`) leading to the contact page.

The Company dossier's process section replaced the former three-principle composition: it is the same four steps as the homepage `AdviceSection` (Analyse & Beratung, Planung & Integration, Schlüsselfertige Umsetzung, Schulung & Betreuung), told at greater length, laid out as a four-column ruled ordered list on desktop with mono sequence numerals — the same visual pattern `AdviceSection` uses, not a new one.

## 8a. Contact page composition

`/de/kontakt` ↔ `/en/contact` (`ContactPage`) uses the same contract as every other subpage: `PageHeader`, then one content band opened by a `SectionIntro` on the page's left edge, with the direct contact details (ruled `dl`) on the left and the `ContactForm` on the right from `xl`. The form's own title is an `h3` inside its column, because the band's heading already titles both columns. Below `xl` the two stack, separated by a single hairline. A small privacy note under the form links to the privacy policy in the reader's language. No map service.

## 8b. Page levels

The site has two page levels and each one looks like itself. This is a hard rule, not a preference: before it existed, five subpages opened with five different geometries and a visitor could not tell one level from another.

| Level    | Pages                                                   | Opening                                                                               |
| -------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Homepage | `/de`, `/en`                                            | Full first screen, split composition, `--type-display`, soft paper                    |
| Subpage  | Company, Systems, Contact, Imprint, Privacy policy, 404 | `PageHeader` band on white, `--type-h2` title, breadcrumb, optional `MediaBand` below |

What this forbids on a subpage: a full-screen opening, a mirrored split, a dark page surface, a title in a different step, a centred or indented measure, and an opening that carries its own photograph instead of using a `MediaBand`. `tests/e2e/site.spec.ts` asserts that the `h1` of every subpage shares one left edge, one top edge, and one size, and that the homepage opening stays taller than a subpage's.

### One left edge below the opening

The same rule continues down the page. Every section on every page, the homepage included, opens with `SectionIntro` on the page container, so each `h2` starts where the page title starts. Measured at 1440 before this rule, headings began at 138, 210, 586, 606, 663 and 822; at 1024 the systems page alone used four edges. The suite asserts that each page renders exactly one left edge for its `h2` elements and that a subpage's `h1` shares it.

A section with two columns keeps the rule by titling the band once, at the left edge, above both columns. A column may then carry an `h3` of its own. Only the homepage hero and the `MediaBand` run outside the page container.

### Heading levels

`h1` titles the page, `h2` titles a section, `h3` titles an item inside one. Item size follows density rather than level: a compact multi-column list uses `--type-body` semibold, a ledger entry with a description uses `--type-h3`. Before this, the five systems areas were `h2` at the same outline level as the section titles around them, and the section that held them had no heading at all.

The legal pages sit on the same grid as every other subpage. They carry no panel, no card, and no border box; the document keeps the `legal` measure, left-aligned under the title.

## 9. Prohibited patterns

- Glass, blur, translucency, large card shadows
- Technical grids, network diagrams, DotMatrix fields, signal graphics
- Generic feature-card or icon-tile grids
- Gradient blobs, glow, neon, cyberpunk, or surveillance-first hero imagery
- Repeated red accents outside required and error form states
- New colours, fonts, unapproved images, statistics, certifications, or client logos
- Scroll snap, scroll scrubbing, parallax, looping decoration, animated filters, or layout-property animation (anything beyond `.reveal`/`.reveal-group` and the opening entrance)
- `opacity` in a scroll-linked keyframe (§ 7), any per-page opening geometry that departs from `PageHeader`, and any section heading that departs from `SectionIntro` or leaves the page's left edge (§ 8b)
- Printing a list on the homepage and again on its subpage in the same treatment: the homepage names, the subpage explains
- Fixed section heights, clipped translations, nested section scrollbars, or wheel hijacking
- Obsolete compatibility aliases or unused component variants (e.g. a revived `AnchorScrollManager`)

## 10. Verification

For visual changes:

1. Check 320×568, 390×844, 768×1024, 1024×768, 1366×768, 1440×900, and 1600×1000.
2. Verify German and English wrapping and zero horizontal overflow.
3. Verify Header/Footer active state on Company, Systems, Contact and the home signet, both locales, mobile menu, and skip link.
4. Verify the language switch lands on the matching reciprocal route from every page, including the contact page.
5. Verify the route-hero entrance and the scroll-linked reveal, and that `prefers-reduced-motion` shows final states immediately with no snap or scroll-timeline animation.
6. Verify contact-form validation, focus movement, direct links, and API error handling on both the homepage close and the contact page.
7. Verify legal pages, 404, metadata, sitemap, and a clean browser console.
8. Run lint, typecheck, format check, unit tests, production build, and production dependency audit.
9. Open the print preview of a dossier and a legal page: no header, no photograph, no closing band, white bands, external links with their address.
10. After an intended visual change, refresh the baselines with `npm run test:visual:update` and read the diff; CI compares every route at 390 and 1440 against `tests/e2e/__screenshots__`.
