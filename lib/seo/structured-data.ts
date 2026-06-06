import { contactDetails } from "@/lib/content/contact";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logoPath),
    email: contactDetails.email,
    telephone: contactDetails.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactDetails.addressLines[0],
      postalCode: "81371",
      addressLocality: "Munich",
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: contactDetails.email,
      telephone: contactDetails.phone,
      contactType: "customer support",
      areaServed: "DE",
    },
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
