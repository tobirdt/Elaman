// Generates the site's favicon/app-icon set and the contact page social
// preview crop. Deterministic and idempotent: re-running overwrites the same
// output files with byte-for-byte identical results because it always
// starts from the same signet geometry, source JPEG and fixed pixel targets.
//
// Usage: node scripts/generate-icons.mjs (wired to `npm run icons`).
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(rootDir, "public");
const officeJpgPath = path.join(publicDir, "images", "elaman-munich-office.jpg");

const PNG_OPTIONS = { compressionLevel: 9 };

/**
 * The dot signet from the Elaman wordmark: 13 dots on a 6 × 5 grid. The
 * header still uses the hand-authored `public/brand/elaman-icon.svg`; this
 * table is the same mark, kept as data so every icon size can lay it out on
 * its own pixel grid instead of scaling one drawing down until it smears.
 */
const SIGNET = {
  columns: 6,
  rows: 5,
  // The wordmark sets the rows slightly tighter than the columns.
  rowPitchRatio: 21.07 / 22.6,
  dots: [
    { column: 3, row: 0, tone: "light" },
    { column: 2, row: 1, tone: "mid" },
    { column: 3, row: 1, tone: "mid" },
    { column: 4, row: 1, tone: "mid" },
    { column: 5, row: 1, tone: "light" },
    { column: 0, row: 2, tone: "lightest" },
    { column: 1, row: 2, tone: "light" },
    { column: 2, row: 2, tone: "mid" },
    { column: 3, row: 2, tone: "blue" },
    { column: 4, row: 2, tone: "red" },
    { column: 2, row: 3, tone: "mid" },
    { column: 3, row: 3, tone: "mid" },
    { column: 3, row: 4, tone: "light" },
  ],
};

/** Exact brand tones, used wherever the mark is large enough to carry them. */
const BRAND_PALETTE = {
  lightest: "#d2d2d2",
  light: "#b1b1b1",
  mid: "#919191",
  blue: "#244074",
  red: "#d83034",
};

/**
 * Optical compensation for tab-sized renders (16 to 48 px): the two light
 * greys would otherwise dissolve into a white tab strip and the cross would
 * read as a blur around the blue and red dots. The accent colours stay exact.
 */
const COMPACT_PALETTE = {
  ...BRAND_PALETTE,
  lightest: "#c4c4c4",
  light: "#9f9f9f",
  mid: "#7c7c7c",
};

/**
 * Lays the signet out on a square canvas. Either pass an explicit `pitch`
 * (column spacing) and `diameter` for pixel-exact small sizes, or a `margin`
 * plus `dotRatio` (diameter as a share of the pitch) to fill the canvas.
 * With `snap`, dot centres land on whole pixels for even diameters and on
 * half pixels for odd ones, so the rendered discs have crisp edges.
 * `omitColumns` drops whole columns for sizes that cannot fit all six.
 */
