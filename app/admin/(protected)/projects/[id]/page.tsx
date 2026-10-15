import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PostStatusBadge } from "@/components/features/blog/post-status-badge";
import { ProjectForm } from "@/components/features/projects/project-form";
import { ConfirmDelete } from "@/components/ui/confirm-delete";
import { ExternalLink } from "@/components/ui/external-link";
import { deleteProject } from "@/lib/admin/actions/project";
import { getAdminProject } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "Edit Project" };

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const project = await getAdminProject(id);
  if (!project) notFound();

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/projects"
          className="inline-flex min-h-11 items-center gap-1 text-body-sm font-semibold"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Projects
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-h2">Edit Project</h1>
            <PostStatusBadge status={project.status} />
          </div>
          <div className="flex items-center gap-3">
            {project.status === "PUBLISHED" && (
              <ExternalLink
                href={`/projects/${project.slug}`}
                className="min-h-11 text-body-sm font-semibold"
              >
                사이트에서 보기
              </ExternalLink>
            )}
            <ConfirmDelete
              targetName={project.title}
              action={deleteProject.bind(null, project.id)}
            />
          </div>
        </div>
      </div>
      <ProjectForm key={project.id} project={project} />
    </div>
  );
}
