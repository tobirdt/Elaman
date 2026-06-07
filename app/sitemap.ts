import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site";

const routes = ["/", "/en", "/de", "/imprint", "/private-policy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route === "/en" || route === "/de" ? "monthly" : "yearly",
    priority: route === "/en" || route === "/de" ? 1 : route === "/" ? 0.7 : 0.4,
  }));
}
