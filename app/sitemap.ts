import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site";

const routes = ["/", "/imprint", "/private-policy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : 0.4,
  }));
}
