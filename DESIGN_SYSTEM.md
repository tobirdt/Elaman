# Elaman design system

Implementation contract for the current production website. `app/globals.css`, `lib/design/tokens.ts`, and reachable components are the final source of truth.

## 1. Design thesis

Elaman presents as an established German security-engineering specialist through restraint: disciplined typography, five approved photographs, selective navy, local hairlines, factual copy, and one dominant idea per section. The site intentionally avoids a decorative technical interface.

## 2. Canonical tokens

### Colour

| CSS token                |     Value | Use                             |
| ------------------------ | --------: | ------------------------------- |
| `--color-paper`          | `#ffffff` | Main canvas                     |
| `--color-paper-soft`     | `#f7f8fa` | Quiet contrast                  |
| `--color-graphite`       | `#16181d` | Primary ink                     |
| `--color-graphite-muted` | `#555d6b` | Body copy                       |
| `--color-graphite-soft`  | `#667286` | Labels and metadata             |
| `--color-elaman-blue`    | `#244074` | Brand and active state          |
| `--color-elaman-red`     | `#d83034` | Protection and required markers |
| `--color-navy`           | `#172033` | Systems composition             |
| `--color-on-dark`        | `#f7f8fa` | Primary on navy                 |
| `--color-on-dark-muted`  | `#c7d0dc` | Secondary on navy               |

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

| Token                      |                                    Value |
| -------------------------- | ---------------------------------------: |
| `--container-page`         |                                  `80rem` |
| `--container-content`      |                                  `64rem` |
| `--container-copy`         |                                  `42rem` |
| `--container-narrow`       |                                  `30rem` |
| `--container-legal`        |                                  `56rem` |
| `--page-x`                 |              `clamp(1.25rem, 4vw, 4rem)` |
| `--section-screen-min`     | `calc(100vh - var(--header-h))` fallback |
| `--section-y-screen`       |               `clamp(3rem, 6vh, 5.5rem)` |
| `--section-y-content-band` |            `clamp(3.75rem, 6vw, 5.5rem)` |
| `--section-y-legal-page`   |           `clamp(2.75rem, 5vw, 4.25rem)` |

`.section-screen` upgrades its minimum height to `calc(100svh - var(--header-h))` when supported. The property is applied directly because the production CSS compiler may remove `svh` inside a custom-property declaration. Screen sections own a shared header-sized `scroll-margin-top`.

### Typography

- Geist: all editorial and interface copy.
- Geist Mono: sequence indices and concise technical labels.
- Display: `--type-display` with `--leading-display` and `--tracking-display`.
- Section heading: `--type-h2` with `--leading-title` and `--tracking-title`.
- Subheading: `--type-h3` for subordinate editorial titles.
- Long-form marketing copy: at least `--type-body` with `--leading-body` and a bounded `ch` measure.
- Interface labels and compact metadata may use `--type-small` or `--type-micro`.
- `text-balance` is for headings, not paragraph columns.

Do not add a font, a local heading clamp, undersized long copy, or arbitrary decorative tracking.

## 3. Component contracts

### Container

`Container` owns page gutters and maximum width. Supported sizes are `page`, `content`, `copy`, `narrow`, and `legal`.

### Section

`Section` owns section mode and tone:

- `screen`: minimum visible height below the sticky header and shared scroll margin;
- `content-band`: normal marketing band;
- `legal-page`: legal/document rhythm.

Supported tones are `plain`, `white`, and `soft`. `screen` is always a minimum height, never a clipping or fixed-height contract.

### SectionHeader and SectionLabel

Used by legal pages and utility states. `SectionLabel` uses Geist Mono. Top-level homepage sections may compose their own heading blocks where the image relationship is specific. Do not add decorative numbering; numbering is reserved for genuine ordered processes and ledgers.

### Button

Variants are `primary`, `secondary`, and `ghost`; shapes are `control` and `pill`. Primary actions use graphite and turn Elaman blue on hover. All controls retain visible focus and at least 44px touch height.

### Header

- Sticky white header with the supplied points-only Elaman signet.
- Six desktop anchors use one blue active/hover rule.
- Mobile navigation is the only raised overlay.
- Escape and outside-pointer behavior remain intact.
- Active tracking and locale switching preserve the six anchors.

## 4. Homepage section contracts

### HeroSection

- Chameleon image and copy use a 50/50 desktop split.
- Header plus hero equal one normal viewport.
- Mobile stacks naturally and may grow on short displays.
- The image is the sole LCP asset.
- `20+` appears exactly once.

### ProfileSection

