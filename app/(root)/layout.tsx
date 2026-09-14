import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { defaultLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
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

/** Wraps the `/` redirect only; it renders no visible output. */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang={defaultLocale}>{children}</RootDocument>;
}
