import Link from "next/link";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";

import { PostStatusBadge } from "@/components/features/blog/post-status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { SubmitButton } from "@/components/ui/submit-button";
import { moveProject, toggleFeatured } from "@/lib/admin/actions/project";
import { getAdminProjects } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "Projects" };

const thClass =
  "text-caption py-3 pr-4 text-left font-semibold tracking-[0.08em] text-secondary uppercase";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await getAdminProjects();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-h2">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="size-5" aria-hidden="true" />
            New Project
          </Link>
        </Button>
      </div>

      <p className="text-body-sm text-secondary">
        순서는 공개 사이트의 표시 순서입니다. 위·아래 버튼으로 바꿀 수 있습니다.
      </p>

      {projects.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <caption className="sr-only">프로젝트 목록 (공개 표시 순서)</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className={thClass}>
                  Title
                </th>
                <th scope="col" className={thClass}>
                  Status
                </th>
                <th scope="col" className={`${thClass} hidden md:table-cell`}>
                  Featured
                </th>
                <th scope="col" className={thClass}>
                  순서
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project.id} className="border-b border-border">
                  <th scope="row" className="py-4 pr-4 text-left text-body-sm font-semibold">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="inline-flex min-h-11 items-center hover:underline"
                    >
                      {project.title}
                    </Link>
                  </th>
                  <td className="py-4 pr-4">
                    <PostStatusBadge status={project.status} />
                  </td>
                  <td className="hidden py-4 pr-4 md:table-cell">
                    <form action={toggleFeatured.bind(null, project.id)}>
                      <SubmitButton
                        variant="ghost"
                        size="sm"
                        aria-pressed={project.featured}
                        className="px-2"
                      >
                        {project.featured ? (
                          <Badge variant="primary">Featured</Badge>
                        ) : (
                          <span className="text-body-sm text-secondary">Featured로 지정</span>
                        )}
                        <span className="sr-only"> — {project.title}</span>
                      </SubmitButton>
                    </form>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex gap-1">
                      <form action={moveProject.bind(null, project.id, "up")}>
                        <SubmitButton
                          variant="ghost"
                          size="sm"
                          disabled={index === 0}
                          aria-label={`${project.title} 위로 이동`}
                          className="size-11 px-0"
                        >
                          <ArrowUp className="size-4" aria-hidden="true" />
                        </SubmitButton>
                      </form>
                      <form action={moveProject.bind(null, project.id, "down")}>
                        <SubmitButton
                          variant="ghost"
                          size="sm"
                          disabled={index === projects.length - 1}
                          aria-label={`${project.title} 아래로 이동`}
                          className="size-11 px-0"
                        >
                          <ArrowDown className="size-4" aria-hidden="true" />
                        </SubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="아직 프로젝트가 없습니다."
          description="첫 Case Study를 작성해보세요."
          action={
            <Button asChild size="sm">
              <Link href="/admin/projects/new">New Project</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
