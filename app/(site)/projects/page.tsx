import type { Metadata } from "next";

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
    <div className="container-page py-20 lg:py-32">
      <header className="flex flex-col gap-4">
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          Projects
        </p>
        <h1 className="text-h1">프로젝트</h1>
        <p className="max-w-2xl text-body-lg text-secondary">
          결과물보다 문제를 어떻게 풀었는지를 중심으로 정리했습니다.
        </p>
      </header>
      <div className="mt-12">
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <p className="border-t border-border pt-8 text-body text-secondary">
            Case Study를 준비하고 있습니다.
          </p>
        )}
      </div>
    </div>
  );
}
