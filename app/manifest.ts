import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/en",
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
