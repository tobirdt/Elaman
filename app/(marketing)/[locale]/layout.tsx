import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "../../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { isLocale, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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
  themeColor: "#ffffff",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <RootDocument lang={locale}>{children}</RootDocument>;
}
