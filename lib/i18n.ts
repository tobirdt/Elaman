export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const detailPageKinds = ["company", "systems"] as const;
export type DetailPageKind = (typeof detailPageKinds)[number];

export const legalPageKinds = ["imprint", "privacy"] as const;
export type LegalPageKind = (typeof legalPageKinds)[number];

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

const legalPageSlugs: Record<LegalPageKind, Record<Locale, string>> = {
  imprint: {
    de: "impressum",
    en: "site-notice",
  },
  privacy: {
    de: "datenschutz",
    en: "privacy-policy",
  },
};

export function legalPagePath(locale: Locale, kind: LegalPageKind) {
  return `/${locale}/${legalPageSlugs[kind][locale]}`;
}

export function legalPageKindFromSlug(
  locale: Locale,
  slug: readonly string[],
): LegalPageKind | null {
  if (slug.length !== 1) {
    return null;
  }

  return legalPageKinds.find((kind) => legalPageSlugs[kind][locale] === slug[0]) ?? null;
}
