import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";

import { SectionHeader } from "./section-header";

// Each chip opens the guide page that actually shows it, so none of them is a dead label.
const TOPICS = [
  { href: "/guide/button", label: "컴포넌트 구조" },
  { href: "/guide/skeleton", label: "상태 표현" },
  { href: "/guide/responsive", label: "반응형 적용" },
] as const;

/** Points hiring teams at /guide. White card on the page background; colors are the existing tokens. */
export function ComponentGuide() {
  return (
    <section aria-labelledby="guide-title" className="container-page py-16 lg:py-24">
      <Reveal className="border border-border bg-surface p-8 lg:p-12">
        <SectionHeader
          id="guide-title"
          overline="UI Component Guide"
          title="UI 컴포넌트 가이드"
          description="이 사이트를 만들며 정리한 컴포넌트를 구조(Props·사용법), 상태 표현, 반응형 적용 예시로 모아 두었습니다. 코드를 열지 않고도 빠르게 확인할 수 있습니다."
        />
        <ul aria-label="가이드 주제" className="mt-8 flex flex-wrap gap-3">
          {TOPICS.map((topic) => (
            <li key={topic.href}>
              <Link
                href={topic.href}
                className="inline-flex min-h-11 items-center rounded-sm border border-muted bg-surface px-4 text-body-sm font-semibold hover:bg-border/60"
              >
                {topic.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/guide"
          className="mt-6 inline-flex min-h-11 items-center text-body-sm font-semibold text-primary"
        >
          UI 컴포넌트 가이드 보기<span aria-hidden="true">&nbsp;→</span>
        </Link>
      </Reveal>
    </section>
  );
}
