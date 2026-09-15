#!/usr/bin/env node
/**
 * Recompresses the screenshot baselines losslessly. Playwright writes PNGs
 * quickly rather than small; the same pixels at maximum deflate effort take
 * about half the space, and the comparison decodes them either way.
 *
 *   node scripts/compress-screenshots.mjs
 */
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const directory = "tests/e2e/__screenshots__";
let before = 0;
let after = 0;

for (const name of await readdir(directory)) {
  if (!name.endsWith(".png")) {
    continue;
  }

  const file = join(directory, name);
  before += (await stat(file)).size;

  const buffer = await sharp(file)
    .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
    .toBuffer();
  await sharp(buffer).toFile(file);
  after += buffer.length;
}

console.log(
  `${directory}: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`,
);
