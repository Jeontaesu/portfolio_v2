import type { Metadata } from "next";
import { Download } from "lucide-react";

import { CareerTimeline } from "@/components/features/career/career-timeline";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: "경력 요약과 이력서 PDF.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="container-page py-20 lg:py-32">
      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          Resume
        </p>
        <h1 className="text-h1">이력서</h1>
        <p className="text-body-lg text-secondary">
          웹 퍼블리셔 {profile.careerYears}년 · 반응형 웹, 웹표준·웹 접근성, GUI
        </p>
        {profile.resumePdf ? (
          <a
            href={profile.resumePdf}
            download
            className="mt-2 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-primary underline underline-offset-4"
          >
            <Download className="size-4" aria-hidden="true" />
            이력서 PDF 다운로드
          </a>
        ) : (
          <p className="mt-2 text-body text-secondary">이력서 PDF는 준비 중입니다.</p>
        )}
      </header>
      <div className="mt-12">
        <CareerTimeline />
      </div>
    </div>
  );
}
