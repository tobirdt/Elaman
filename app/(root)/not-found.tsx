import type { Metadata } from "next";

import { NotFoundPage } from "@/components/sections/NotFoundPage";
import { createPageMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
});

export default function NotFound() {
  return <NotFoundPage locale="en" />;
}
