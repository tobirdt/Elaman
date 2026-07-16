import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { getSiteContent } from "@/lib/content/site";
import { imprintContent } from "@/lib/content/legal";
import { createPageMetadata } from "@/lib/seo/site";
import { imprintJsonLd, safeJsonLd } from "@/lib/seo/structured-data";

const content = getSiteContent("en");
const title = "Elaman GmbH – Imprint | Holger Rumscheidt, Managing Director";
const description =
  "Imprint of Elaman GmbH in Munich with information about Managing Director Holger Rumscheidt, the commercial register and contact details.";

export const metadata: Metadata = createPageMetadata({
  title,
  appendSiteName: false,
  description,
  path: "/imprint",
});

export default function ImprintPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(imprintJsonLd(title, description)),
        }}
      />
      <Header locale="en" content={content.navigation} />
      <LegalDocument title={imprintContent.title} blocks={imprintContent.blocks} />
      <Footer
        contact={content.contact}
        locale="en"
        navigation={content.navigation}
        footer={content.footer}
      />
    </>
  );
}
