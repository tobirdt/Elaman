import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnchorScrollManager } from "@/components/motion/AnchorScrollManager";
import { MotionReveal } from "@/components/motion/MotionReveal";
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
  params: Promise<unknown>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const resolvedParams = (await params) as { locale?: string };
  const locale = resolvedParams.locale;

  if (!locale || !isLocale(locale)) {
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
  const resolvedParams = (await params) as { locale?: string };
  const localeParam = resolvedParams.locale;

  if (!localeParam || !isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const content = getSiteContent(locale);

  return (
    <>
      <AnchorScrollManager locale={locale} />
      <Header locale={locale} content={content.navigation} />
      <main>
        <HeroSection locale={locale} content={content.hero} />
        <MotionReveal>
          <TrustSection content={content.trust} />
        </MotionReveal>
        <ScrollStory locale={locale} content={content} />
        <MotionReveal>
          <CapabilityOverview content={content.capabilities} />
        </MotionReveal>
        <MotionReveal>
          <SystemsSection content={content.systems} />
        </MotionReveal>
        <MotionReveal>
          <ProtectionSection content={content.protection} />
        </MotionReveal>
        <MotionReveal>
          <DeliverySection content={content.delivery} />
        </MotionReveal>
        <MotionReveal>
          <ContactSection content={content.contact} />
        </MotionReveal>
      </main>
      <Footer
        contact={content.contact}
        navigation={content.navigation}
        footer={content.footer}
      />
    </>
  );
}
