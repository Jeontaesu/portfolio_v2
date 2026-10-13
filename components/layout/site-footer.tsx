import { ExternalLink } from "@/components/ui/external-link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  const { github, velog, email } = profile.links;

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-6 py-12 lg:py-16">
        <p className="text-body-sm text-secondary">
          <strong className="text-foreground">{profile.brand}</strong> — {profile.tagline}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-body-sm font-semibold">
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
        <p className="text-caption text-secondary">
          © {new Date().getFullYear()} {profile.brand}
        </p>
      </div>
    </footer>
  );
}
