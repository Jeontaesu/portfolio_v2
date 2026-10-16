import Link from "next/link";

import { ProjectGrid } from "@/components/features/projects/project-grid";
import { getFeaturedProjects } from "@/lib/content/projects";

import { SectionHeader } from "./section-header";

export async function SelectedWorks() {
  const projects = await getFeaturedProjects();

  return (
    <section aria-labelledby="works-title" className="container-page py-16 lg:py-24">
      <SectionHeader
        id="works-title"
        overline="Selected Works"
        title="실무에서 만든 웹, 그 안의 문제 해결"
        action={
          projects.length > 0 && (
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center text-body-sm font-semibold text-primary"
            >
              프로젝트 전체 보기<span aria-hidden="true">&nbsp;→</span>
            </Link>
          )
        }
      />
      <div className="mt-10">
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} variant="equal" />
        ) : (
          <p className="border-t border-border pt-8 text-body text-secondary">
            Case Study를 준비하고 있습니다.
          </p>
        )}
      </div>
    </section>
  );
}
