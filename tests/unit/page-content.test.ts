import { describe, expect, it } from "vitest";

import { getContactPageContent } from "@/lib/content/contact-page";
import { getDetailPageContent } from "@/lib/content/detail-pages";
import { getLegalPageContent } from "@/lib/content/legal";
import { getSiteContent } from "@/lib/content/site";
import { detailPageKinds, legalPageKinds, locales } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo/site";

/**
 * A browser tab shows roughly twenty characters and a search result about
 * sixty, so a title longer than that is cut where nobody chose to cut it.
 */
const titleBudget = 60;

function documentTitle(title: string, appendSiteName = true) {
  return String(createPageMetadata({ title, appendSiteName }).title);
}

describe("breadcrumb labels", () => {
  it.each([...locales])("%s names the trail and its first step", (locale) => {
    const { breadcrumb, notFound } = getSiteContent(locale);

    expect(breadcrumb.label.length).toBeGreaterThan(0);
    expect(breadcrumb.home.length).toBeGreaterThan(0);
    expect(notFound.breadcrumb.length).toBeGreaterThan(0);
  });

  it("gives every page below the homepage its own step", () => {
    for (const locale of locales) {
      expect(getContactPageContent(locale).breadcrumb.length).toBeGreaterThan(0);

      for (const kind of detailPageKinds) {
        expect(getDetailPageContent(locale, kind).breadcrumb.length).toBeGreaterThan(0);
      }

      for (const kind of legalPageKinds) {
        expect(getLegalPageContent(locale, kind).breadcrumb.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("document titles", () => {
  it("keeps every title inside the budget", () => {
    for (const locale of locales) {
      const site = getSiteContent(locale);

      expect(documentTitle(site.metadata.title, false).length).toBeLessThanOrEqual(
        titleBudget,
      );
      expect(documentTitle(site.notFound.breadcrumb).length).toBeLessThanOrEqual(
        titleBudget,
      );
      expect(
        documentTitle(getContactPageContent(locale).metadata.title).length,
      ).toBeLessThanOrEqual(titleBudget);

      for (const kind of detailPageKinds) {
        const { metadata } = getDetailPageContent(locale, kind);
        expect(documentTitle(metadata.title).length).toBeLessThanOrEqual(titleBudget);
      }

      for (const kind of legalPageKinds) {
        const { metaTitle } = getLegalPageContent(locale, kind);
        expect(documentTitle(metaTitle).length).toBeLessThanOrEqual(titleBudget);
      }
    }
  });

  it("appends the short brand once, and never to the brand itself", () => {
    expect(documentTitle("Kontakt")).toBe("Kontakt | Elaman");
    expect(documentTitle("Kontakt | Elaman")).toBe("Kontakt | Elaman");
    expect(documentTitle("Elaman")).toBe("Elaman");
  });
});
