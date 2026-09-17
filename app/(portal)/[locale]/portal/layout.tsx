import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "../../../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { siteConfig, siteIcons } from "@/lib/seo/site";

/**
 * Root layout for the portal.
 *
 * Its own route group rather than a branch of the marketing tree, because the
 * two have opposite caching needs: every public page is prerendered at build
 * time, and every page in here reads a cookie and must not be. Keeping them
 * apart means neither has to carry an exception for the other.
 *
 * `noindex` on the whole group. There is nothing here for a search engine, and
 * an indexed sign-in form is an invitation to credential stuffing.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  publisher: siteConfig.name,
  icons: siteIcons,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

type PortalLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PortalLayout({ children, params }: PortalLayoutProps) {
  const { locale } = await params;
  const documentLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return <RootDocument lang={documentLocale}>{children}</RootDocument>;
}
