import Link from "next/link";

import { profile } from "@/content/profile";

import { SectionHeader } from "./section-header";

const working = profile.skills.working.flatMap((group) => group.items);

/** About statement, then the two skill columns (practiced at work vs. being learned). No photo asset yet. */
export function About() {
  return (
    <>
      <section
        aria-labelledby="about-title"
        className="container-page border-t border-foreground py-16 lg:py-24"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <SectionHeader
            id="about-title"
            overline="About Me · MEFLOWEB"
            title="웹을 만드는 것에서 시작해 웹 서비스를 만드는 개발자로 확장하고 있습니다."
            className="lg:col-span-7"
          />
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-10">
            <p className="text-body text-secondary">
              웹 퍼블리셔로서 쌓아온 실무 경험을 바탕으로, UI 구현을 넘어 프론트엔드 개발로 영역을
              넓혀갑니다. 만드는 과정과 배운 내용을 이곳에 함께 남깁니다.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex min-h-11 items-center text-body-sm font-semibold text-primary"
            >
              소개 더 읽기<span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="toolkit-title" className="container-page pb-16 lg:pb-24">
        <SectionHeader
          id="toolkit-title"
          overline="Craft & Toolkit"
          title="쌓아온 기술, 넓혀가는 영역"
        />
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
          <div className="border-t border-border pt-6">
            <p className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
              Web Publisher · 실무 사용
            </p>
            <p className="mt-3 text-h3">실무 경력 {profile.careerYears}년</p>
            <p className="mt-4 text-body-sm text-secondary">{working.join(" · ")}</p>
          </div>
          <div className="border-t border-border pt-6">
            <p className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
              Frontend Developer · 학습·적용 중
            </p>
            <p className="mt-3 text-h3">현재 확장 중</p>
            <p className="mt-4 text-body-sm text-secondary">
              {profile.skills.learning.join(" · ")}
            </p>
            <p className="mt-4 text-body-sm text-secondary">
              UI를 이해하는 경험 위에 서비스를 만드는 기술을 더합니다. 배움과 적용의 과정은 기술
              블로그로 연결합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
