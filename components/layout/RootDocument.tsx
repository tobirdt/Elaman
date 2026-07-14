import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { organizationJsonLd, safeJsonLd } from "@/lib/seo/structured-data";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-elaman-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-elaman-mono",
  display: "swap",
});

type RootDocumentProps = {
  children: ReactNode;
  lang: string;
};

export function RootDocument({ children, lang }: RootDocumentProps) {
  return (
    <html lang={lang} className={`${geist.variable} ${geistMono.variable}`}>
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
