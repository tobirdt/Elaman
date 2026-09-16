import { describe, expect, it } from "vitest";

import {
  alternateLocale,
  detailPageKinds,
  detailPageKindFromSlug,
  detailPagePath,
  homePath,
  isLocale,
  localeFromAcceptLanguage,
  legalPageKinds,
  legalPageKindFromSlug,
  legalPagePath,
  locales,
  contactPagePath,
  contactPageSlug,
  isContactPageSlug,
} from "@/lib/i18n";

describe("isLocale", () => {
  it.each(["de", "en"])("accepts the supported locale %s", (value) => {
    expect(isLocale(value)).toBe(true);
  });

  it.each(["", "DE", "fr", "de-DE", "en-GB"])("rejects %s", (value) => {
    expect(isLocale(value)).toBe(false);
  });
});

describe("localeFromAcceptLanguage", () => {
  it("prefers the highest-weighted language the site speaks", () => {
    expect(localeFromAcceptLanguage("en-GB,en;q=0.9,de;q=0.8")).toBe("en");
    expect(localeFromAcceptLanguage("de-DE,de;q=0.9,en;q=0.8")).toBe("de");
    expect(localeFromAcceptLanguage("fr-FR,fr;q=0.9,en;q=0.5,de;q=0.8")).toBe("de");
    expect(localeFromAcceptLanguage("fr,de;q=0.5,en;q=0.7")).toBe("en");
  });

  it("uses header order to break ties", () => {
    expect(localeFromAcceptLanguage("en,de")).toBe("en");
    expect(localeFromAcceptLanguage("de,en")).toBe("de");
    expect(localeFromAcceptLanguage("en;q=0.8,de;q=0.8")).toBe("en");
  });

  it("falls back to German when nothing matches", () => {
    expect(localeFromAcceptLanguage("fr-FR,fr;q=0.9")).toBe("de");
    expect(localeFromAcceptLanguage("*")).toBe("de");
    expect(localeFromAcceptLanguage("")).toBe("de");
    expect(localeFromAcceptLanguage(null)).toBe("de");
    expect(localeFromAcceptLanguage(undefined)).toBe("de");
  });

  it("ignores ranges a browser has switched off and malformed weights", () => {
    expect(localeFromAcceptLanguage("en;q=0,de;q=0.5")).toBe("de");
    expect(localeFromAcceptLanguage("en;q=abc,de")).toBe("de");
    expect(localeFromAcceptLanguage(" EN-us ; q=0.9 , de ; q=0.3 ")).toBe("en");
  });
});

describe("homePath", () => {
  it("returns the localised root", () => {
    expect(homePath("de")).toBe("/de");
    expect(homePath("en")).toBe("/en");
  });
});

describe("contact page routing", () => {
  it("builds the localised contact paths", () => {
    expect(contactPagePath("de")).toBe("/de/kontakt");
    expect(contactPagePath("en")).toBe("/en/contact");
    expect(contactPageSlug("de")).toBe("kontakt");
    expect(contactPageSlug("en")).toBe("contact");
  });

  it("recognises only the slug of its own locale", () => {
    expect(isContactPageSlug("de", ["kontakt"])).toBe(true);
    expect(isContactPageSlug("en", ["contact"])).toBe(true);
    expect(isContactPageSlug("de", ["contact"])).toBe(false);
    expect(isContactPageSlug("en", ["kontakt"])).toBe(false);
    expect(isContactPageSlug("de", ["kontakt", "extra"])).toBe(false);
    expect(isContactPageSlug("de", [])).toBe(false);
  });
});

describe("alternateLocale", () => {
  it("swaps the two locales", () => {
    expect(alternateLocale("de")).toBe("en");
    expect(alternateLocale("en")).toBe("de");
  });

  it("is its own inverse", () => {
    for (const locale of locales) {
      expect(alternateLocale(alternateLocale(locale))).toBe(locale);
    }
  });
});

describe("detail page routing", () => {
  it("builds the approved dossier paths", () => {
    expect(detailPagePath("de", "company")).toBe("/de/unternehmen");
    expect(detailPagePath("en", "company")).toBe("/en/company");
    expect(detailPagePath("de", "solutions")).toBe("/de/loesungen");
    expect(detailPagePath("en", "solutions")).toBe("/en/solutions");
  });

  it("round-trips every kind through its localised slug", () => {
    for (const locale of locales) {
      for (const kind of detailPageKinds) {
        const slug = detailPagePath(locale, kind).split("/").slice(2);
        expect(detailPageKindFromSlug(locale, slug)).toBe(kind);
      }
    }
  });

  it("does not resolve the slug of the other locale", () => {
    expect(detailPageKindFromSlug("de", ["company"])).toBeNull();
    expect(detailPageKindFromSlug("en", ["unternehmen"])).toBeNull();
  });

  it("rejects unknown and multi-segment slugs", () => {
    expect(detailPageKindFromSlug("de", [])).toBeNull();
    expect(detailPageKindFromSlug("de", ["kontakt"])).toBeNull();
    expect(detailPageKindFromSlug("de", ["unternehmen", "team"])).toBeNull();
  });
});

describe("legal page routing", () => {
  it("builds the localised legal paths", () => {
    expect(legalPagePath("de", "imprint")).toBe("/de/impressum");
    expect(legalPagePath("en", "imprint")).toBe("/en/site-notice");
    expect(legalPagePath("de", "privacy")).toBe("/de/datenschutz");
    expect(legalPagePath("en", "privacy")).toBe("/en/privacy-policy");
  });

  it("round-trips every kind through its localised slug", () => {
    for (const locale of locales) {
      for (const kind of legalPageKinds) {
        const slug = legalPagePath(locale, kind).split("/").slice(2);
        expect(legalPageKindFromSlug(locale, slug)).toBe(kind);
      }
    }
  });

  it("rejects unknown, cross-locale and multi-segment slugs", () => {
    expect(legalPageKindFromSlug("de", ["site-notice"])).toBeNull();
    expect(legalPageKindFromSlug("en", ["impressum"])).toBeNull();
    expect(legalPageKindFromSlug("de", ["impressum", "kontakt"])).toBeNull();
    expect(legalPageKindFromSlug("de", [])).toBeNull();
  });

  it("never collides with the dossier slugs", () => {
    for (const locale of locales) {
      for (const kind of legalPageKinds) {
        const slug = legalPagePath(locale, kind).split("/").slice(2);
        expect(detailPageKindFromSlug(locale, slug)).toBeNull();
      }
    }
  });
});
