export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

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
