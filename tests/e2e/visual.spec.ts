import { expect, test } from "@playwright/test";

/**
 * Pixel comparison of every route at a phone and a desktop width. Baselines
 * live in `tests/e2e/__screenshots__` and are refreshed with
 * `npm run test:visual:update` after an intended visual change.
 *
 * The comparison runs only in CI and only on Chromium: there the platform,
 * browser build and fonts are fixed, so a difference is a change to the
 * site rather than to the machine. Motion is switched off through the
 * reduced-motion preference, which the site honours by rendering the final
 * state outright, so no frame of an entrance or a scroll-linked reveal can
 * land in a picture. Photographs are masked: their placement and size are
 * still compared, their pixels are not, because JPEG decoding is the one
 * thing that legitimately differs between browser builds, and a page of
 * flat colour and text compresses to a fraction of the size.
 */
const routes = [
  "/de",
  "/en",
  "/de/unternehmen",
  "/en/company",
  "/de/loesungen",
  "/en/solutions",
  "/de/kontakt",
  "/en/contact",
  "/de/impressum",
  "/en/site-notice",
  "/de/datenschutz",
  "/en/privacy-policy",
] as const;

const viewports = [
  { name: "phone", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

test.describe("visual regression", () => {
  test.use({ reducedMotion: "reduce" });

  for (const viewport of viewports) {
    for (const path of routes) {
      test(`${path} at ${viewport.name}`, async ({ page }) => {
        test.skip(
          !process.env.CI || test.info().project.name !== "desktop-chromium",
          "Screenshots are compared only in CI on Chromium, where the platform is fixed.",
        );

        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(path, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);

        await expect(page).toHaveScreenshot(
          `${path.slice(1).replace(/\//g, "-")}-${viewport.name}.png`,
          {
            fullPage: true,
            animations: "disabled",
            caret: "hide",
            mask: [page.locator("img")],
          },
        );
      });
    }
  }
});
