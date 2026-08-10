import type { MetadataRoute } from "next";

import { detailPageKinds, detailPagePath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo/site";

type SitemapEntry = {
  route: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
  alternates?: Record<string, string>;
};

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

const legalEntries: SitemapEntry[] = [
  { route: "/imprint", priority: 0.4, changeFrequency: "yearly" },
  { route: "/private-policy", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [...homeEntries, ...detailEntries, ...legalEntries].map((entry) => ({
    url: absoluteUrl(entry.route),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    ...(entry.alternates
      ? {
          alternates: {
            languages: entry.alternates,
          },
        }
      : {}),
  }));
}
