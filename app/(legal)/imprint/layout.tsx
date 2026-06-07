import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "../../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
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

export default function ImprintLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
