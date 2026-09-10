import type { MetadataRoute } from "next";

import {
  detailPageKinds,
  detailPagePath,
  legalPageKinds,
  legalPagePath,
  locales,
} from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo/site";

type SitemapEntry = {
  route: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
  alternates: Record<string, string>;
};

/**
 * Date of the last substantive content change. Bump it when copy changes.
 * Deriving this from the build time would tell crawlers that every page
 * changed on every deploy, which devalues the signal.
 */
const contentLastModified = new Date("2026-09-10T00:00:00.000Z");

const homeEntries: SitemapEntry[] = locales.map((locale) => ({
  route: `/${locale}`,
  priority: locale === "de" ? 1 : 0.9,
  changeFrequency: "monthly",
  alternates: {
    de: absoluteUrl("/de"),
    en: absoluteUrl("/en"),
    "x-default": absoluteUrl("/de"),
  },
}));

const detailEntries: SitemapEntry[] = detailPageKinds.flatMap((kind) =>
  locales.map((locale) => ({
    route: detailPagePath(locale, kind),
    priority: locale === "de" ? 0.8 : 0.7,
    changeFrequency: "monthly" as const,
    alternates: {
      de: absoluteUrl(detailPagePath("de", kind)),
      en: absoluteUrl(detailPagePath("en", kind)),
      "x-default": absoluteUrl(detailPagePath("de", kind)),
    },
  })),
);

const legalEntries: SitemapEntry[] = legalPageKinds.flatMap((kind) =>
  locales.map((locale) => ({
    route: legalPagePath(locale, kind),
    priority: 0.3,
    changeFrequency: "yearly" as const,
    alternates: {
      de: absoluteUrl(legalPagePath("de", kind)),
      en: absoluteUrl(legalPagePath("en", kind)),
      "x-default": absoluteUrl(legalPagePath("de", kind)),
    },
  })),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...homeEntries, ...detailEntries, ...legalEntries].map((entry) => ({
    url: absoluteUrl(entry.route),
    lastModified: contentLastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: { languages: entry.alternates },
  }));
}
