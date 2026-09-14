// Generates the site's favicon/app-icon set and the contact page social
// preview crop. Deterministic and idempotent: re-running overwrites the same
// output files with byte-for-byte identical results because it always
// starts from the same source SVG/JPEG and fixed pixel geometry.
//
// Usage: node scripts/generate-icons.mjs (wired to `npm run icons`).
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(rootDir, "public");
const brandSvgPath = path.join(publicDir, "brand", "elaman-icon.svg");
const officeJpgPath = path.join(publicDir, "images", "elaman-munich-office.jpg");

const PNG_OPTIONS = { compressionLevel: 9 };

/** Renders an SVG string to a PNG buffer, stripped of metadata, in sRGB. */
async function renderSvgToPng(svg, size) {
  return sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size)
    .toColorspace("srgb")
    .png(PNG_OPTIONS)
    .toBuffer();
}

/**
 * Builds a minimal ICO container (6-byte header + one 16-byte directory
 * entry per image) around already-encoded PNG buffers. Modern Windows and
 * browsers accept PNG-compressed frames inside ICO, so no bitmap
 * re-encoding is needed.
 */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4); // image count

  const directory = Buffer.alloc(16 * entries.length);
  let offset = header.length + directory.length;
  const chunks = [header];

  entries.forEach(({ size, png }, index) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 means 256)
    entry.writeUInt8(0, 2); // color count (0 for PNG-compressed frame)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // bytes in resource
    entry.writeUInt32LE(offset, 12); // offset from file start
    directory.set(entry, index * 16);
    offset += png.length;
  });

  chunks.push(directory, ...entries.map((entry) => entry.png));
  return Buffer.concat(chunks);
}

async function writeFavicon(svg) {
  const sizes = [16, 32, 48];
  const entries = await Promise.all(
    sizes.map(async (size) => ({ size, png: await renderSvgToPng(svg, size) })),
  );
  await writeFile(path.join(publicDir, "favicon.ico"), buildIco(entries));
}

async function writeStandardPngs(svg) {
  const targets = [
    { file: "icon-32.png", size: 32 },
    { file: "icon-192.png", size: 192 },
    { file: "icon-512.png", size: 512 },
  ];

  for (const { file, size } of targets) {
    const png = await renderSvgToPng(svg, size);
    await writeFile(path.join(publicDir, file), png);
  }
}

/** The dot-signet only, without the white rounded-square backdrop rect. */
function signetOnlySvg(svg) {
  return svg.replace(/<rect[^>]*rx="28"[^>]*\/>\s*/, "");
}

async function writeMaskableIcon(svg) {
  const canvasSize = 512;
  const safeZoneRatio = 0.6;
  const glyphSize = Math.round(canvasSize * safeZoneRatio);
  const offset = Math.round((canvasSize - glyphSize) / 2);

  const glyph = await renderSvgToPng(signetOnlySvg(svg), glyphSize);
  const png = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: glyph, left: offset, top: offset }])
    .toColorspace("srgb")
    .png(PNG_OPTIONS)
    .toBuffer();

  await writeFile(path.join(publicDir, "icon-512-maskable.png"), png);
}

async function writeAppleTouchIcon(svg) {
  const canvasSize = 180;
  const marginRatio = 0.12;
  const glyphSize = Math.round(canvasSize * (1 - 2 * marginRatio));
  const offset = Math.round((canvasSize - glyphSize) / 2);

  const glyph = await renderSvgToPng(signetOnlySvg(svg), glyphSize);
  const png = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: glyph, left: offset, top: offset }])
    .toColorspace("srgb")
    .png(PNG_OPTIONS)
    .toBuffer();

  await writeFile(path.join(publicDir, "apple-touch-icon.png"), png);
}

async function writeContactOgImage() {
  // Manual crop (not a plain `fit: "cover"` of the full frame) so the result
  // is deliberately distinct from elaman-company-og.jpg, which uses the
  // full-width, vertically centred crop of the same source photograph. This
  // crop is zoomed into the right two-thirds of the office reception: the
  // illuminated elaman sign is fully visible with headroom above it, and the
  // lit wooden counter runs across the lower third for a calm composition.
  const extract = { left: 330, top: 350, width: 1470, height: 771 };

  await sharp(officeJpgPath)
    .extract(extract)
    .resize(1200, 630, { fit: "cover" })
    .toColorspace("srgb")
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(path.join(publicDir, "images", "elaman-contact-og.jpg"));
}

async function main() {
  const svg = await readFile(brandSvgPath, "utf8");

  await Promise.all([
    writeFavicon(svg),
    writeStandardPngs(svg),
    writeMaskableIcon(svg),
    writeAppleTouchIcon(svg),
    writeContactOgImage(),
  ]);

  console.log("Generated icons and contact OG image in public/.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
