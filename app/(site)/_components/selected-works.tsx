import Link from "next/link";

import { ProjectGrid } from "@/components/features/projects/project-grid";
import { getFeaturedProjects } from "@/lib/content/projects";

import { SectionHeader } from "./section-header";

export async function SelectedWorks() {
  const projects = await getFeaturedProjects();

  return (
    <section aria-labelledby="works-title" className="container-page py-20 lg:py-32">
      <SectionHeader
        id="works-title"
        overline="Selected Works"
        title="실무에서 해결했던 문제와 직접 만든 프로젝트를 소개합니다."
      />
      <div className="mt-12">
        {projects.length > 0 ? (
          <>
            <ProjectGrid projects={projects} />
            <Link
              href="/projects"
              className="mt-12 inline-flex min-h-11 items-center text-primary underline underline-offset-4"
            >
              View all projects
            </Link>
          </>
        ) : (
          <p className="border-t border-border pt-8 text-body text-secondary">
            Case Study를 준비하고 있습니다.
          </p>
        )}
      </div>
    </section>
  );
}
