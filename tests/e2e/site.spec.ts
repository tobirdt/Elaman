import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  { language: "de", path: "/de" },
  { language: "en", path: "/en" },
  { language: "de", path: "/de/unternehmen" },
  { language: "en", path: "/en/company" },
  { language: "de", path: "/de/systeme" },
  { language: "en", path: "/en/systems" },
  { language: "de", path: "/de/schutzloesungen" },
  { language: "en", path: "/en/protection" },
  { language: "de", path: "/de/impressum" },
  { language: "en", path: "/en/site-notice" },
  { language: "de", path: "/de/datenschutz" },
  { language: "en", path: "/en/privacy-policy" },
] as const;

test.describe("public route quality", () => {
  for (const route of publicRoutes) {
    test(`${route.path} renders without critical regressions`, async ({
      page,
    }, testInfo) => {
      const consoleErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });

      const response = await page.goto(route.path, { waitUntil: "networkidle" });

      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("html")).toHaveAttribute("lang", route.language);
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
      await page.evaluate(() => document.fonts.ready);

      if (testInfo.project.name === "iphone-webkit") {
        const images = page.locator("img");

        for (let index = 0; index < (await images.count()); index += 1) {
          const image = images.nth(index);
          await image.scrollIntoViewIfNeeded();
          await expect
            .poll(
              () =>
                image.evaluate(
                  (element) =>
                    (element as HTMLImageElement).complete &&
                    (element as HTMLImageElement).naturalWidth > 0,
                ),
              { message: `Image ${index + 1} failed to load on ${route.path}` },
            )
            .toBe(true);
        }

        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      }

      const overflow = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);

      const accessibility = await new AxeBuilder({ page }).analyze();
      const seriousViolations = accessibility.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );

      expect(seriousViolations).toEqual([]);
      expect(consoleErrors).toEqual([]);
    });
  }
});

test("unknown routes serve a complete 404 document without JavaScript", async ({
  request,
}) => {
  // Asserted on the raw server response on purpose: a browser-only check passes
  // even when the server sends Next's blank internal error document, because
  // the client router fills it in on hydration.
  for (const path of [
    "/definitely-not-an-elaman-page",
    "/de/definitely-not-a-page",
    "/en/definitely-not-a-page",
    "/de/unternehmen/extra-segment",
  ]) {
    const response = await request.get(path);
    const body = await response.text();

    expect(response.status(), path).toBe(404);
    expect(body, path).toContain('lang="de"');
    expect(body, path).toContain("Seite nicht gefunden.");
    expect(body, path).not.toContain('id="__next_error__"');
  }
});

test("retired legal URLs redirect permanently to their localised routes", async ({
  request,
}) => {
  for (const [from, to] of [
    ["/imprint", "/de/impressum"],
    ["/private-policy", "/de/datenschutz"],
  ]) {
    const response = await request.get(from, { maxRedirects: 0 });

    expect(response.status(), from).toBe(308);
    expect(response.headers()["location"], from).toContain(to);
  }
});

test("each locale has its own title and description", async ({ request }) => {
  const titles = new Map<string, string>();

  for (const path of ["/de", "/en"]) {
    const body = await (await request.get(path)).text();
    const title = body.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";

    expect(title.length, path).toBeGreaterThan(20);
    titles.set(path, title);
  }

  expect(titles.get("/de")).not.toBe(titles.get("/en"));
  expect(titles.get("/de")).toContain("Sicherheitstechnik");
});

test("security headers and invalid contact payloads are handled safely", async ({
  request,
}) => {
  const homepage = await request.get("/de");
  const contentSecurityPolicy = homepage.headers()["content-security-policy"];

  expect(homepage.ok()).toBe(true);
  expect(contentSecurityPolicy).toContain("default-src 'self'");
  expect(contentSecurityPolicy).toContain("frame-ancestors 'self'");

  const invalidPayload = await request.post("/api/contact", {
    data: "not-json",
    headers: { "Content-Type": "application/json" },
  });

  expect(invalidPayload.status()).toBe(400);
  expect(invalidPayload.headers()["cache-control"]).toBe("no-store");
});

test("the German contact form exposes and focuses validation errors", async ({
  page,
}) => {
  await page.goto("/de#contact", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Anfrage senden" }).click();

  const firstName = page.locator("#firstName");
  await expect(firstName).toBeFocused();
  await expect(firstName).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#firstName-error")).toBeVisible();
});

test("the mobile navigation behaves as a modal and remains keyboard operable", async ({
  isMobile,
  page,
}) => {
  test.skip(!isMobile, "The fullscreen navigation is mobile-only.");

  await page.goto("/de", { waitUntil: "networkidle" });
  const menuButton = page.getByRole("button", { name: "Menü" });
  await menuButton.click();

  const dialog = page.getByRole("dialog", { name: "Hauptnavigation" });
  const panel = page.locator("#mobile-navigation");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(page.locator("main")).toHaveAttribute("aria-hidden", "true");
  expect(
    await page.locator("main").evaluate((element) => (element as HTMLElement).inert),
  ).toBe(true);
  await expect(dialog.locator("[data-mobile-menu-link]").first()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
  await expect(panel).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator("main")).not.toHaveAttribute("aria-hidden", "true");
  expect(
    await page.locator("main").evaluate((element) => (element as HTMLElement).inert),
  ).toBe(false);

  await menuButton.click();
  await panel.getByRole("link", { name: "Unternehmen" }).click();
  await expect(page).toHaveURL(/\/de\/unternehmen$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
