import Link from "next/link";

import { CareerTimeline } from "@/components/features/career/career-timeline";

import { SectionHeader } from "./section-header";

export function Career() {
  return (
    <section aria-labelledby="career-title" className="container-page py-20 lg:py-32">
      <SectionHeader
        id="career-title"
        overline="Career"
        title="역할과 기술이 어떻게 성장해 왔는지 보여줍니다."
      />
      <div className="mt-12">
        <CareerTimeline />
      </div>
      <Link
        href="/career"
        className="mt-8 inline-flex min-h-11 items-center text-primary underline underline-offset-4"
      >
        경력 상세 보기
      </Link>
    </section>
  );
}
