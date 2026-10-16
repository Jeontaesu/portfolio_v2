import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ProjectGrid } from "@/components/features/projects/project-grid";
import { getProjects } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "실무에서 해결했던 문제와 직접 만든 프로젝트의 Case Study.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container-page pt-12 pb-16 lg:pt-20 lg:pb-24">
      <PageHeader
        overline="Projects"
        title="프로젝트"
        description="결과물보다 문제를 어떻게 풀었는지를 중심으로 정리했습니다."
      />
      <div className="mt-12 border-t border-foreground pt-10">
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} headingLevel="h2" />
        ) : (
          <p className="border-t border-border pt-8 text-body text-secondary">
            Case Study를 준비하고 있습니다.
          </p>
        )}
      </div>
    </div>
  );
}
