import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import type { ProjectMeta } from "@/lib/content/types";

// Editorial rhythm: column spans repeat instead of one identical card (PORTFOLIO_DESIGN §5.2).
const SPANS = ["lg:col-span-8", "lg:col-span-4", "lg:col-span-5", "lg:col-span-7"];

type ProjectGridProps = {
  projects: readonly ProjectMeta[];
  /** Heading level of each title: h3 under a section's h2 (Home), h2 directly under the page's h1. */
  headingLevel?: "h2" | "h3";
};

export function ProjectGrid({ projects, headingLevel: Heading = "h3" }: ProjectGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
      {projects.map((project, index) => (
        <li key={project.slug} className={cn(SPANS[index % SPANS.length])}>
          <Link href={`/projects/${project.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface">
              {project.thumbnail && (
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnailAlt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className={cn(
                    project.thumbnailFit === "contain" ? "object-contain p-8" : "object-cover",
                  )}
                />
              )}
            </div>
            <p className="mt-4 text-caption font-semibold text-secondary">
              {String(index + 1).padStart(2, "0")}
            </p>
            <Heading className="mt-1 text-h3 group-hover:underline">{project.title}</Heading>
            <p className="mt-1 text-body-sm text-secondary">{project.techStack.join(" / ")}</p>
            <p className="mt-2 text-body text-secondary">{project.summary}</p>
            <span className="mt-3 inline-block text-body-sm font-semibold text-primary">
              View Case Study<span aria-hidden="true"> →</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
