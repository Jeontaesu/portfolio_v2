import type { Metadata } from "next";
import { Download } from "lucide-react";

import { CareerTimeline } from "@/components/features/career/career-timeline";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: "경력 요약과 이력서 PDF.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="container-page pt-12 pb-16 lg:pt-20 lg:pb-24">
      <PageHeader
        overline="Resume"
        title="이력서"
        description={`웹 퍼블리셔 ${profile.careerYears}년 · 반응형 웹, 웹표준·웹 접근성, GUI`}
      >
        {profile.resumePdf ? (
          <Button asChild size="lg" className="mt-8">
            <a href={profile.resumePdf} download>
              <Download className="size-5" aria-hidden="true" />
              이력서 PDF 다운로드
            </a>
          </Button>
        ) : (
          <p className="mt-6 text-body text-secondary">이력서 PDF는 준비 중입니다.</p>
        )}
      </PageHeader>
      <div className="mt-12">
        <CareerTimeline />
      </div>
    </div>
  );
}
