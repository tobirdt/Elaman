import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { imprintContent } from "@/lib/content/legal";
import { createPageMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createPageMetadata({
  title: "Imprint",
  description: "Imprint and publisher information for Elaman GmbH.",
  path: "/imprint",
});

export default function ImprintPage() {
  return (
    <>
      <Header />
      <LegalDocument title={imprintContent.title} blocks={imprintContent.blocks} />
      <Footer />
    </>
  );
}
