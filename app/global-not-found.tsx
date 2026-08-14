import type { Metadata } from "next";

import "./globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { NotFoundPage } from "@/components/sections/NotFoundPage";
import { createPageMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createPageMetadata({
  title: "Seite nicht gefunden",
  description: "Die aufgerufene Seite ist nicht verfügbar.",
  robots: {
    index: false,
    follow: false,
  },
});

export default function GlobalNotFound() {
  return (
    <RootDocument lang="de">
      <NotFoundPage locale="de" />
    </RootDocument>
  );
}
