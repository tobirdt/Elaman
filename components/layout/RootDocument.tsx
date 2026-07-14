import { Jost } from "next/font/google";
import type { ReactNode } from "react";

import { organizationJsonLd, safeJsonLd } from "@/lib/seo/structured-data";

const jost = Jost({
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
    <html lang={lang} className={jost.variable}>
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
