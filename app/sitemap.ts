import type { MetadataRoute } from "next";

import {
  contactPagePath,
  detailPageKinds,
  detailPagePath,
  homePath,
  legalPageKinds,
  legalPagePath,
  locales,
} from "@/lib/i18n";
import { contentDate, type ContentKey } from "@/lib/seo/content-dates";
import { absoluteUrl } from "@/lib/seo/site";

type SitemapEntry = {
  route: string;
  content: ContentKey;
  priority: number;
  changeFrequency: "monthly" | "yearly";
  alternates: Record<string, string>;
};

const homeEntries: SitemapEntry[] = locales.map((locale) => ({
  route: homePath(locale),
  content: "home",
  priority: locale === "de" ? 1 : 0.9,
  changeFrequency: "monthly",
  alternates: {
    de: absoluteUrl(homePath("de")),
    en: absoluteUrl(homePath("en")),
    "x-default": absoluteUrl(homePath("de")),
  },
}));

const contactEntries: SitemapEntry[] = locales.map((locale) => ({
  route: contactPagePath(locale),
  content: "contact",
  priority: 0.8,
  changeFrequency: "monthly",
  alternates: {
    de: absoluteUrl(contactPagePath("de")),
    en: absoluteUrl(contactPagePath("en")),
    "x-default": absoluteUrl(contactPagePath("de")),
  },
}));

const detailEntries: SitemapEntry[] = detailPageKinds.flatMap((kind) =>
  locales.map((locale) => ({
    route: detailPagePath(locale, kind),
    content: kind,
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
    content: kind,
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
  return [...homeEntries, ...detailEntries, ...contactEntries, ...legalEntries].map(
    (entry) => ({
      url: absoluteUrl(entry.route),
      lastModified: contentDate(entry.content),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages: entry.alternates },
    }),
  );
}
