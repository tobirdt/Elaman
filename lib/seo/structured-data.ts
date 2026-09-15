import { getSiteContent } from "@/lib/content/site";
import type { DetailPageKind, Locale } from "@/lib/i18n";
import { contactPagePath, detailPagePath, homePath } from "@/lib/i18n";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");
const managingDirectorId = absoluteUrl("/#holger-rumscheidt");

function organizationNode() {
  const contact = getSiteContent("en").contact;

  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    legalName: siteConfig.name,
    alternateName: ["Elaman", "ELAMAN"],
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logoPath),
    sameAs: ["https://www.linkedin.com/company/elaman-gmbh"],
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLines[0],
      postalCode: "81371",
      addressLocality: "Munich",
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: contact.email,
      telephone: contact.phone,
      contactType: "business inquiries",
      areaServed: "DE",
      availableLanguage: ["de", "en"],
    },
    knowsAbout: [
      "Communications technology",
      "Security technology",
      "System integration",
      "Covert audio and video surveillance",
      "Audio and video analysis systems",
      "Technical surveillance countermeasures",
      "Radio monitoring systems for mobile communications",
      "Training and technical support",
    ],
    employee: { "@id": managingDirectorId },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: "Elaman – German Security Solutions",
    description: siteConfig.description,
    publisher: { "@id": organizationId },
    inLanguage: ["de", "en"],
  };
}

export function siteJsonLd() {
  // The Person node travels with the Organization because `employee` points at
  // it; without it every page would carry a reference that resolves to nothing.
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode(), managingDirectorNode()],
  };
}

export function homepageJsonLd(locale: Locale) {
  const content = getSiteContent(locale);
  const url = absoluteUrl(homePath(locale));

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: content.metadata.title,
    description: content.metadata.description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    mainEntity: { "@id": organizationId },
  };
}

/**
 * Two-step breadcrumb trail, matching the one the page renders. The second
 * step carries the page's short name rather than its meta title, so the trail
 * reads the same in search results as it does on the page.
 */
function breadcrumbNode(locale: Locale, url: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: getSiteContent(locale).breadcrumb.home,
        item: absoluteUrl(homePath(locale)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: url,
      },
    ],
  };
}

export function contactPageJsonLd(
  locale: Locale,
  name: string,
  breadcrumbName: string,
  description: string,
) {
  const url = absoluteUrl(contactPagePath(locale));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: { "@id": organizationId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumbNode(locale, url, breadcrumbName),
    ],
  };
}

export function detailPageJsonLd(
  locale: Locale,
  kind: DetailPageKind,
  name: string,
  breadcrumbName: string,
  description: string,
) {
  const url = absoluteUrl(detailPagePath(locale, kind));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumbNode(locale, url, breadcrumbName),
    ],
  };
}

function managingDirectorNode() {
  return {
    "@type": "Person",
    "@id": managingDirectorId,
    name: "Holger Rumscheidt",
    jobTitle: "Managing Director",
    worksFor: { "@id": organizationId },
  };
}

export function legalPageJsonLd(
  locale: Locale,
  path: string,
  title: string,
  breadcrumbName: string,
  description: string,
  includeManagingDirector: boolean,
) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        ...(includeManagingDirector
          ? { mainEntity: [{ "@id": organizationId }, { "@id": managingDirectorId }] }
          : { mainEntity: { "@id": organizationId } }),
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumbNode(locale, url, breadcrumbName),
      ...(includeManagingDirector ? [managingDirectorNode()] : []),
    ],
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
