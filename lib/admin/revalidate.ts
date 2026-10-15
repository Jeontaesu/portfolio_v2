import "server-only";

import { revalidatePath } from "next/cache";

/**
 * After any content change, rebuild the public pages. The site has a handful of pages and
 * posts/projects appear on Home, lists, details, OG images and the sitemap, so invalidating from the
 * root is simpler and safer than tracking each path (a changed slug would leave the old one stale).
 */
export function revalidatePublicSite(): void {
  revalidatePath("/", "layout");
}
