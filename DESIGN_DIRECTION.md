# Elaman GmbH — Design Direction

Approved visual and content direction for the Elaman website transformation, based on **Switch/Stitch screenshots** and the **source-aligned content blueprint** (`CONTENT_BLUEPRINT.md`).

This document states _intent_. Token values and component rules live in `DESIGN_SYSTEM.md`. Execution order lives in `IMPLEMENTATION_PLAN.md`.

---

## 1. What we are building

A **premium, minimal, institutional** single-page website for Elaman GmbH — communications and security engineering for public authorities, governmental organisations, security-sector clients, and communication service providers. German is the primary experience; English is an equal, switchable translation.

The site must read as **government-grade procurement material**, not a product landing page.

| Quality       | Expression                                                                        |
| ------------- | --------------------------------------------------------------------------------- |
| Premium       | Refined spacing, restrained motion, intentional hierarchy                         |
| Minimal       | One primary idea per screen; no decorative clutter                                |
| Institutional | Formal tone, factual claims, technical credibility                                |
| Calm          | Large whitespace, slow transitions, low visual noise                              |
| Precise       | Grid-aligned layout, consistent tokens, structured labels                         |
| Technical     | Diagrams and system visuals, with only selected approved company/licensed imagery |

---

## 2. Approved visual language (Switch/Stitch)

### Foundation

- **White-first canvas** — primary scroll experience is light, open, and readable.
- **Black / deep navy contrast sections** — selective full-width bands for emphasis (protection/countermeasures, key narrative beats). These are **section tones**, not a site-wide dark theme.
- **Precise grid** — single alignment spine, consistent column logic, no playful offset layouts.
- **Large calm whitespace** — sections breathe; density is reserved for diagrams and data, not marketing copy.
- **Elaman blue / red accents** — derived from the logo; used as thin rules, diagram nodes, label tones, and the signature split line. Never as large gradient fills or neon glow.
- **Point mark as a signal system** — the Elaman point constellation is the primary brand device: it carries navigation state, technical diagrams, progress, and focused interaction states. It is never treated as generic decoration.
- **Brand hierarchy** — the header displays the point mark only. The full Elaman wordmark and descriptor appear in the hero and footer.

### Layout experience

- **Modern single-page scroll** at `/en` and `/de`.
- **Screen-composed sections** — major blocks feel like deliberate viewport moments (`hero-screen`, `screen`, `screen-lite`, `content-band`).
- **Sticky-scroll lifecycle** — pinned narrative stage on desktop; sequential flow on mobile.
- **Interactive expandable cards / tabs** — solutions and service detail revealed inline (accordion or tab pattern), not modals or carousels.
- **Subtle hover and scroll animations** — confirm structure; never entertain.

### Imagery

- **Primary visual language:** signal lines, system maps, process rails, node graphs (`SystemMap`, `ProcessRail`, `HeroSignalVisual`, `TechnicalMark`) and the Elaman point constellation.
- **Permitted imagery:** the approved office photograph, a restrained bridge image as a literal but calm reference to the brand line, and only explicitly approved licensed technical imagery where it adds factual context.
- **Do not use:** eye, animal, tunnel, globe, smart-city, glowing-network, or generic cyber-security stock imagery. It is too surveillance-led, theatrical, or template-like for the desired public-sector position.
- **Image treatment:** use one to three photographs in the whole experience; crop editorially, use generous negative space, and apply only subtle neutral/brand-colour grading. Images must never become animated spectacle or imply a client, operation, or capability not publicly approved.

---

## 3. What to avoid

### Visual anti-patterns

| Avoid                                       | Why                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| Generic SaaS startup look                   | Undermines institutional trust                                           |
| Playful Bento / mosaic card grids           | Reads as template, not engineering firm                                  |
| AI gradient blobs                           | Associated with generic AI products                                      |
| Neon / cyberpunk security aesthetic         | Wrong audience signal for public authorities                             |
| Full-bleed gradient heroes                  | Conflicts with white-first calm                                          |
| Auto-playing carousels, parallax spectacle  | Flashy, not procurement-grade                                            |
| Badge walls without proof                   | Legal and credibility risk                                               |
| Surveillance, predator, or "hacker" imagery | Reads as tactical marketing rather than a discreet professional presence |

### Copy anti-patterns

| Avoid                                                   | Use instead                                                                       |
| ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `100% sovereignty` or similar unless explicitly sourced | Factual public-sector focus from blueprint                                        |
| `Secure portal` unless a real portal exists             | Contact, inquiry form, phone, email                                               |
| Surveillance-heavy hero language                        | Bridge-to-trust positioning; reserve surveillance for services/solutions sections |
| `B2G`, `360°`, `unlock`, `AI-powered`                   | Advice, implementation, training, after-sales — per `CONTENT_BLUEPRINT.md`        |
| `Secure channel` for web form                           | Standard business response wording                                                |
| Invented statistics or client logos                     | 20+ years and verified service domains only                                       |

Full prohibited lists: `DESIGN_SYSTEM.md` §12 and `CONTENT_BLUEPRINT.md` §12.

---

## 4. Content direction

All marketing copy follows **`CONTENT_BLUEPRINT.md`**. Summary anchors:

