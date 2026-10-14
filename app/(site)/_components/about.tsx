import Link from "next/link";

import { profile } from "@/content/profile";

import { SectionHeader } from "./section-header";

const working = profile.skills.working.flatMap((group) => group.items);

export function About() {
  return (
    <section aria-labelledby="about-title" className="container-page py-20 lg:py-32">
      <SectionHeader
        id="about-title"
        overline="About Me"
        title="웹을 만드는 것에서 시작해 웹 서비스를 만드는 개발자로 확장하고 있습니다."
      />
      <div className="mt-12 grid gap-8 border-t border-border pt-8 lg:grid-cols-2">
        <div>
          <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
            Web Publisher
          </p>
          <p className="mt-2 text-body">실무 경력 {profile.careerYears}년</p>
        </div>
        <div>
          <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
            Frontend Developer
          </p>
          <p className="mt-2 text-body">현재 확장 중</p>
        </div>
      </div>
      <dl className="mt-8 grid gap-6 border-t border-border pt-8 lg:grid-cols-2">
        <div>
          <dt className="text-body-sm font-semibold text-secondary">실무 사용</dt>
          <dd className="mt-1 text-body">{working.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-body-sm font-semibold text-secondary">학습·적용 중</dt>
          <dd className="mt-1 text-body">{profile.skills.learning.join(" · ")}</dd>
        </div>
      </dl>
      <Link
        href="/about"
        className="mt-8 inline-flex min-h-11 items-center text-primary underline underline-offset-4"
      >
        About 더 보기
      </Link>
    </section>
  );
}
