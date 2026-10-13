import { ExternalLink } from "@/components/ui/external-link";
import { profile } from "@/content/profile";
import { SectionHeader } from "./section-header";

export function Contact() {
  const { github, velog, email } = profile.links;

  return (
    <section aria-labelledby="contact-title" className="container-page py-20 lg:py-32">
      <SectionHeader
        id="contact-title"
        overline="Contact"
        title="함께 일하고 싶으시다면 연락 주세요."
      />
      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-body font-semibold">
        {github && (
          <li>
            <ExternalLink href={github} className="min-h-11">
              GitHub
            </ExternalLink>
          </li>
        )}
        {velog && (
          <li>
            <ExternalLink href={velog} className="min-h-11">
              Velog
            </ExternalLink>
          </li>
        )}
        {email && (
          <li>
            <a href={`mailto:${email}`} className="inline-flex min-h-11 items-center">
              Email
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}
