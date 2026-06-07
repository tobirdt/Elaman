import { Geist } from "next/font/google";
import type { ReactNode } from "react";

import { organizationJsonLd, safeJsonLd } from "@/lib/seo/structured-data";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-elaman-sans",
  display: "swap",
});

type RootDocumentProps = {
  children: ReactNode;
  lang: string;
};

export function RootDocument({ children, lang }: RootDocumentProps) {
  return (
    <html lang={lang} className={geist.variable}>
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
