#!/usr/bin/env node
/**
 * Lighthouse budget. Starts the production server, audits four routes on
 * the mobile profile three times each, and fails when the median score of
 * any category falls under its floor. Chromium comes from Playwright, so the
 * run uses the same browser as the end-to-end suite and needs no Chrome on
 * the machine.
 *
 *   npm run build && npm run lighthouse
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";

const port = 3002;
const debugPort = 9333;
const origin = `http://127.0.0.1:${port}`;
const routes = ["/de", "/de/unternehmen", "/de/systeme", "/de/kontakt"];
const runs = 3;
// Performance on a static site moves two or three points between runs of
// the simulated mobile profile even on the same machine; a regression that
// matters (an unoptimised image, a script in the critical path, a layout
// shift) costs ten or more. The floor sits below the noise and above the
// damage. The other three categories are deterministic and must stay full.
const floors = {
  performance: 0.9,
  accessibility: 1,
  "best-practices": 1,
  seo: 1,
};

async function waitForServer(url, attempts = 60) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // not up yet
    }
    await sleep(500);
  }
  throw new Error(`Server at ${url} did not come up`);
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

// Own process group, so that stopping the server also stops the
// `next-server` worker it forks; killing the launcher alone leaves the
// worker running with the port.
const server = spawn("npx", ["next", "start", "--port", String(port)], {
  stdio: ["ignore", "ignore", "inherit"],
  env: { ...process.env, NODE_ENV: "production" },
  detached: true,
});

let browser;
let failed = false;

try {
  await waitForServer(`${origin}/de`);
  browser = await chromium.launch({
    args: [`--remote-debugging-port=${debugPort}`],
  });

  for (const route of routes) {
    const scores = Object.fromEntries(Object.keys(floors).map((key) => [key, []]));

    for (let run = 0; run < runs; run += 1) {
      const result = await lighthouse(`${origin}${route}`, {
        port: debugPort,
        output: "json",
        logLevel: "silent",
        onlyCategories: Object.keys(floors),
      });

      for (const key of Object.keys(floors)) {
        scores[key].push(result.lhr.categories[key].score ?? 0);
      }
    }

    const line = Object.keys(floors)
      .map((key) => {
        const value = median(scores[key]);
        const ok = value >= floors[key];
        failed ||= !ok;
        return `${key} ${Math.round(value * 100)}${ok ? "" : ` (floor ${Math.round(floors[key] * 100)})`}`;
      })
      .join("  ");

    console.log(`${route.padEnd(18)} ${line}`);
  }
} finally {
  await browser?.close();
  if (server.pid) {
    process.kill(-server.pid, "SIGTERM");
  }
}

if (failed) {
  console.error("Lighthouse budget not met.");
  process.exit(1);
}
