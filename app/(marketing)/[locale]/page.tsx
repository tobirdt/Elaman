import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnchorScrollManager } from "@/components/motion/AnchorScrollManager";
import { CapabilityOverview } from "@/components/sections/CapabilityOverview";
import { ContactSection } from "@/components/sections/ContactSection";
import { DeliverySection } from "@/components/sections/DeliverySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProtectionSection } from "@/components/sections/ProtectionSection";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { SystemsSection } from "@/components/sections/SystemsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { getSiteContent } from "@/lib/content/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/site";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = getSiteContent(locale);

  return createPageMetadata({
    title: content.metadata.title,
    description: content.metadata.description,
    path: `/${locale}`,
    locale: content.metadata.ogLocale,
    languages: {
      en: absoluteUrl("/en"),
      de: absoluteUrl("/de"),
      "x-default": absoluteUrl("/en"),
    },
  });
}

export default async function HomePage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const content = getSiteContent(locale);

  return (
    <>
      <AnchorScrollManager locale={locale} />
      <Header locale={locale} content={content.navigation} />
      <main id="main-content" tabIndex={-1}>
        <HeroSection locale={locale} content={content.hero} />
        <TrustSection content={content.trust} />
        <ScrollStory locale={locale} content={content} />
        <CapabilityOverview content={content.capabilities} />
        <SystemsSection content={content.systems} />
        <ProtectionSection content={content.protection} />
        <DeliverySection content={content.delivery} />
        <ContactSection content={content.contact} />
      </main>
      <Footer
        contact={content.contact}
        locale={locale}
        navigation={content.navigation}
        footer={content.footer}
      />
    </>
  );
}
