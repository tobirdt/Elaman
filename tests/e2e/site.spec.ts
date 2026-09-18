import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  { language: "de", path: "/de" },
  { language: "en", path: "/en" },
  { language: "de", path: "/de/unternehmen" },
  { language: "en", path: "/en/company" },
  { language: "de", path: "/de/loesungen" },
  { language: "en", path: "/en/solutions" },
  { language: "de", path: "/de/kontakt" },
  { language: "en", path: "/en/contact" },
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
    "/de/schutzloesungen",
    "/en/protection",
  ]) {
    const response = await request.get(path);
    const body = await response.text();

    expect(response.status(), path).toBe(404);
    expect(body, path).toContain('lang="de"');
    expect(body, path).toContain("Seite nicht gefunden.");
    expect(body, path).not.toContain('id="__next_error__"');
  }
});

test("the homepages expose the approved bilingual portfolio", async ({ page }) => {
  for (const route of [
    {
      path: "/de",
      tagline: "Das Bindeglied zwischen Vertrauen und Sicherheit.",
      excludedNavigation: "Schutzlösungen",
    },
    {
      path: "/en",
      tagline: "The link between trust and security.",
      excludedNavigation: "Protection",
    },
  ]) {
    await page.goto(route.path, { waitUntil: "networkidle" });

    await expect(page.getByText(route.tagline, { exact: true })).toBeVisible();
    await expect(page.getByText("25+", { exact: true })).toHaveCount(1);
    await expect(page.locator("#solutions li")).toHaveCount(5);
    await expect(page.locator("#protection")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: route.excludedNavigation, exact: true }),
    ).toHaveCount(0);
  }
});

