import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "../../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  publisher: siteConfig.name,
  category: "Security",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/brand/elaman-icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Root layout for the localised routes. It stays a root layout so `<html lang>`
 * can carry the actual page language — a single layout above the `[locale]`
 * segment could not read it, and English pages would be announced as German.
 *
 * Unmatched routes are handled by `app/global-not-found.tsx`, which renders its
 * own document.
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const documentLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return <RootDocument lang={documentLocale}>{children}</RootDocument>;
}
