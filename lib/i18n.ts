export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const detailPageKinds = ["company", "systems", "protection"] as const;
export type DetailPageKind = (typeof detailPageKinds)[number];

export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function homePath(locale: Locale) {
  return `/${locale}`;
}

export function sectionPath(locale: Locale, href: string) {
  return href.startsWith("#") ? `${homePath(locale)}${href}` : href;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "de" : "en";
}

const detailPageSlugs: Record<DetailPageKind, Record<Locale, string>> = {
  company: {
    de: "unternehmen",
    en: "company",
  },
  systems: {
    de: "systeme",
    en: "systems",
  },
  protection: {
    de: "schutzloesungen",
    en: "protection",
  },
};

export function detailPagePath(locale: Locale, kind: DetailPageKind) {
  return `/${locale}/${detailPageSlugs[kind][locale]}`;
}

export function detailPageKindFromSlug(
  locale: Locale,
  slug: readonly string[],
): DetailPageKind | null {
  if (slug.length !== 1) {
    return null;
  }

  return (
    detailPageKinds.find((kind) => detailPageSlugs[kind][locale] === slug[0]) ?? null
  );
}
