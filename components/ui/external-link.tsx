import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ExternalLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & {
  href: string;
};

/** Link to another site: opens a new tab, shows ↗ and tells screen readers it is a new window. */
export function ExternalLink({ className, children, ...props }: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    >
      {children}
      <ArrowUpRight className="size-4" aria-hidden="true" />
      <span className="sr-only">(새 창)</span>
    </a>
  );
}
