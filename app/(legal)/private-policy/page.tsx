import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { getSiteContent } from "@/lib/content/site";
import { privacyPolicyContent } from "@/lib/content/legal";
import { createPageMetadata } from "@/lib/seo/site";

const content = getSiteContent("de");

export const metadata: Metadata = createPageMetadata({
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der Elaman GmbH.",
  path: "/private-policy",
  locale: "de_DE",
});

export default function PrivatePolicyPage() {
  return (
    <>
      <Header locale="de" content={content.navigation} />
      <LegalDocument
        label="Rechtliches"
        title={privacyPolicyContent.title}
        blocks={privacyPolicyContent.blocks}
      />
      <Footer
        contact={content.contact}
        navigation={content.navigation}
        footer={content.footer}
      />
    </>
  );
}