- White asymmetric text/image grid.
- Stone-bridge image is decorative and colour-calmed.
- One blue hairline supports the heading.
- Body copy is left aligned and bounded to 65ch.

### AdviceSection

- Paper-soft background.
- Semantic ordered list with four fixed steps.
- Desktop uses four columns and one continuous top rule.
- Mobile uses one natural vertical sequence.
- No cards, icons, or enclosed cells.

### SystemsSection

- Navy split composition with Media Mining image.
- Capability order is row-major in the DOM and visual layout.
- Horizontal rules only; no boxed matrix or vertical cell dividers.
- Capability titles do not use automatic hyphenation.

### ProtectionSection

- Panoramic tiger image followed by one primary H2 and four factual areas.
- Exactly one red dot carries protection semantics.
- Item copy remains 1rem and open, with local hairlines.

### ContactSection

- Office image and contact/form content form the outer desktop split.
- Wide desktop uses an internal contact-details/form split so the composition fits the visible height.
- Mobile and tablet use natural vertical flow.
- The office title is subordinate copy, not a competing H2.
- Inquiry validation, honeypot, API behavior, and direct contact links remain unchanged.

## 5. Approved photography

| Asset                                     | Role       |
| ----------------------------------------- | ---------- |
| `/images/elaman-advice.png`               | Hero       |
| `/images/elaman-profile-bridge.jpg`       | Profile    |
| `/images/elaman-systems-media-mining.jpg` | Systems    |
| `/images/elaman-protection.png`           | Protection |
| `/images/elaman-munich-office.jpg`        | Contact    |

No additional image is approved. Static crop, saturation, contrast, and overlay adjustments are allowed when they preserve legibility and a calm palette.

## 6. Motion and scrolling

| Token               |                         Duration | Use                                |
| ------------------- | -------------------------------: | ---------------------------------- |
| `--motion-micro`    |                          `120ms` | Compact link and control feedback  |
| `--motion-fast`     |                          `180ms` | Hover/focus colour and active rule |
| `--motion-state`    |                          `240ms` | Mobile-menu state                  |
| `--motion-entrance` |                          `600ms` | One progressive hero-copy entrance |
| `--motion-ease`     | `cubic-bezier(0.22, 1, 0.36, 1)` | Shared easing                      |

The homepage has no animation library, reveal wrappers, scroll scrubbing, parallax, or looping motion. Movement uses opacity and transforms. `prefers-reduced-motion` disables smooth scrolling and presents final states immediately.

Soft scroll snap is orientation, not animation:

- only at `min-width: 1024px`;
- only with `pointer: fine`;
- only when reduced motion is not requested;
- `scroll-snap-type: y proximity` on the root document;
- no wheel interception, strict paging, nested scroller, or forced snap stop.

## 7. Homepage composition

| Anchor        | Component           | Composition                             |
| ------------- | ------------------- | --------------------------------------- |
| `#hero`       | `HeroSection`       | Chameleon and factual introduction      |
| `#profile`    | `ProfileSection`    | Company profile and stone bridge        |
| `#advice`     | `AdviceSection`     | Four-stage project path                 |
| `#systems`    | `SystemsSection`    | Media Mining and open ledger            |
| `#protection` | `ProtectionSection` | Tiger and protection information        |
| `#contact`    | `ContactSection`    | Office, direct routes, and inquiry form |

## 8. Prohibited patterns

- Glass, blur, translucency, large card shadows
- Technical grids, network diagrams, DotMatrix fields, signal graphics
- Generic feature-card or icon-tile grids
- Gradient blobs, glow, neon, cyberpunk, or surveillance-first hero imagery
- Repeated red accents outside protection and required/error form states
- New colours, fonts, images, statistics, certifications, or client logos
- Scroll-linked motion, looping decoration, animated filters, or layout animation
- Fixed section heights, clipped translations, nested section scrollbars, or wheel hijacking
- Obsolete compatibility aliases or unused component variants

## 9. Verification

For visual changes:

1. Check 320×568, 390×844, 768×1024, 1024×768, 1366×768, 1440×900, and 1600×1000.
2. Verify German and English wrapping and zero horizontal overflow.
3. Verify all six anchors, active navigation, locale switching with hash, mobile menu, and skip link.
4. Verify free touch scrolling, soft desktop snap, and reduced-motion behavior.
5. Verify contact validation, focus movement, direct links, and API error handling.
6. Verify legal pages, 404, metadata, sitemap, and a clean browser console.
7. Run lint, typecheck, format check, production build, and production dependency audit.
