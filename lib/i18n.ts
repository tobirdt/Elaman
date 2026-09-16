import type { Route } from "next";

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const detailPageKinds = ["company", "solutions"] as const;
export type DetailPageKind = (typeof detailPageKinds)[number];

export const legalPageKinds = ["imprint", "privacy"] as const;
export type LegalPageKind = (typeof legalPageKinds)[number];

export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Picks the locale for a visitor who arrives at `/` from the browser's
 * `Accept-Language` header. The header lists language ranges with an
 * optional weight (`en-GB,en;q=0.9,de;q=0.8`); the highest-weighted range
 * whose primary subtag is one of ours wins, ties fall to the order in the
 * header, and a header that names neither language, or no header at all,
 * lands on the default. Only the primary subtag counts: `en-US` and `en-GB`
 * are both English to this site.
 */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) {
    return defaultLocale;
  }

  const ranges = header
    .split(",")
    .map((range, index) => {
      const [tag = "", ...params] = range.trim().split(";");
      const weightParam = params
        .map((param) => param.trim())
        .find((param) => param.startsWith("q="));
      const weight = weightParam ? Number(weightParam.slice(2)) : 1;
      const primary = tag.trim().toLowerCase().split("-")[0];

      return { primary, weight: Number.isFinite(weight) ? weight : 0, index };
    })
    .filter((range) => range.weight > 0 && isLocale(range.primary))
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  const best = ranges[0];

  return best && isLocale(best.primary) ? best.primary : defaultLocale;
}

/**
 * Every internal path is composed at runtime from a locale and a slug table,
 * so `typedRoutes` — which only validates literal hrefs — cannot check it.
 * The assertion therefore happens once, here. Content files and components
 * consume the `Route` values these helpers return and carry no casts of their
 * own; a wrong path is caught by the route tests, not by scattered `as Route`.
 */
function route(path: string): Route {
  return path as Route;
}

export function homePath(locale: Locale): Route {
  return route(`/${locale}`);
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "de" : "en";
}

const detailPageSlugs: Record<DetailPageKind, Record<Locale, string>> = {
  company: {
    de: "unternehmen",
    en: "company",
  },
  solutions: {
    de: "loesungen",
    en: "solutions",
  },
};

export function detailPageSlug(locale: Locale, kind: DetailPageKind) {
  return detailPageSlugs[kind][locale];
}

export function detailPagePath(locale: Locale, kind: DetailPageKind): Route {
  return route(`/${locale}/${detailPageSlugs[kind][locale]}`);
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

const contactPageSlugs: Record<Locale, string> = {
  de: "kontakt",
  en: "contact",
};

export function contactPageSlug(locale: Locale) {
  return contactPageSlugs[locale];
}

export function contactPagePath(locale: Locale): Route {
  return route(`/${locale}/${contactPageSlugs[locale]}`);
}

export function isContactPageSlug(locale: Locale, slug: readonly string[]) {
  return slug.length === 1 && slug[0] === contactPageSlugs[locale];
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

export function legalPageSlug(locale: Locale, kind: LegalPageKind) {
  return legalPageSlugs[kind][locale];
}

export function legalPagePath(locale: Locale, kind: LegalPageKind): Route {
  return route(`/${locale}/${legalPageSlugs[kind][locale]}`);
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
