import type { Metadata } from "next";

import { ProfileLinks } from "@/components/layout/profile-links";

export const metadata: Metadata = {
  title: "Contact",
  description: "GitHub, Velog, Notion 등 연락 및 기록 채널.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-20 lg:py-32">
      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          Contact
        </p>
        <h1 className="text-h1">함께 일하고 싶으시다면 연락 주세요.</h1>
      </header>
      <ProfileLinks className="mt-12 gap-x-8 text-body-lg" />
    </div>
  );
}
