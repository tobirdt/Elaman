import { getSiteContent } from "@/lib/content/site";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

export function organizationJsonLd() {
  const contact = getSiteContent("en").contact;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
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
      contactType: "customer support",
      areaServed: "DE",
    },
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
