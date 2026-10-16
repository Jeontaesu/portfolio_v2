import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ProfileLinks } from "@/components/layout/profile-links";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "GitHub, Velog, Notion 등 연락 및 기록 채널.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-page pt-12 pb-16 lg:pt-20 lg:pb-24">
      <PageHeader overline="Let's work together" title="함께 일하고 싶으시다면 연락 주세요." />
      <div className="mt-12 grid gap-6 border-t border-foreground pt-10 lg:grid-cols-12">
        <ProfileLinks variant="rows" className="text-body-lg lg:col-span-6 lg:col-start-7" />
      </div>
    </div>
  );
}
