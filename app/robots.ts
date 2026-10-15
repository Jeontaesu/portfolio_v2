import type { MetadataRoute } from "next";

import { IS_INDEXABLE, SITE_URL } from "@/lib/seo/site";

// Preview deployments block all crawlers; production allows all and points to the sitemap.
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
