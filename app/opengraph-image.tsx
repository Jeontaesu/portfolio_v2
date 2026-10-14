import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { SITE_DESCRIPTION } from "@/lib/seo/site";

export const alt = "MEFLOWEB — Frontend Developer & Web Publisher";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "FRONTEND DEVELOPER & WEB PUBLISHER",
    title: "UI를 이해하고 웹 서비스를 만드는 프론트엔드 개발자",
    description: SITE_DESCRIPTION,
  });
}
