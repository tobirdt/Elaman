# Elaman GmbH — Heritage Modernisation Direction

Approved art and experience direction for the Elaman website. This document states intent. CONTENT_BLUEPRINT.md controls facts and bilingual copy; DESIGN_SYSTEM.md explains implementation; current code is the final authority for visual and motion behavior.

## 1. What we are building

A premium, institutional EN/DE one-page presence for Elaman GmbH that deliberately restores the recognisable composition of the former company website while rebuilding it with current responsive, accessibility, and performance standards.

The site should read as a calm, assured institutional presence. Precision remains visible in alignment, typography, and hairlines, but the interface must not present itself as a dossier, dashboard, or technical demonstration.

| Quality       | Expression                                                             |
| ------------- | ---------------------------------------------------------------------- |
| Institutional | Formal register, factual claims, procurement-grade clarity             |
| Precise       | Hairlines, disciplined alignment, and concise language                 |
| Calm          | White-first canvas, deliberate whitespace, no decorative noise         |
| Technical     | Restrained use of the logo-derived dot geometry                        |
| Distinctive   | One coherent Elaman visual grammar rather than fashionable web effects |
| Premium       | Strong type hierarchy, exact detail, restrained motion                 |

## 2. Visual thesis

The design language is a faithful modernisation of the former Elaman page:

- a compact white wordmark header leads into a 50/50 image-and-copy introduction;
- deep navy carries the company overview, solution index, and inquiry area;
- the tiger and Munich office photographs return as full-width image bands;
- white paper carries the detailed protection copy and contact information;
- 1px hairlines establish structure without turning every section into a labelled diagram;
- cards are nearly square at 2px radius and remain flat;
- Geist carries the editorial voice;
- Geist Mono is reserved for the few places where technical metadata is useful;
- the full Elaman wordmark restores continuity with the former site;
- the logo’s dot geometry remains available as a restrained supporting system, not obligatory page decoration.

Depth comes from hierarchy, spacing, and contrast — not translucency or shadow stacks.

## 3. Brand palette

The palette is locked:

| Role           |                  Value |
| -------------- | ---------------------: |
| Paper          |                #ffffff |
| Paper soft     |                #f7f8fa |
| Hairline       | rgba(22, 24, 29, 0.12) |
| Graphite       |                #16181d |
| Graphite muted |                #555d6b |
| Graphite soft  |                #667286 |
| Elaman blue    |                #244074 |
| Elaman red     |                #d83034 |
| Navy           |                #172033 |
| On dark        |                #f7f8fa |
| On dark muted  |                #c7d0dc |

Blue is the primary Elaman signal. Red is a protection signal, never a general-purpose accent. New colours, nearby substitutes, or gradients dilute the identity and are not permitted.

## 4. Typography direction

Geist and Geist Mono are fixed.

Geist should feel editorial rather than app-like:

- large, tightly tracked display type;
- clear H2/H3 hierarchy;
- generous leading for factual body copy;
- large figures used as evidence anchors.

Geist Mono should feel like a drawing register:

- small;
- uppercase;
- widely tracked;
- reserved for section indices, labels, sequence state, and captions.

Do not substitute Jost, Futura-derived faces, serif displays, or additional mono families. Do not turn mono styling into a theme applied to ordinary copy.

## 5. Signature system

### Dot formations

The full Elaman wordmark appears in the compact header, matching the former site’s brand hierarchy. The shared compact and Manhattan formations remain available for future diagrams, but the approved homepage does not place a standalone DotMatrix composition in the hero.

Every non-logo dot composition obeys one-accent governance:

- exactly one blue dot represents Elaman, focus, or the active state;
- at most one red dot appears, only with protection semantics;
- remaining dots use low-opacity graphite/on-dark ink.

This scarcity makes blue and red meaningful. Multiple blue highlights, stray red ornaments, or repeated formation wallpaper weaken the system. The official Elaman mark remains the explicit exception and always retains its original blue/red pair and grayscale hierarchy.

When a formation is used, it remains a semantic diagram and obeys the same accent scarcity. It must not compete with the restored photography-led homepage.

### Section rhythm

Top-level sections do not carry numbered register labels. Each section begins with its actual title and uses whitespace, tonal change, and hairlines for orientation. Numbering is reserved for a real ordered process, never used as decorative metadata.

### Mono labels

Mono labels identify state, sequence, or technical context. They should be sparse and precise. They are not decorative eyebrows on every component.

### Editorial figures

Large numerals turn verified experience and scope into visual anchors. A figure must be sourced, paired with a concise caption, and used in one coherent group rather than scattered throughout the page.

## 6. Composition direction

The page shares one alignment spine, but sections must not feel mechanically repeated.

Use:

- the former site’s alternating image, navy, image, paper, and navy rhythm;
- a precise 50/50 desktop hero and a natural stacked mobile hero;
- ruled lists;
- clear index-to-content relationships;
- one dominant visual or statement per viewport;
- navy fields for the integrated portfolio and inquiry form;
- full-width heritage image bands as section transitions;
- large whitespace around technical detail.

