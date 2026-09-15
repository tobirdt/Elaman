import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;
const isCI = Boolean(process.env.CI);

// CI runs the suite against the production server so the assertions describe
// what is actually deployed — dev-only overlays, unminified output and relaxed
// dev CSP would otherwise hide real regressions. Locally `next dev` stays the
// default so a running dev server can simply be reused.
const localWebServerCommand = isCI
  ? "npm run start -- --port 3001"
  : "npm run dev -- --port 3001";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : 3,
  reporter: "list",
  // One flat folder of baselines. The visual suite runs on one project and
  // one platform only, so the project and platform suffixes would just repeat.
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      // `threshold` is the per-pixel colour tolerance and it is what absorbs
      // anti-aliasing drift between Chromium builds. `maxDiffPixelRatio` then
      // only has to allow the few pixels that drift past it, so it is small:
      // the denominator is the whole full-page screenshot, roughly a million
      // pixels, and at the 0.005 this started with, a two-line copy change on
      // the contact page measured 0.003 and passed unnoticed. At 0.0005 that
      // same change is caught six times over. If a CI run ever fails with a
      // ratio just above this and nothing in the page actually moved, raise it
      // to the number that run reported rather than back to a round guess.
      maxDiffPixelRatio: 0.0005,
      threshold: 0.2,
    },
  },
  use: {
    baseURL: externalBaseUrl ?? "http://127.0.0.1:3001",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: externalBaseUrl
    ? undefined
    : {
        command: localWebServerCommand,
        reuseExistingServer: !isCI,
        timeout: 120_000,
        url: "http://127.0.0.1:3001/de",
      },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "iphone-webkit",
      use: { ...devices["iPhone 15"] },
    },
    {
      name: "iphone-landscape-webkit",
      use: { ...devices["iPhone 15 landscape"] },
    },
  ],
});
