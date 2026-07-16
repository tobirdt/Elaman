import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/site";

const routes = ["/de", "/en", "/imprint", "/private-policy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => {
    const isHomepage = route === "/de" || route === "/en";

    return {
      url: absoluteUrl(route),
      lastModified,
      changeFrequency: isHomepage ? "monthly" : "yearly",
      priority: route === "/de" ? 1 : route === "/en" ? 0.9 : 0.4,
      ...(isHomepage
        ? {
            alternates: {
              languages: {
                de: absoluteUrl("/de"),
                en: absoluteUrl("/en"),
                "x-default": absoluteUrl("/de"),
              },
            },
          }
        : {}),
    };
  });
}
