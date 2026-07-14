# Redesign exploration — visual evidence

This index records the Playwright evidence for the `redesign-exploration` vertical slice. The baseline was captured before implementation; the after set covers the redesigned header, hero, and formation story.

## Verification summary

- Viewports: `375×812`, `768×900`, `1280×900`, and `1600×900`
- Locales: English and German
- Horizontal overflow: `0px` in all eight combinations
- Hero headline lines: EN `3 / 2 / 3 / 3`; DE `3 / 3 / 3 / 3` at the viewports above
- Hero formation: exactly one blue point and no red point in every combination
- Story: continuous `field → columns → chain → perimeter → block → diamond` desktop morph; protection red begins at step 04
- Mobile navigation: animated open/close, Escape closes and restores trigger focus, outside click closes
- Reduced motion: no running animations after load and no hydration errors
- Final normal-motion Playwright matrix: zero console errors; a prolonged dev-server smoke emitted only Next-generated Geist font-preload timing warnings

## Before — full-page baseline

| Locale | 375px | 1280px |
|---|---|---|
| EN | [Full page](output/playwright/redesign-exploration/before/en-375/full-page.png) | [Full page](output/playwright/redesign-exploration/before/en-1280/full-page.png) |
| DE | [Full page](output/playwright/redesign-exploration/before/de-375/full-page.png) | [Full page](output/playwright/redesign-exploration/before/de-1280/full-page.png) |

The same baseline folders also contain viewport screenshots for every original section: `hero`, `experience`, `story`, `capabilities`, `systems`, `protection`, `delivery`, and `contact`.

## Before — comparable slice views

| Locale / viewport | Hero | Story |
|---|---|---|
| EN / 375 | [Hero](output/playwright/redesign-exploration/before/en-375/hero.png) | [Story](output/playwright/redesign-exploration/before/en-375/story.png) |
| DE / 375 | [Hero](output/playwright/redesign-exploration/before/de-375/hero.png) | [Story](output/playwright/redesign-exploration/before/de-375/story.png) |
| EN / 1280 | [Hero](output/playwright/redesign-exploration/before/en-1280/hero.png) | [Story](output/playwright/redesign-exploration/before/en-1280/story.png) |
| DE / 1280 | [Hero](output/playwright/redesign-exploration/before/de-1280/hero.png) | [Story](output/playwright/redesign-exploration/before/de-1280/story.png) |

## After — verified vertical slice

Story 01 shows the neutral opening formation. Story 04 shows the first protection state and its single red point.

| Locale / viewport | Hero + header | Story 01 | Story 04 |
|---|---|---|---|
| EN / 375 | [Hero](output/playwright/redesign-exploration/after/en-375/hero.png) | [Story 01](output/playwright/redesign-exploration/after/en-375/story-01.png) | [Story 04](output/playwright/redesign-exploration/after/en-375/story-04.png) |
| DE / 375 | [Hero](output/playwright/redesign-exploration/after/de-375/hero.png) | [Story 01](output/playwright/redesign-exploration/after/de-375/story-01.png) | [Story 04](output/playwright/redesign-exploration/after/de-375/story-04.png) |
| EN / 768 | [Hero](output/playwright/redesign-exploration/after/en-768/hero.png) | [Story 01](output/playwright/redesign-exploration/after/en-768/story-01.png) | [Story 04](output/playwright/redesign-exploration/after/en-768/story-04.png) |
| DE / 768 | [Hero](output/playwright/redesign-exploration/after/de-768/hero.png) | [Story 01](output/playwright/redesign-exploration/after/de-768/story-01.png) | [Story 04](output/playwright/redesign-exploration/after/de-768/story-04.png) |
| EN / 1280 | [Hero](output/playwright/redesign-exploration/after/en-1280/hero.png) | [Story 01](output/playwright/redesign-exploration/after/en-1280/story-01.png) | [Story 04](output/playwright/redesign-exploration/after/en-1280/story-04.png) |
| DE / 1280 | [Hero](output/playwright/redesign-exploration/after/de-1280/hero.png) | [Story 01](output/playwright/redesign-exploration/after/de-1280/story-01.png) | [Story 04](output/playwright/redesign-exploration/after/de-1280/story-04.png) |
| EN / 1600 | [Hero](output/playwright/redesign-exploration/after/en-1600/hero.png) | [Story 01](output/playwright/redesign-exploration/after/en-1600/story-01.png) | [Story 04](output/playwright/redesign-exploration/after/en-1600/story-04.png) |
| DE / 1600 | [Hero](output/playwright/redesign-exploration/after/de-1600/hero.png) | [Story 01](output/playwright/redesign-exploration/after/de-1600/story-01.png) | [Story 04](output/playwright/redesign-exploration/after/de-1600/story-04.png) |

Additional interaction evidence: [German mobile menu](output/playwright/redesign-exploration/after/de-375/header-menu.png).

## Quality gates

- `npm run lint` — passed
- `npm run typecheck` — passed
- `npm run build` — passed from a clean temporary copy using the same lockfile; the iCloud workspace itself stalled while reading dataless `node_modules`, so `npm ci` was run only in the temporary build copy