| Anchor                 | Usage                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Original tagline       | _Your bridge to trust and security._ / _Ihre Brücke zu Vertrauen und Sicherheit._                                    |
| Descriptor             | _German Security Solutions_ / _Deutsche Sicherheitslösungen_                                                         |
| 20+ years              | Communications and security engineering                                                                              |
| Service pillars        | Advice · Surveillance · Protection · Contact (Contact = dedicated section)                                           |
| Delivery facts         | Turnkey implementation, state-of-the-art technology, training, after-sales                                           |
| Communications domains | Network, private, wireless, cellular, satellite                                                                      |
| Audience               | Governmental authorities, public authorities, law-enforcement-related organisations, communication service providers |

**Hero rule:** Lead with trust, experience, and engineering — not surveillance vocabulary.

**Navigation (target):** German default — Erfahrung · Vorgehen · Leistungen · Lösungen · Kontakt. English remains available through a visible language switch.

---

## 5. Page rhythm (target)

Light and dark sections alternate with purpose — not random contrast.

```
┌─────────────────────────────────────────┐
│  HERO — white / light, tagline, diagram │
├─────────────────────────────────────────┤
│  CREDENTIALS — soft white band          │
├─────────────────────────────────────────┤
│  STICKY LIFECYCLE — screen, pinned      │
├─────────────────────────────────────────┤
│  SERVICES (capabilities) — content band │
├─────────────────────────────────────────┤
│  SOLUTIONS — white, accordion/tabs      │
├─────────────────────────────────────────┤
│  PROTECTION — deep navy / dark panel    │
├─────────────────────────────────────────┤
│  METHODOLOGY (delivery) — light band    │
├─────────────────────────────────────────┤
│  CONTACT + FOOTER — white, factual      │
└─────────────────────────────────────────┘
```

| Blueprint name              | Component            | Anchor          | Visual tone                    |
| --------------------------- | -------------------- | --------------- | ------------------------------ |
| Hero                        | `HeroSection`        | `#hero`         | White-first, technical diagram |
| Credentials                 | `TrustSection`       | `#experience`   | Soft light band                |
| Approach (sticky lifecycle) | `ScrollStory`        | `#story`        | Screen, glass stage            |
| Services                    | `CapabilityOverview` | `#capabilities` | Content band                   |
| Solutions                   | `SystemsSection`     | `#systems`      | White, expandable              |
| Protection                  | `ProtectionSection`  | `#protection`   | **Dark contrast section**      |
| Methodology                 | `DeliverySection`    | `#delivery`     | Soft light band                |
| Contact                     | `ContactSection`     | `#contact`      | White, form + details          |

---

## 6. Interaction direction

| Pattern                  | Where                      | Rule                                                               |
| ------------------------ | -------------------------- | ------------------------------------------------------------------ |
| Sticky scroll + progress | Lifecycle section          | Wide desktop ≥1280px; tablet/mobile use an unpinned sequence       |
| Expandable cards         | Services, solutions        | `aria-expanded`, keyboard, `--motion-medium`                       |
| Tabs (optional)          | Solutions section          | Same content as accordion; one pattern per section                 |
| Hover lift               | Buttons, interactive cards | Max `-translate-y-0.5`; no scale                                   |
| Scroll reveal            | Section entry              | `MotionReveal`; respect reduced motion                             |
| Diagram motion           | Hero, story, maps          | Low-amplitude pulse / dash only                                    |
| Point-mark motion        | Header, progress, diagrams | State-driven opacity or colour changes only; no perpetual movement |
| Image motion             | Approved photographs only  | Gentle masked reveal or depth shift on entry; static afterwards    |

---

## 7. Document hierarchy

| Document                          | Role                                                  |
| --------------------------------- | ----------------------------------------------------- |
| `DESIGN_DIRECTION.md` (this file) | Approved vision — Switch/Stitch + content intent      |
| `CONTENT_BLUEPRINT.md`            | Section copy EN/DE — source-aligned                   |
| `DESIGN_SYSTEM.md`                | Tokens, components, motion, i18n, prohibited patterns |
| `IMPLEMENTATION_PLAN.md`          | Step-by-step build order                              |
| `AGENTS.md`                       | Agent and contributor rules                           |

When direction conflicts arise, resolve in this order: **content blueprint (facts) → design direction (vision) → design system (rules)**.

---

## 8. Decision log

| Date       | Decision                                                                                                             | Source                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| 2026-06-15 | White-first with selective dark contrast sections                                                                    | Switch/Stitch screenshots                  |
| 2026-06-15 | Technical diagrams replace all photography                                                                           | Switch/Stitch + institutional positioning  |
| 2026-06-15 | Content anchored to original Elaman services and facts                                                               | `CONTENT_BLUEPRINT.md`                     |
| 2026-06-15 | Solutions use accordion/tabs for detail                                                                              | Switch/Stitch interaction model            |
| 2026-06-15 | Hero avoids surveillance-heavy language                                                                              | Content + style correction                 |
| 2026-07-10 | German is the primary experience; English remains switchable                                                         | Stakeholder direction                      |
| 2026-07-10 | Header uses point mark only; full wordmark appears in hero and footer                                                | Stakeholder direction                      |
| 2026-07-10 | Selected licensed/company imagery may support, but not replace, technical diagrams                                   | Asset audit + stakeholder direction        |
| 2026-07-10 | Futura-derived typography is retained through a legally usable alternative if no Futura webfont licence is available | Current-site audit + stakeholder direction |
| 2026-07-10 | Jost is the implemented Futura-derived webfont; the owned Munich office image is reserved for contact context        | Brand-system implementation                |
