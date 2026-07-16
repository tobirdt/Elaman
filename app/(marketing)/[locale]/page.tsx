import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnchorScrollManager } from "@/components/motion/AnchorScrollManager";
import { AdviceSection } from "@/components/sections/AdviceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { ProtectionSection } from "@/components/sections/ProtectionSection";
import { SystemsSection } from "@/components/sections/SystemsSection";
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
      "x-default": absoluteUrl("/de"),
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
      <main id="main-content" tabIndex={-1}>
        <HeroSection content={content.hero} />
        <ProfileSection content={content.profile} />
        <AdviceSection content={content.advice} />
        <SystemsSection content={content.systems} />
        <ProtectionSection content={content.protection} />
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
