# Elaman GmbH — Precision Dossier Direction

Approved art and experience direction for the Elaman website. This document states intent. CONTENT_BLUEPRINT.md controls facts and bilingual copy; DESIGN_SYSTEM.md explains implementation; current code is the final authority for visual and motion behavior.

## 1. What we are building

A premium, minimal, institutional EN/DE one-page presence for Elaman GmbH: communications and security engineering for public authorities, governmental organisations, security-sector clients, and communication service providers.

The site should read as a precise technical dossier with editorial confidence. It is not a product dashboard, a cybersecurity campaign, or a generic agency portfolio.

| Quality | Expression |
|---|---|
| Institutional | Formal register, factual claims, procurement-grade clarity |
| Precise | Hairline registers, disciplined alignment, small technical labels |
| Calm | White-first canvas, deliberate whitespace, no decorative noise |
| Technical | Logo-derived formations and system diagrams with semantic meaning |
| Distinctive | One coherent Elaman visual grammar rather than fashionable web effects |
| Premium | Strong type hierarchy, exact detail, restrained motion |

## 2. Visual thesis

The design language is “Precision Dossier”:

- white paper and paper-soft bands form the primary canvas;
- deep navy appears selectively, principally for protection;
- 1px hairlines establish registers, sequence, and technical structure;
- cards are nearly square at 2px radius and remain flat;
- Geist carries the editorial voice;
- Geist Mono carries the technical voice;
- oversized factual numerals create scale and confidence;
- the Elaman logo’s dot geometry becomes a controlled formation system.

Depth comes from hierarchy, spacing, and contrast — not translucency or shadow stacks.

## 3. Brand palette

The palette is locked:

| Role | Value |
|---|---:|
| Paper | #ffffff |
| Paper soft | #f7f8fa |
| Hairline | rgba(22, 24, 29, 0.12) |
| Graphite | #16181d |
| Graphite muted | #555d6b |
| Graphite soft | #667286 |
| Elaman blue | #244074 |
| Elaman red | #d83034 |
| Navy | #172033 |
| On dark | #f7f8fa |
| On dark muted | #c7d0dc |

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

The Elaman mark is not a decorative logo stamp. Its 25-dot Manhattan diamond supplies the geometry for a reusable visual language.

Every dot composition obeys one-accent governance:

- exactly one blue dot represents Elaman, focus, or the active state;
- at most one red dot appears, only with protection semantics;
- remaining dots use low-opacity graphite/on-dark ink.

This scarcity makes blue and red meaningful. Multiple blue highlights, stray red ornaments, or repeated formation wallpaper weaken the system.

The lifecycle story is the clearest expression of the idea. The same physical dots move through:

1. dispersed field;
2. ordered columns;
3. connected chain;
4. protective perimeter;
5. implemented block;
6. resolved Elaman diamond.

The visual explains the engineering lifecycle without relying on stock metaphor or an icon sequence.

### Register rules

Every top-level section opens like a technical drawing:

- full-width hairline;
- zero-padded index;
- terse keyword;
- mono voice.

The register keeps a long one-pager oriented and makes section sequence part of the identity.

### Mono labels

Mono labels identify state, sequence, or technical context. They should be sparse and precise. They are not decorative eyebrows on every component.

### Editorial figures

Large numerals turn verified experience and scope into visual anchors. A figure must be sourced, paired with a concise caption, and used in one coherent group rather than scattered throughout the page.

## 6. Composition direction

The page shares one alignment spine, but sections must not feel mechanically repeated.

Use:

- asymmetric editorial grids;
- ruled lists;
- clear index-to-content relationships;
- one dominant visual or statement per viewport;
- paper-soft bands for quiet rhythm;
- one navy protection band for decisive contrast;
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

| Register | Anchor | Experience |
|---:|---|---|
| Hero | #hero | Trust-led statement, dot-field assembly, factual figures |
| 01 | #experience | Credentials and evidence |
| 02 | #story | Lifecycle as the Formation Machine |
| 03 | #capabilities | Services as a ruled institutional index |
| 04 | #systems | Solutions disclosure plus integration matrix |
| 05 | #protection | Navy contrast and the principal red formation |
| 06 | #delivery | Methodology on a hairline timeline |
| 07 | #contact | Direct inquiry form and factual contact details |

The protection band is intentionally exceptional. Adding more dark bands or red-heavy moments would reduce its meaning.

## 8. Formation Machine

On wide desktop, the lifecycle becomes a sticky technical stage:

- one continuous runway controls the sequence;
- progress, text state, and formation geometry stay synchronized;
- each step dwells long enough to read;
- dot identity is preserved through every morph;
- the protection step introduces the controlled red moment;
- the final state resolves into the Elaman mark.

Tablet, mobile, and reduced-motion users receive the same story as a linear sequence with static snapshots. The linear version is not a degraded afterthought; it is the accessible composition for those contexts.

## 9. Motion direction

Motion must read calm, exact, and engineered. It serves orientation, hierarchy, or feedback.

The canonical tiers are:

- 120–180ms for micro feedback;
- 240–320ms for state changes;
- 380–600ms for once-only reveals and traces;
- durationless, spring-smoothed progress for scroll-linked systems.

Exactly two scroll-scrubbed systems define the experience:

1. the hero dot field’s subtle exit;
2. the lifecycle Formation Machine.

All other motion is event-led or once-only. A third scrub system would turn the page into a motion showcase.

Use:

- subtle line draws;
- content-led reveal groups;
- dot assembly and formation morphs;
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

The primary visual language is generated from Elaman’s own dot geometry and factual system relationships.

- Prefer DotMatrix formations, integration paths, perimeters, and process rails.
- Do not use generic technical-grid backgrounds.
- Do not use icon-tile substitutes for the formation system.
- Do not use stock hacker, surveillance, eye, animal, tunnel, globe, smart-city, or glowing-network imagery.
- Any future photography requires explicit approval and must remain secondary to the dossier system.

## 11. Anti-patterns

| Avoid | Why |
|---|---|
| Glassmorphism and blur-backed cards | Reintroduces the superseded visual language |
| Gradient blobs, washes, and glows | Generic AI/cybersecurity signal |
| Grid overlays and graph-paper wallpaper | Competes with the meaningful dot geometry |
| Bento layouts and uniform feature cards | Template-like, not institutional |
| Icon tiles | Generic shorthand instead of Elaman-specific visual logic |
| Large shadows and soft rounding | Removes dossier precision |
| New colours | Breaks accent scarcity and brand control |
| New fonts | Breaks the fixed Geist/Geist Mono voice |
| Uniform fade-ins | Makes motion mechanical and generic |
| More scroll spectacle | Undermines calm procurement-grade reading |
| Unsourced badges, metrics, or logos | Credibility and legal risk |

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
2. Preserve the Precision Dossier thesis.
3. Preserve the dot-formation and one-accent laws.
4. Use canonical tokens and primitives.
5. Preserve accessibility and reduced-motion behavior.
6. Prefer the quietest solution that still makes hierarchy and state clear.

If the implementation changes these decisions, update DESIGN_SYSTEM.md and this document in the same work. CI configuration and the established quality gate are outside visual-design scope and must not be modified.
