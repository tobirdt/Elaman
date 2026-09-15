import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { defaultLocale } from "@/lib/i18n";
import { siteConfig, siteIcons } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  icons: siteIcons,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

/** Wraps the `/` redirect only; it renders no visible output. */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang={defaultLocale}>{children}</RootDocument>;
}
