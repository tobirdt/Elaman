import type { MetadataRoute } from "next";

import { getSiteContent } from "@/lib/content/site";
import { siteConfig } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  const content = getSiteContent("de");

  return {
    name: content.metadata.title,
    short_name: siteConfig.name,
    description: content.metadata.description,
    start_url: "/de",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: siteConfig.iconPath,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
