import { ProfileLinks } from "@/components/layout/profile-links";

import { SectionHeader } from "./section-header";

export function Contact() {
  return (
    <section aria-labelledby="contact-title" className="container-page py-20 lg:py-32">
      <SectionHeader
        id="contact-title"
        overline="Contact"
        title="함께 일하고 싶으시다면 연락 주세요."
      />
      <ProfileLinks className="mt-12 gap-x-8 text-body" />
    </section>
  );
}
