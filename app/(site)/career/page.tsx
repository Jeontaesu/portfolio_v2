import type { Metadata } from "next";

import { career } from "@/content/profile";
import { formatPeriod } from "@/lib/utils/format-date";

export const metadata: Metadata = {
  title: "Career",
  description: "회사별 역할과 참여한 프로젝트의 업무·기술 정리.",
};

export default function CareerPage() {
  return (
    <div className="container-page py-20 lg:py-32">
      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          Career
        </p>
        <h1 className="text-h1">경력</h1>
        <p className="text-body-lg text-secondary">
          회사별 역할과 프로젝트에서 맡은 업무, 사용한 기술을 정리했습니다.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-16">
        {career.map((entry, index) => (
          <section
            key={entry.company}
            aria-labelledby={`career-${index}`}
            className="border-t border-border pt-8"
          >
            <p className="text-body-sm text-secondary">
              {formatPeriod(entry.startedAt, entry.endedAt)}
            </p>
            <h2 id={`career-${index}`} className="mt-2 text-h2">
              {entry.company}
            </h2>
            <p className="mt-2 text-body text-secondary">
              {entry.position}
              {entry.employment && ` · ${entry.employment}`} · {entry.skills.join(", ")}
            </p>
            <p className="mt-4 max-w-2xl text-body">{entry.summary}</p>

            {entry.projects.length > 0 && (
              <ul className="mt-8 flex flex-col gap-10">
                {entry.projects.map((project) => (
                  <li key={project.name} className="max-w-3xl">
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
