import type { Metadata } from "next";
import Link from "next/link";

import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: `웹 퍼블리셔 ${profile.careerYears}년 경력에서 프론트엔드 개발자로 확장하고 있습니다.`,
};

export default function AboutPage() {
  return (
    <div className="container-page py-20 lg:py-32">
      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          About Me
        </p>
        <h1 className="text-h1">
          웹을 만드는 것에서 시작해 웹 서비스를 만드는 개발자로 확장하고 있습니다.
        </h1>
      </header>

      <div className="mt-12 flex max-w-2xl flex-col gap-4 border-t border-border pt-8 text-body-lg">
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

      <section aria-labelledby="skills-title" className="mt-16 border-t border-border pt-8">
        <h2 id="skills-title" className="text-h3">
          Skills
        </h2>
        <h3 className="mt-8 text-body-sm font-semibold text-secondary">실무 사용</h3>
        <dl className="mt-4 grid gap-6 md:grid-cols-2">
          {profile.skills.working.map((group) => (
            <div key={group.label}>
              <dt className="text-body font-semibold">{group.label}</dt>
              <dd className="mt-1 text-body text-secondary">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-10 text-body-sm font-semibold text-secondary">학습·적용 중</h3>
        <p className="mt-2 text-body">{profile.skills.learning.join(" · ")}</p>
      </section>

      <Link
        href="/career"
        className="mt-12 inline-flex min-h-11 items-center text-primary underline underline-offset-4"
      >
        경력 상세 보기
      </Link>
    </div>
  );
}