test("the bare origin sends each browser to the homepage in its own language", async ({
  request,
}) => {
  for (const [acceptLanguage, destination] of [
    ["en-GB,en;q=0.9,de;q=0.8", "/en"],
    ["de-DE,de;q=0.9,en;q=0.8", "/de"],
    ["fr-FR,fr;q=0.9", "/de"],
    [undefined, "/de"],
  ] as const) {
    const response = await request.get("/", {
      headers: acceptLanguage ? { "accept-language": acceptLanguage } : {},
      maxRedirects: 0,
    });

    expect(response.status(), `Accept-Language: ${acceptLanguage}`).toBe(307);
    expect(response.headers().location, `Accept-Language: ${acceptLanguage}`).toBe(
      destination,
    );
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
  await page.goto("/de/kontakt", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Anfrage senden" }).click();

  const firstName = page.locator("#firstName");
  await expect(firstName).toBeFocused();
  await expect(firstName).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#firstName-error")).toBeVisible();
});

test("the desktop header exposes the five global destinations, home first", async ({
  isMobile,
  page,
}) => {
  test.skip(Boolean(isMobile), "The inline navigation is desktop-only.");

  await page.goto("/de", { waitUntil: "networkidle" });

  // The portal sits inside the navigation, not beside it: it is an entry in
  // the same list, set like the rest, and anything reading the menu out loud
  // should find it there rather than as a stray control afterwards.
  const navigation = page.getByRole("navigation", { name: "Hauptnavigation" }).first();
  await expect(navigation.getByRole("link")).toHaveText([
    "Start",
    "Unternehmen",
    "Lösungen",
    "Kontakt",
    "Login",
  ]);
  await expect(navigation.getByRole("link", { name: "Vorgehen" })).toHaveCount(0);

  await expect(page.locator("main form")).toHaveCount(0);
  await expect(page.locator('main a[href="/de/kontakt"]')).toHaveCount(1);
});

test("home is the first named entry in the menu, and the signet still leads there", async ({
  isMobile,
  page,
}) => {
  test.skip(Boolean(isMobile), "The inline navigation is desktop-only.");

  await page.goto("/de/loesungen", { waitUntil: "networkidle" });

  const header = page.locator("header");
  const navigation = header.getByRole("navigation", { name: "Hauptnavigation" }).first();
  const home = navigation.getByRole("link", { name: "Start", exact: true });

  await expect(navigation.getByRole("link").first()).toHaveText("Start");

  await home.click();
  await expect(page).toHaveURL(/\/de$/);
  // The named entry carries the current-page rule; the signet is the mark.
  await expect(home).toHaveAttribute("aria-current", "page");

  // The signet leads to the same page and is told apart by its accessible
  // name, not by its text: "Zur Elaman-Startseite" contains "Start".
  const signet = header.getByRole("link", { name: "Zur Elaman-Startseite", exact: true });
  await expect(signet).toHaveCount(1);
  await expect(signet).toHaveAttribute("href", "/de");
  await expect(signet).not.toHaveAttribute("aria-current", "page");
});

test("the renamed solutions page keeps its old address working", async ({ request }) => {
  for (const [from, to] of [
    ["/de/systeme", "/de/loesungen"],
    ["/en/systems", "/en/solutions"],
  ] as const) {
    const response = await request.get(from, { maxRedirects: 0 });

    expect(response.status(), from).toBe(308);
    expect(response.headers().location, from).toBe(to);
  }
});

test("the header reaches the contact page from a dossier", async ({ isMobile, page }) => {
  test.skip(Boolean(isMobile), "The inline navigation is desktop-only.");

  await page.goto("/de/loesungen", { waitUntil: "networkidle" });
  await page
    .getByRole("navigation", { name: "Hauptnavigation" })
    .first()
    .getByRole("link", { name: "Kontakt", exact: true })
    .click();

  await expect(page).toHaveURL(/\/de\/kontakt$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Sprechen Sie mit uns.",
  );
});

test("the footer carries the global navigation and the legal routes", async ({
  page,
}) => {
  await page.goto("/de/unternehmen", { waitUntil: "networkidle" });

  const footerNavigation = page.getByRole("navigation", {
    name: "Navigation im Fußbereich",
  });
  await expect(footerNavigation.getByRole("link")).toHaveText([
    "Start",
    "Unternehmen",
    "Lösungen",
    "Kontakt",
  ]);
  await expect(page.locator('footer a[href="/de/impressum"]').first()).toBeVisible();
  await expect(page.locator('footer a[href^="tel:"]')).toBeVisible();
});

test("the sitemap lists both contact routes", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();

  expect(sitemap).toContain("/de/kontakt");
  expect(sitemap).toContain("/en/contact");
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

const subpages = [
  { path: "/de/unternehmen", current: "Unternehmen" },
  { path: "/de/loesungen", current: "Lösungen" },
  { path: "/de/kontakt", current: "Kontakt" },
  { path: "/de/impressum", current: "Impressum" },
  { path: "/de/datenschutz", current: "Datenschutz" },
  { path: "/de/gibt-es-nicht", current: "Seite nicht gefunden" },
] as const;

/**
 * The regression this guards against is disorientation: before the shared
 * page header, every subpage opened with its own geometry, so a visitor could
 * not tell one level from another. The title now starts at the same place, at
 * the same size, under the same breadcrumb, on all of them.
 */
test("every subpage opens with the same header geometry and breadcrumb", async ({
  page,
}) => {
  const openings: { left: number; top: number; size: string }[] = [];

  for (const subpage of subpages) {
    await page.goto(subpage.path, { waitUntil: "networkidle" });

    const breadcrumb = page.getByRole("navigation", { name: "Navigationspfad" });
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.getByRole("link", { name: "Start" })).toHaveAttribute(
      "href",
      "/de",
    );
    await expect(breadcrumb).toContainText(subpage.current);

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toHaveCount(1);

    const box = await heading.boundingBox();
    expect(box).not.toBeNull();
    openings.push({
      left: Math.round(box!.x),
      top: Math.round(box!.y),
      size: await heading.evaluate((element) => getComputedStyle(element).fontSize),
    });
  }

  const [first, ...rest] = openings;
  for (const opening of rest) {
    expect(opening).toEqual(first);
  }
});

test("the homepage keeps the full first screen to itself", async ({ page }) => {
  await page.goto("/de", { waitUntil: "networkidle" });
  const homeOpening = await page.locator("main > section").first().boundingBox();

  await page.goto("/de/unternehmen", { waitUntil: "networkidle" });
  const subpageOpening = await page.locator("main section").first().boundingBox();

  const viewport = page.viewportSize()!;
  expect(homeOpening!.height).toBeGreaterThan(viewport.height * 0.7);
  expect(subpageOpening!.height).toBeLessThan(homeOpening!.height);
});

/**
 * The second half of the wayfinding rule. The page header fixed where a page
 * starts; this fixes where everything below it starts. Before the shared
 * section intro, headings began at six different left edges on one screen
 * width and the eye had no line to follow down a page.
 */
test("every section heading sits on the page's own left edge", async ({ page }) => {
  for (const path of ["/de", "/de/unternehmen", "/de/loesungen", "/de/kontakt"]) {
    await page.goto(path, { waitUntil: "networkidle" });

    const edges = await page.evaluate(() => {
      const headings = [...document.querySelectorAll("main h2")];
      return [
        ...new Set(headings.map((h) => Math.round(h.getBoundingClientRect().left))),
      ];
    });

    expect(edges, `${path} uses more than one left edge for its sections`).toHaveLength(
      1,
    );

    if (path !== "/de") {
      const titleEdge = await page
        .locator("main h1")
        .first()
        .evaluate((h) => Math.round(h.getBoundingClientRect().left));
      expect(titleEdge, `${path} parts its title from its sections`).toBe(edges[0]);
    }
  }
});

test("the homepage names the subpages' lists and the subpages explain them", async ({
  page,
}) => {
  // Breadcrumb list items carry no paragraph, so counting paragraphs inside
  // list items counts descriptions and nothing else.
  await page.goto("/de", { waitUntil: "networkidle" });
  await expect(page.locator("#advice li")).toHaveCount(4);
  await expect(page.locator("#advice li p")).toHaveCount(0);
  await expect(page.locator("#solutions li p")).toHaveCount(0);

  await page.goto("/de/unternehmen", { waitUntil: "networkidle" });
  await expect(page.locator("main ol li p")).toHaveCount(4);

  await page.goto("/de/loesungen", { waitUntil: "networkidle" });
  await expect(page.locator("main ol li p")).toHaveCount(5);
});
