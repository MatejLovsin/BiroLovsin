import type { MetadataRoute } from "next";
import { SEO } from "@/lib/content";

/* Pove iskalnikom, da smejo obiskati vse strani, in kje je zemljevid strani. */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SEO.url}/sitemap.xml`,
    host: SEO.url,
  };
}
