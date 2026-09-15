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
      // Anti-aliasing drifts a little between Chromium builds; a moved
      // heading or a changed band shifts far more pixels than this.
      maxDiffPixelRatio: 0.005,
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
