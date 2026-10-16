import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { career } from "@/content/profile";
import { formatPeriod } from "@/lib/utils/format-date";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Career",
  description: "회사별 역할과 참여한 프로젝트의 업무·기술 정리.",
  path: "/career",
});

export default function CareerPage() {
  return (
    <div className="container-page pt-12 pb-16 lg:pt-20 lg:pb-24">
      <PageHeader
        overline="Career Archive"
        title="경력"
        description="회사별 역할과 프로젝트에서 맡은 업무, 사용한 기술을 정리했습니다."
      />

      <div className="mt-12 border-t border-foreground">
        {career.map((entry, index) => (
          <section
            key={entry.company}
            aria-labelledby={`career-${index}`}
            className="grid gap-8 border-b border-border py-10 lg:grid-cols-12 lg:gap-6"
          >
            <div className="lg:col-span-4">
              <p className="text-body-sm text-secondary">
                {formatPeriod(entry.startedAt, entry.endedAt)}
              </p>
              <h2 id={`career-${index}`} className="mt-2 text-h2">
                {entry.company}
              </h2>
              <p className="mt-2 text-body text-secondary">
                {entry.position}
                {entry.employment && ` · ${entry.employment}`}
              </p>
              <p className="mt-1 text-body-sm text-secondary">{entry.skills.join(", ")}</p>
              <p className="mt-4 text-body">{entry.summary}</p>
            </div>

            {entry.projects.length > 0 && (
              <ul className="flex flex-col gap-10 lg:col-span-7 lg:col-start-6">
                {entry.projects.map((project) => (
                  <li key={project.name} className="border-t border-border pt-6">
                    <h3 className="text-h4">{project.name}</h3>
                    <p className="mt-1 text-body-sm text-secondary">
                      {project.period && `${project.period} · `}
                      {project.tech.join(" / ")}
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-body">
                      {project.work.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {project.result && (
                      <>
                        <p className="mt-3 text-body-sm font-semibold text-secondary">결과</p>
                        <ul className="mt-1 list-disc pl-5 text-body">
                          {project.result.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
