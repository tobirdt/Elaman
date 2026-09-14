import { describe, expect, it } from "vitest";

import {
  alternateLocale,
  detailPageKinds,
  detailPageKindFromSlug,
  detailPagePath,
  homePath,
  isLocale,
  legalPageKinds,
  legalPageKindFromSlug,
  legalPagePath,
  locales,
  sectionPath,
} from "@/lib/i18n";

describe("isLocale", () => {
  it.each(["de", "en"])("accepts the supported locale %s", (value) => {
    expect(isLocale(value)).toBe(true);
  });

  it.each(["", "DE", "fr", "de-DE", "en-GB"])("rejects %s", (value) => {
    expect(isLocale(value)).toBe(false);
  });
});

describe("homePath", () => {
  it("returns the localised root", () => {
    expect(homePath("de")).toBe("/de");
    expect(homePath("en")).toBe("/en");
  });
});

describe("sectionPath", () => {
  it("prefixes a hash with the localised home path", () => {
    expect(sectionPath("de", "#contact")).toBe("/de#contact");
    expect(sectionPath("en", "#systems")).toBe("/en#systems");
  });

  it("leaves an absolute path untouched", () => {
    expect(sectionPath("de", "/de/unternehmen")).toBe("/de/unternehmen");
    expect(sectionPath("en", "https://example.org")).toBe("https://example.org");
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
    expect(detailPagePath("de", "systems")).toBe("/de/systeme");
    expect(detailPagePath("en", "systems")).toBe("/en/systems");
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
