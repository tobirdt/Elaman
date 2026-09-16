import {
  detailPageKinds,
  legalPageKinds,
  type DetailPageKind,
  type LegalPageKind,
} from "@/lib/i18n";

export type ContentKey = "home" | "contact" | DetailPageKind | LegalPageKind;

/**
 * The file each route's copy lives in. The sitemap's `lastmod` follows the
 * last commit to that file, and `tests/unit/content-dates.test.ts` fails when
 * the date below is older than that commit, so a copy change cannot ship
 * with a stale date.
 */
export const contentSources: Record<ContentKey, readonly string[]> = {
  home: ["lib/content/site.ts"],
  company: ["lib/content/detail-pages.ts"],
  solutions: ["lib/content/detail-pages.ts"],
  contact: ["lib/content/contact-page.ts"],
  imprint: ["lib/content/legal.ts"],
  privacy: ["lib/content/legal.ts"],
};

/**
 * Date of the last substantive content change per route, as `YYYY-MM-DD`.
 * Kept in code rather than read from git at build time: the hosting
 * provider clones shallowly, and a shallow clone reports the clone boundary
 * as the last change to every file, which would tell crawlers that every
 * page changed on every deploy. Bump the date together with the copy; the
 * unit test says which one when it is forgotten.
 */
export const contentLastModified: Record<ContentKey, string> = {
  home: "2026-09-15",
  company: "2026-09-15",
  solutions: "2026-09-15",
  contact: "2026-09-15",
  imprint: "2026-09-15",
  privacy: "2026-09-15",
};

export function contentDate(key: ContentKey): Date {
  return new Date(`${contentLastModified[key]}T00:00:00.000Z`);
}

export const contentKeys: readonly ContentKey[] = [
  "home",
  ...detailPageKinds,
  "contact",
  ...legalPageKinds,
];
