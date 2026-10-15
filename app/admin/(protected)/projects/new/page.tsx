import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProjectForm } from "@/components/features/projects/project-form";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "New Project" };

export default async function NewProjectPage() {
  await requireAdmin();

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
        <h1 className="text-h2">New Project</h1>
      </div>
      <ProjectForm />
    </div>
  );
}
