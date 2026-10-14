import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { MarkdownContent } from "@/components/ui/markdown-content";
import { ExternalLink } from "@/components/ui/external-link";
import { getAdjacentProjects, getProject, getProjects } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils/cn";
import { formatPeriod } from "@/lib/utils/format-date";

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const { previous, next } = await getAdjacentProjects(slug);

  return (
    <article className="container-page py-20 lg:py-32">
      <Link
        href="/projects"
        className="inline-flex min-h-11 items-center gap-1 text-body-sm text-secondary hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Projects
      </Link>

      <header className="mt-6 flex max-w-3xl flex-col gap-4">
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          Case Study
        </p>
        <h1 className="text-h1">{project.title}</h1>
        <p className="text-body-lg text-secondary">{project.summary}</p>
        {(project.demoUrl || project.githubUrl) && (
          <p className="flex flex-wrap gap-x-6 text-body-sm font-semibold text-primary">
            {project.demoUrl && (
              <ExternalLink
                href={project.demoUrl}
                className="min-h-11 underline underline-offset-4"
              >
                Visit Website
              </ExternalLink>
            )}
            {project.githubUrl && (
              <ExternalLink
                href={project.githubUrl}
                className="min-h-11 underline underline-offset-4"
              >
                GitHub
              </ExternalLink>
            )}
          </p>
        )}
      </header>

      {project.thumbnail && (
        <div className="relative mt-12 aspect-[16/9] overflow-hidden border border-border bg-surface">
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt ?? ""}
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className={cn(
              project.thumbnailFit === "contain" ? "object-contain p-10" : "object-cover",
            )}
          />
        </div>
      )}

      <dl className="mt-12 grid grid-cols-1 gap-6 border-y border-border py-8 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        <div>
          <dt className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
            Role
          </dt>
          <dd className="mt-2 text-body">{project.role}</dd>
        </div>
        {project.startedAt && (
          <div>
            <dt className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
              Period
            </dt>
            <dd className="mt-2 text-body">{formatPeriod(project.startedAt, project.endedAt)}</dd>
          </div>
        )}
        <div>
          <dt className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
            Technology
          </dt>
          <dd className="mt-2 text-body">{project.techStack.join(" / ")}</dd>
        </div>
      </dl>

      <div className="mt-12">
        <MarkdownContent html={project.html} />
      </div>

      {(previous || next) && (
        <nav
          aria-label="프로젝트 이동"
          className="mt-20 flex flex-col justify-between gap-6 border-t border-border pt-8 sm:flex-row"
        >
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className="flex min-h-11 flex-col">
              <span className="text-caption font-semibold text-secondary">← 이전 프로젝트</span>
              <span className="text-h4">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="flex min-h-11 flex-col sm:text-right">
              <span className="text-caption font-semibold text-secondary">다음 프로젝트 →</span>
              <span className="text-h4">{next.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
