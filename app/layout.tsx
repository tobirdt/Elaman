import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { createPageMetadata, siteConfig } from "@/lib/seo/site";
import { organizationJsonLd, safeJsonLd } from "@/lib/seo/structured-data";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-elaman-sans",
  display: "swap",
});

export const metadata: Metadata = {
  ...createPageMetadata(),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