function signetSvg({
  size,
  palette,
  margin = 0,
  dotRatio = 0.76,
  pitch: explicitPitch,
  diameter: explicitDiameter,
  snap = false,
  omitColumns = [],
}) {
  const dots = SIGNET.dots.filter(({ column }) => !omitColumns.includes(column));
  const columns = dots.map(({ column }) => column);
  const rows = dots.map(({ row }) => row);
  const firstColumn = Math.min(...columns);
  const firstRow = Math.min(...rows);
  const columnSpan = Math.max(...columns) - firstColumn;
  const rowSpan = Math.max(...rows) - firstRow;

  const pitch = explicitPitch ?? (size - 2 * margin) / (columnSpan + dotRatio);
  const diameter = explicitDiameter ?? pitch * dotRatio;
  const rowPitch = snap ? pitch : pitch * SIGNET.rowPitchRatio;

  const clusterWidth = columnSpan * pitch + diameter;
  const clusterHeight = rowSpan * rowPitch + diameter;

  const snapCenter = (value) => {
    if (!snap) return value;
    return diameter % 2 === 0 ? Math.round(value) : Math.floor(value) + 0.5;
  };

  const originX = snapCenter((size - clusterWidth) / 2 + diameter / 2);
  const originY = snapCenter((size - clusterHeight) / 2 + diameter / 2);
  const radius = diameter / 2;
  const format = (value) => Number(value.toFixed(3)).toString();

  const circles = dots
    .map(({ column, row, tone }) => {
      const cx = format(originX + (column - firstColumn) * pitch);
      const cy = format(originY + (row - firstRow) * rowPitch);
      return `  <circle cx="${cx}" cy="${cy}" r="${format(radius)}" fill="${palette[tone]}" />`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Elaman">
${circles}
</svg>
`;
}

/** Renders an SVG string to a PNG buffer, stripped of metadata, in sRGB. */
async function renderSvgToPng(svg, size) {
  return sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size)
    .toColorspace("srgb")
    .png(PNG_OPTIONS)
    .toBuffer();
}

/** Composites a transparent glyph onto an opaque white square. */
async function onWhiteTile(glyph, size) {
  return sharp({
    create: { width: size, height: size, channels: 4, background: "#ffffff" },
  })
    .composite([{ input: glyph }])
    .toColorspace("srgb")
    .png(PNG_OPTIONS)
    .toBuffer();
}

/**
 * Tab-sized frames with hand-set pitch and diameter, all snapped to the
 * pixel grid. At 32 px the dots are 4 px discs on a 5 px grid, at 48 px
 * 5 px discs on a 7 px grid. 16 px cannot fit six columns as whole pixels
 * (six 2 px discs need 17 px), and squeezing them in smears the cross into
 * a grey blur. That frame therefore drops the outermost, lightest dot and
 * sets the remaining twelve as 2 px discs on a 3 px grid.
 */
const TAB_FRAMES = {
  16: { pitch: 3, diameter: 2, snap: true, omitColumns: [0] },
  32: { pitch: 5, diameter: 4, snap: true },
  48: { pitch: 7, diameter: 5, snap: true },
};

function tabFrameSvg(size) {
  return signetSvg({ size, palette: COMPACT_PALETTE, ...TAB_FRAMES[size] });
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

async function writeFavicon() {
  const entries = await Promise.all(
    Object.keys(TAB_FRAMES).map(async (key) => {
      const size = Number(key);
      return { size, png: await renderSvgToPng(tabFrameSvg(size), size) };
    }),
  );
  await writeFile(path.join(publicDir, "favicon.ico"), buildIco(entries));
}

async function writeStandardPngs() {
  await writeFile(
    path.join(publicDir, "icon-32.png"),
    await renderSvgToPng(tabFrameSvg(32), 32),
  );

  for (const size of [192, 512]) {
    const svg = signetSvg({ size, palette: BRAND_PALETTE, margin: size * 0.08 });
    await writeFile(
      path.join(publicDir, `icon-${size}.png`),
      await renderSvgToPng(svg, size),
    );
  }
}

/** Maskable icons keep the mark inside the central 80 % safe zone. */
async function writeMaskableIcon() {
  const size = 512;
  const svg = signetSvg({ size, palette: BRAND_PALETTE, margin: size * 0.2 });
  const glyph = await renderSvgToPng(svg, size);
  await writeFile(
    path.join(publicDir, "icon-512-maskable.png"),
    await onWhiteTile(glyph, size),
  );
}

async function writeAppleTouchIcon() {
  const size = 180;
  const svg = signetSvg({ size, palette: BRAND_PALETTE, margin: size * 0.14 });
  const glyph = await renderSvgToPng(svg, size);
  await writeFile(
    path.join(publicDir, "apple-touch-icon.png"),
    await onWhiteTile(glyph, size),
  );
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
  await Promise.all([
    writeFavicon(),
    writeStandardPngs(),
    writeMaskableIcon(),
    writeAppleTouchIcon(),
    writeContactOgImage(),
  ]);

  console.log("Generated icons and contact OG image in public/.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
