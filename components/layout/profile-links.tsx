import { ArrowUpRight } from "lucide-react";

import { ExternalLink } from "@/components/ui/external-link";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils/cn";

type ProfileLinksProps = {
  className?: string;
  /** "inline": links in a wrapping row. "rows": one full-width row per link with a divider (Home Contact). */
  variant?: "inline" | "rows";
};

/** GitHub / Velog / Notion / Email. A link renders only when its value is set in content/profile.ts. */
export function ProfileLinks({ className, variant = "inline" }: ProfileLinksProps) {
  const { github, velog, notion, email } = profile.links;
  const rows = variant === "rows";
  const itemClass = rows ? "border-b border-border first:border-t" : undefined;
  // Rows: the ↗ icon nudges toward its corner and the text turns primary on hover (CSS only).
  const linkClass = cn(
    "min-h-11",
    rows &&
      "group w-full justify-between py-2 transition-colors hover:text-primary [&_svg]:transition-transform hover:[&_svg]:-translate-y-0.5 hover:[&_svg]:translate-x-0.5",
  );

  return (
    <ul
      className={cn(
        "font-semibold",
        rows ? "flex flex-col" : "flex flex-wrap gap-x-6 gap-y-2",
        className,
      )}
    >
      {email && (
        <li className={itemClass}>
          <a href={`mailto:${email}`} className={cn("inline-flex items-center", linkClass)}>
            Email
            {rows && <ArrowUpRight className="size-4" aria-hidden="true" />}
          </a>
        </li>
      )}
      {github && (
        <li className={itemClass}>
          <ExternalLink href={github} className={linkClass}>
            GitHub
          </ExternalLink>
        </li>
      )}
      {velog && (
        <li className={itemClass}>
          <ExternalLink href={velog} className={linkClass}>
            Velog
          </ExternalLink>
        </li>
      )}
      {notion && (
        <li className={itemClass}>
          <ExternalLink href={notion} className={linkClass}>
            Notion
          </ExternalLink>
        </li>
      )}
    </ul>
  );
}
