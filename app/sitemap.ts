import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site";

const routes = ["/de", "/en", "/imprint", "/private-policy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    changeFrequency: route === "/en" || route === "/de" ? "monthly" : "yearly",
    priority: route === "/de" ? 1 : route === "/en" ? 0.9 : 0.4,
  }));
}
