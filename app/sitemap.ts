import type { MetadataRoute } from "next";
import { NAV, SEO } from "@/lib/content";

/* Zemljevid strani za Google. Nove strani se doda v NAV v lib/content.ts. */

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return NAV.map((item) => ({
    url: item.href === "/" ? SEO.url : `${SEO.url}${item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
