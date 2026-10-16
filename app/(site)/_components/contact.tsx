import { Reveal } from "@/components/ui/reveal";
import { ProfileLinks } from "@/components/layout/profile-links";

/** Closing band: the title on the left, one row per link on the right. Surface background, no new color. */
export function Contact() {
  return (
    <section aria-labelledby="contact-title" className="border-y border-border bg-surface">
      <Reveal className="container-page grid gap-10 py-16 lg:grid-cols-12 lg:gap-6 lg:py-24">
        <div className="lg:col-span-6">
          <p className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
            Let&apos;s work together
          </p>
          <h2 id="contact-title" className="mt-4 text-h2">
            함께 일하고 싶으시다면 연락 주세요.
          </h2>
        </div>
        <ProfileLinks variant="rows" className="text-body lg:col-span-4 lg:col-start-9" />
      </Reveal>
    </section>
  );
}
