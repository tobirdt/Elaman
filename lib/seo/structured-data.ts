import { getSiteContent } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");
const managingDirectorId = absoluteUrl("/imprint#holger-rumscheidt");

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
      "Communications engineering",
      "Security engineering",
      "System integration",
      "Audio and video observation",
      "Geographical information systems",
      "Technical counter-surveillance",
      "Command and control centres",
      "Data forensics",
      "Electronic countermeasures",
      "Professional training",
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
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode()],
  };
}

export function homepageJsonLd(locale: Locale) {
  const content = getSiteContent(locale);
  const url = absoluteUrl(`/${locale}`);

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

function managingDirectorNode() {
  return {
    "@type": "Person",
    "@id": managingDirectorId,
    name: "Holger Rumscheidt",
    jobTitle: "Managing Director",
    url: absoluteUrl("/imprint"),
    worksFor: { "@id": organizationId },
  };
}

export function imprintJsonLd(title: string, description: string) {
  const url = absoluteUrl("/imprint");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: [{ "@id": organizationId }, { "@id": managingDirectorId }],
        mainEntity: [{ "@id": organizationId }, { "@id": managingDirectorId }],
      },
      managingDirectorNode(),
    ],
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
