import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { privacyPolicyContent } from "@/lib/content/legal";
import { createPageMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createPageMetadata({
  title: "Data Privacy Policy",
  description: "Data privacy policy for Elaman GmbH.",
  path: "/private-policy",
});

export default function PrivatePolicyPage() {
  return (
    <>
      <Header />
      <LegalDocument
        title={privacyPolicyContent.title}
        blocks={privacyPolicyContent.blocks}
      />
      <Footer />
    </>
  );
}
