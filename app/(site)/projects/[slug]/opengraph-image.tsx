import { getProject, getProjects } from "@/lib/content/projects";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Case Study 대표 이미지";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.slug }));
}

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  return renderOgImage({
    eyebrow: "CASE STUDY",
    title: project?.title ?? "Projects",
    description: project?.techStack.join(" / "),
  });
}