Avoid:

- repeated centered section headers;
- repeated equal cards;
- repeated three-column feature layouts;
- decorative side graphics with no content relationship;
- filling whitespace because it appears “empty.”

The interface may be systematic without becoming uniform.

## 7. Homepage sequence

The section order is fixed:

| Anchor      | Experience                                                                                   |
| ----------- | -------------------------------------------------------------------------------------------- |
| #hero       | Heritage advice photograph beside the Elaman name, original tagline, and verified copy       |
| #experience | Navy company statement and integrated eight-field portfolio index                            |
| #systems    | Internal anchor at the portfolio index for the restored Surveillance navigation item         |
| #protection | Tiger image band followed by factual two-column protection and countermeasure information    |
| #contact    | Munich office image band, direct contact row, navy inquiry area, and restrained white footer |

This sequence is intentionally shorter than the earlier eight-section programme. Trust, approach, systems, delivery, and support content is consolidated into the four visible compositions rather than repeated as separate screens.

## 8. Content consolidation

The homepage no longer renders a standalone approach sequence. Advice, implementation, training, and support remain present in approved copy and the portfolio index. The source content stays structured in lib/content/site.ts so facts are not lost and can be reused without reintroducing a long, repetitive page.

## 9. Motion direction

Motion must read calm, exact, and engineered. It serves orientation, hierarchy, or feedback.

The canonical tiers are:

- 120–180ms for micro feedback;
- 240–320ms for state changes;
- 380–600ms for once-only reveals and traces;
- durationless, spring-smoothed progress for scroll-linked systems.

The homepage uses no scroll-scrubbed animation. Motion is limited to a progressive CSS entrance for the hero copy, navigation state, focus, hover, and form feedback. The hero image and later photographic bands remain immediately visible and static.

Use:

- subtle line draws;
- content-led reveal groups;
- a restrained one-time hero-copy entrance;
- short state transitions;
- a maximum 2px hover lift.

Do not use:

- identical fade-ins on every section;
- looping or breathing decoration;
- parallax text;
- bounce;
- scroll-scaled headlines;
- blur/filter animation;
- animated layout dimensions;
- motion that lacks a reduced-motion final state.

## 10. Imagery direction

Three supplied heritage assets are explicitly approved for this homepage:

- Advice_2022.png: the close-cropped lizard eye in the split hero;
- Protection_2022.png: the tiger image band introducing protection;
- the Munich office photograph: the contact image band.

These images are used because they are part of the former Elaman site’s recognisable identity, not as generic cybersecurity stock. They remain static, use deliberate crops, and never replace factual headings or copy. Do not add further stock hacker, surveillance, globe, tunnel, smart-city, or glowing-network imagery without explicit stakeholder approval.

## 11. Anti-patterns

| Avoid                                   | Why                                                       |
| --------------------------------------- | --------------------------------------------------------- |
| Glassmorphism and blur-backed cards     | Reintroduces the superseded visual language               |
| Gradient blobs, washes, and glows       | Generic AI/cybersecurity signal                           |
| Grid overlays and graph-paper wallpaper | Competes with the meaningful dot geometry                 |
| Bento layouts and uniform feature cards | Template-like, not institutional                          |
| Generic icon tiles                      | Generic shorthand instead of Elaman-specific visual logic |
| Large shadows and soft rounding         | Removes dossier precision                                 |
| New colours                             | Breaks accent scarcity and brand control                  |
| New fonts                               | Breaks the fixed Geist/Geist Mono voice                   |
| Uniform fade-ins                        | Makes motion mechanical and generic                       |
| More scroll spectacle                   | Undermines calm procurement-grade reading                 |
| Unsourced badges, metrics, or logos     | Credibility and legal risk                                |

Removed legacy devices and aliases are migration concerns only; do not revive them as a parallel design system.

## 12. Content direction

CONTENT_BLUEPRINT.md remains authoritative.

The public voice is:

- formal;
- precise;
- factual;
- international-government/security in English;
- institutional Sie-tone where appropriate in German.

Keep:

- the original bridge-to-trust positioning;
- verified 20+ years of experience;
- advice, communications/surveillance, protection, implementation, training, and after-sales facts;
- direct contact and inquiry language.

Avoid:

- surveillance-first hero language;
- “100% sovereignty” or other unsupported guarantees;
- “secure portal” when no portal exists;
- invented certifications, client claims, or statistics;
- SaaS verbs and inflated marketing language.

## 13. Decision order

When a question arises:

1. Protect factual truth and legal accuracy.
2. Preserve the approved heritage-modernisation composition.
3. Preserve the full wordmark hierarchy and one-accent laws.
4. Use canonical tokens and primitives.
5. Preserve accessibility and reduced-motion behavior.
6. Prefer the quietest solution that still makes hierarchy and state clear.

If the implementation changes these decisions, update DESIGN_SYSTEM.md and this document in the same work. CI configuration and the established quality gate are outside visual-design scope and must not be modified.
