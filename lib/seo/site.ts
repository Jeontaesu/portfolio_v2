import { profile } from "@/content/profile";

/**
 * Absolute site origin for metadataBase, canonical, sitemap and OG URLs.
 * 1. NEXT_PUBLIC_SITE_URL — set this when a custom domain is attached.
 * 2. VERCEL_PROJECT_PRODUCTION_URL — set by Vercel on every deployment (production domain, no scheme).
 * 3. localhost for local builds.
 */
function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}

export const SITE_URL = resolveSiteUrl();

/**
 * Only the production deployment is indexable. Preview deployments are public URLs with the same
 * content, so they get noindex + robots disallow to avoid duplicate results. Local builds count as indexable.
 */
export const IS_INDEXABLE = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export const SITE_NAME = profile.brand;
export const SITE_DESCRIPTION =
  "웹 퍼블리셔에서 프론트엔드 개발자로 확장하고 있는 포트폴리오와 기술 블로그입니다.";
