# Elaman design system

Implementation contract for the current production website. `app/globals.css` and reachable components are the final source of truth.

## 1. Design thesis

Elaman presents as an established German security-engineering specialist through restraint: disciplined typography, three heritage photographs, selective navy fields, local hairlines, and factual copy. The site intentionally avoids a decorative technical interface.

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
| `--color-navy`           | `#172033` | Company and inquiry bands       |
| `--color-on-dark`        | `#f7f8fa` | Primary on navy                 |
| `--color-on-dark-muted`  | `#c7d0dc` | Secondary on navy               |

### Structure

| Token                      |                                Value | Use                          |
| -------------------------- | -----------------------------------: | ---------------------------- |
| `--border-hairline`        |             `rgba(22, 24, 29, 0.12)` | Default paper rule           |
| `--border-hairline-strong` |             `rgba(22, 24, 29, 0.24)` | Strong paper rule and fields |
| `--border-on-navy`         |          `rgba(255, 255, 255, 0.14)` | Subtle navy rule             |
| `--radius-card`            |                           `0.125rem` | Content/form panel           |
| `--radius-control`         |                           `0.375rem` | Controls                     |
| `--shadow-overlay`         | `0 16px 48px rgba(22, 24, 29, 0.12)` | Mobile navigation only       |

No ordinary content shadow, glass surface, gradient surface, or alternative radius is part of the system.

### Layout

| Token                      |                          Value |
| -------------------------- | -----------------------------: |
| `--container-page`         |                        `80rem` |
| `--container-content`      |                        `64rem` |
| `--container-copy`         |                        `42rem` |
| `--container-narrow`       |                        `30rem` |
| `--container-legal`        |                        `56rem` |
| `--page-x`                 |    `clamp(1.25rem, 4vw, 4rem)` |
| `--section-y-content-band` |  `clamp(3.75rem, 6vw, 5.5rem)` |
| `--section-y-legal-page`   | `clamp(2.75rem, 5vw, 4.25rem)` |

Small screens use the mobile values defined in `app/globals.css`.

### Typography

- Geist: all editorial and interface copy.
- Geist Mono: capability indices and concise technical labels.
- Display: `--type-display` with `--leading-display` and `--tracking-display`.
- Section heading: `--type-h2` with `--leading-title` and `--tracking-title`.
- Body text: readable 6–7 line-height utilities and bounded measure.
- `text-balance` is for headings, not paragraph columns.

Do not add a font, a local type scale, or arbitrary decorative tracking.

## 3. Component contracts

### Container

`Container` owns page gutters and maximum width. Supported sizes are `page`, `content`, `copy`, `narrow`, and `legal`.

### Section

`Section` owns vertical rhythm for the two current modes:

- `content-band`
- `legal-page`

Supported tones are `plain`, `white`, and `soft`. There are no legacy boolean props or migration aliases.

### SectionHeader and SectionLabel

Used by legal pages and 404 states. Labels are concise orientation cues; headings carry the hierarchy. Do not add decorative top-level numbering.

### Button

Variants are `primary`, `secondary`, and `ghost`; shapes are `control` and `pill`. Primary actions use graphite and turn Elaman blue on hover. All controls retain visible focus and at least 44px touch height where used interactively.

### Header

- Sticky white header with the supplied points-only Elaman signet.
- Desktop navigation uses a single blue active/hover rule.
- Mobile navigation is the only raised overlay.
- Escape and outside-pointer behavior must remain intact.
- Anchor tracking uses the existing section IDs.

### CapabilityOverview

- Navy company statement followed by an open capability ledger.
- One column on mobile; two columns from `md` upward.
- Each row aligns its number and title on the same baseline.
- Use local horizontal rules only; do not restore vertical dividers or enclosed cells.
- Disable automatic word hyphenation on capability names.

### Photography sections

- `HeroSection`: advice photograph at 50/50 desktop and stacked mobile; image remains the LCP asset.
- `ProtectionSection`: tiger band, static navy overlay, then two factual ruled columns.
- `ContactSection`: Munich-office band, direct contact row, then navy inquiry area.

No additional image is approved.

## 4. Motion tokens

| Token               |                         Duration | Use                                |
| ------------------- | -------------------------------: | ---------------------------------- |
| `--motion-micro`    |                          `120ms` | Compact link and control feedback  |
| `--motion-fast`     |                          `180ms` | Hover/focus colour and active rule |
| `--motion-state`    |                          `240ms` | Mobile-menu state                  |
| `--motion-entrance` |                          `600ms` | One progressive hero-copy entrance |
| `--motion-ease`     | `cubic-bezier(0.22, 1, 0.36, 1)` | Shared easing                      |

The homepage has no animation library, reveal wrappers, scroll-scrub system, parallax, or looping motion. Movement uses opacity and transforms. `prefers-reduced-motion` disables smooth scrolling and presents final states immediately.

## 5. Homepage composition

| Anchor        | Component            | Composition                                    |
| ------------- | -------------------- | ---------------------------------------------- |
| `#hero`       | `HeroSection`        | Heritage advice image and factual introduction |
| `#experience` | `CapabilityOverview` | Company statement and open ledger              |
| `#systems`    | internal anchor      | Portfolio navigation target                    |
| `#protection` | `ProtectionSection`  | Tiger band and protection information          |
| `#contact`    | `ContactSection`     | Office band, contact routes, and inquiry form  |

## 6. Prohibited patterns

- Glass, blur, translucency, large card shadows
- Technical grids, network diagrams, DotMatrix fields, signal graphics
- Generic feature-card or icon-tile grids
- Gradient blobs, glow, neon, cyberpunk, or surveillance-first hero imagery
- Repeated red accents outside protection and required form markers
- New colours, fonts, images, statistics, certifications, or client logos
- Scroll-linked motion, looping decoration, animated filters, or layout animation
- Obsolete compatibility aliases or unused component variants

## 7. Verification

For visual changes:

1. Check 320/390px mobile, 768px tablet, and at least 1280px desktop.
2. Verify English and German wrapping and zero horizontal overflow.
3. Verify mobile-menu keyboard behavior, focus visibility, and touch targets.
4. Verify reduced motion and a clean browser console.
5. Run lint, typecheck, format check, and production build.
