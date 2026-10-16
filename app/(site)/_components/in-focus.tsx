import Image from "next/image";
import Link from "next/link";

import { getFeaturedProjects } from "@/lib/content/projects";
import { cn } from "@/lib/utils/cn";

/** The first featured project as a split banner: image panel, then a dark text panel. Hidden with no featured project. */
export async function InFocus() {
  const [project] = await getFeaturedProjects();
  if (!project) return null;

  return (
    <section aria-labelledby="focus-title" className="container-page pb-16 lg:pb-24">
      <p className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
        In Focus · 대표 프로젝트
      </p>
      <div className="group mt-4 grid overflow-hidden lg:grid-cols-5">
        <div className="relative min-h-64 border border-border bg-surface lg:col-span-3 lg:min-h-96">
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt={project.thumbnailAlt ?? ""}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className={cn(
                "transition-transform duration-500 ease-out group-hover:scale-[1.03]",
                project.thumbnailFit === "contain" ? "object-contain p-10 lg:p-16" : "object-cover",
              )}
            />
          )}
        </div>
        <div className="flex flex-col gap-6 bg-foreground p-6 text-background lg:col-span-2 lg:p-10">
          <p className="text-caption font-semibold tracking-[0.08em] uppercase">
            Case Study · {project.role}
          </p>
          <h2 id="focus-title" className="text-h2">
            {project.title}
          </h2>
          <p className="text-body text-background/80">{project.summary}</p>
          <p className="mt-auto text-caption text-background/80">{project.techStack.join(" · ")}</p>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 items-center text-body-sm font-semibold underline underline-offset-4 focus-visible:outline-background"
          >
            케이스 스터디 읽기
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              &nbsp;→
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
