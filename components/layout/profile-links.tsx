import { ExternalLink } from "@/components/ui/external-link";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils/cn";

type ProfileLinksProps = {
  className?: string;
};

/** GitHub / Velog / Notion / Email. A link renders only when its value is set in content/profile.ts. */
export function ProfileLinks({ className }: ProfileLinksProps) {
  const { github, velog, notion, email } = profile.links;

  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2 font-semibold", className)}>
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
      {notion && (
        <li>
          <ExternalLink href={notion} className="min-h-11">
            Notion
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
  );
}
