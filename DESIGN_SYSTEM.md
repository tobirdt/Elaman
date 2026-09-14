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
| `--section-feature-max`    |                                          `46rem` |
| `--section-y-screen`       |                      `clamp(3rem, 6svh, 5.5rem)` |
| `--section-y-content-band` |                    `clamp(3.75rem, 6vw, 5.5rem)` |
| `--section-y-legal-page`   |                   `clamp(2.75rem, 5vw, 4.25rem)` |

`.section-screen` and `.section-feature` upgrade their minimum height to a `100svh`-based value when supported (`@supports (height: 100svh)`). The property is applied directly rather than inside a custom-property declaration, because the production CSS compiler may strip `svh` there. Both section modes share the header-sized `scroll-margin-top`.

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

- `screen`: minimum visible height below the sticky header, used only by the homepage `HeroSection`. The dossier and contact-page heroes replicate the same `min-height: calc(100svh - var(--header-h))` math in a hand-built `<section>`, not this primitive, because their split ratios and tone differ per page;
- `feature`: minimum height that fills the viewport below the header on a laptop but stops growing at `--section-feature-max` (46rem) on tall displays, so a short composition never floats in empty paper. The four non-hero homepage sections (Profile, Advice, Systems, Contact) use this mode;
- `content-band`: normal marketing band;
- `legal-page`: legal/document rhythm.

Supported tones are `plain`, `white`, and `soft`. `screen` and `feature` are always a minimum height, never a clipping or fixed-height contract.

### SectionHeader and SectionLabel

Used by legal pages and utility states. `SectionLabel` uses Geist Mono. Top-level homepage sections may compose their own heading blocks where the image relationship is specific. Do not add decorative numbering; numbering is reserved for genuine ordered processes and ledgers.

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

Switches on `content.kind` (`company` | `systems`) to render the Company or Systems dossier composition (§ 8). Shares a `BackLink` (to the homepage) and a `DetailClosing` band (heading plus a `TextLink` to the contact page) between both.

### ContactPage

The contact-route composition (§ 8a): a dossier-style hero split with the Munich office photograph, then a content band pairing a ruled `dl` of direct contact facts with the `ContactForm`.

## 5. Homepage section contracts

### HeroSection

- Chameleon image and copy use a 50/50 desktop split.
- Header plus hero equal one normal viewport (`variant="screen"`).
- Mobile stacks naturally and may grow on short displays.
- The image is the sole LCP asset.
- Company positioning begins in Profile; the hero contains no service paragraph.
- `25+` appears exactly once.

### ProfileSection

- White asymmetric text/image grid (`variant="feature"`).
- Stone-bridge image is decorative and colour-calmed.
- One blue hairline supports the heading.
- Body copy is left aligned and bounded to 65ch.
- One compact ruled management reference links Holger Rumscheidt to the existing imprint without creating a competing profile composition.

### AdviceSection

- Paper-soft background (`variant="feature"`, `tone="soft"`).
- Semantic ordered list with four fixed steps.
- Desktop uses four columns and one continuous top rule.
- Mobile uses one natural vertical sequence.
- No cards, icons, or enclosed cells.

### SystemsSection

- Navy split composition with the Media Mining image (`variant="feature"`).
- The ledger contains the five approved capability areas; the fifth entry spans the full row width on `sm` and up (`sm:last:odd:col-span-2`) instead of leaving a half-empty row.
- Capability order is row-major in the DOM and visual layout.
- Horizontal rules only; no boxed matrix or vertical cell dividers.
- Capability titles do not use automatic hyphenation.

### ContactSection

- Office image and contact content form the outer desktop split (`variant="feature"`).
- The section is the compact homepage close: heading, one short paragraph, the three direct contact routes as a ruled `dl`, and one primary action to the contact page.
- The office photograph carries no caption; the opening sentence already names Munich.
- Mobile and tablet use natural vertical flow.
- The inquiry form itself is not part of the homepage — it lives only on `/de/kontakt` ↔ `/en/contact`.

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

1. **Route-hero entrance.** `.hero-copy-enter` and `.hero-image-enter` use `@starting-style` for a once-only 12px rise / fade on the homepage hero, each dossier hero, and the contact-page hero, at `--motion-entrance` / `--motion-ease`.
2. **Scroll-linked reveal.** `.reveal` and `.reveal-group > *` (`app/globals.css`) animate the same 12px rise via `animation-timeline: view()` and `animation-range: entry 0% entry 32%` (each `.reveal-group` child gets a staggered range, from the 2nd child on). This requires no JavaScript and no `IntersectionObserver`. It is gated by `@supports (animation-timeline: view())` and, inside that, by `@media (prefers-reduced-motion: no-preference)` — a browser without the feature, or a reader who asks for reduced motion, simply gets the final state as the unanimated base style. `.reveal`/`.reveal-group` mark most homepage and dossier content blocks below the hero.

Short colour/border/background feedback (hover, focus, form fields, the mobile-menu state) uses plain CSS transitions at the micro tiers. The global `prefers-reduced-motion: reduce` query collapses every transition and animation duration to effectively zero and leaves content in its final state; it does not need to separately handle smooth scrolling because the site sets none (`scroll-behavior` is not used for snap or anchor purposes any more).

There is no scroll snap anywhere in the product. It was removed together with `AnchorScrollManager`; do not reintroduce root-document `scroll-snap-type`, a `main[data-scroll-snap-page]` marker, or any per-section snap point.

## 8. Dossier composition

| Kind    | Routes                           | Contract                                                                                                                 |
| ------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Company | `/de/unternehmen`, `/en/company` | Office-led hero, the four-stage "So arbeiten wir." / "How we work." process, bridge composition, factual management link |
| Systems | `/de/systeme`, `/en/systems`     | Navy image-led hero, open five-area ledger, project approach                                                             |

Both dossiers use normal document flow and never opt into any scroll snap. Their language switcher targets the matching localised route. Each has a contextual route-specific social image, a back link to the homepage (`Zur Startseite` / `Home`), and a closing band (`DetailClosing`) leading to the contact page.

The Company dossier's process section replaced the former three-principle composition: it is the same four steps as the homepage `AdviceSection` (Analyse & Beratung, Planung & Integration, Schlüsselfertige Umsetzung, Schulung & Betreuung), told at greater length, laid out as a four-column ruled ordered list on desktop with mono sequence numerals — the same visual pattern `AdviceSection` uses, not a new one.

## 8a. Contact page composition

`/de/kontakt` ↔ `/en/contact` (`ContactPage`) uses the same dossier-style contract: normal document flow, a hero split with the Munich office photograph on the right, then one content band with the direct contact details (ruled `dl`) on the left and the `ContactForm` on the right from `xl`. Below `xl` the two stack, separated by a single hairline. A small privacy note under the form links to the privacy policy in the reader's language. No map service.

## 9. Prohibited patterns

- Glass, blur, translucency, large card shadows
- Technical grids, network diagrams, DotMatrix fields, signal graphics
- Generic feature-card or icon-tile grids
- Gradient blobs, glow, neon, cyberpunk, or surveillance-first hero imagery
- Repeated red accents outside required and error form states
- New colours, fonts, unapproved images, statistics, certifications, or client logos
- Scroll snap, scroll scrubbing, parallax, looping decoration, animated filters, or layout-property animation (anything beyond `.reveal`/`.reveal-group` and the route-hero entrance)
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
