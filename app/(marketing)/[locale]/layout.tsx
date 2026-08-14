import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "../../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  publisher: siteConfig.name,
  category: "Security",
  icons: {
    icon: siteConfig.iconPath,
    apple: siteConfig.logoPath,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<unknown>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = (await params) as { locale?: string };
  const locale = resolvedParams.locale;
  const documentLocale: Locale = locale && isLocale(locale) ? locale : defaultLocale;

  return <RootDocument lang={documentLocale}>{children}</RootDocument>;
}
