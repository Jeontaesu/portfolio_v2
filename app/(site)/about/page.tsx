import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `웹 퍼블리셔 ${profile.careerYears}년 경력에서 프론트엔드 개발자로 확장하고 있습니다.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-page pt-12 pb-16 lg:pt-20 lg:pb-24">
      <PageHeader
        overline="About Me · MEFLOWEB"
        title="웹을 만드는 것에서 시작해 웹 서비스를 만드는 개발자로 확장하고 있습니다."
      />

      <div className="mt-12 grid gap-4 border-t border-foreground pt-10 text-body-lg lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-4 lg:col-span-7 lg:col-start-6">
          <p>
            웹 퍼블리셔로 {profile.careerYears}년 동안 반응형 웹, 웹표준·웹 접근성, GUI를 중심으로
            사이트를 구축하고 운영해 왔습니다. 금융, 커머스, 대학, 제약 등 다양한 도메인의
            프로젝트에서 디자인을 화면으로 옮기는 일을 했습니다.
          </p>
          <p>
            React 기반 프로젝트에서 개발팀과 협업하며 컴포넌트 단위 퍼블리싱을 경험했고, 지금은
            TypeScript와 Next.js로 이 포트폴리오를 직접 만들며 프론트엔드 개발로 영역을 넓히고
            있습니다.
          </p>
        </div>
      </div>

      <section
        aria-labelledby="skills-title"
        className="mt-16 grid gap-8 border-t border-foreground pt-10 lg:grid-cols-12 lg:gap-6"
      >
        <h2 id="skills-title" className="text-h2 lg:col-span-4">
          Skills
        </h2>
        <div className="lg:col-span-7 lg:col-start-6">
          <h3 className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
            Web Publisher · 실무 사용
          </h3>
          <dl className="mt-6 grid gap-6 md:grid-cols-2">
            {profile.skills.working.map((group) => (
              <div key={group.label} className="border-t border-border pt-4">
                <dt className="text-body font-semibold">{group.label}</dt>
                <dd className="mt-1 text-body-sm text-secondary">{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-12 text-caption font-semibold tracking-[0.08em] text-primary uppercase">
            Frontend Developer · 학습·적용 중
          </h3>
          <p className="mt-4 border-t border-border pt-4 text-body">
            {profile.skills.learning.join(" · ")}
          </p>
        </div>
      </section>

      <Link
        href="/career"
        className="mt-12 inline-flex min-h-11 items-center text-body-sm font-semibold text-primary"
      >
        경력 상세 보기<span aria-hidden="true">&nbsp;→</span>
      </Link>
    </div>
  );
}
