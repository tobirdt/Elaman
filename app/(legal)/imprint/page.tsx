import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { getSiteContent } from "@/lib/content/site";
import { imprintContent } from "@/lib/content/legal";
import { createPageMetadata } from "@/lib/seo/site";

const content = getSiteContent("en");

export const metadata: Metadata = createPageMetadata({
  title: "Imprint",
  description: "Imprint and publisher information for Elaman GmbH.",
  path: "/imprint",
});

export default function ImprintPage() {
  return (
    <>
      <Header locale="en" content={content.navigation} />
      <LegalDocument title={imprintContent.title} blocks={imprintContent.blocks} />
      <Footer
        contact={content.contact}
        navigation={content.navigation}
        footer={content.footer}
      />
    </>
  );
}
