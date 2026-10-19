import type { Metadata } from "next";

import { Skeleton, SkeletonRegion } from "@/components/ui/skeleton";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";

export const metadata: Metadata = { title: "Skeleton" };

const USAGE = `// loading.tsx
<SkeletonRegion className="flex flex-col gap-6">
  <Skeleton className="h-8 w-48" />
  <Skeleton className="h-12 w-full" />
</SkeletonRegion>`;

export default function SkeletonGuidePage() {
  return (
    <GuidePage
      title="Skeleton"
      source="components/ui/skeleton.tsx"
      description="loading 상태의 자리 표시입니다. 블록은 aria-hidden이고, SkeletonRegion이 role='status'와 sr-only 문구로 로딩을 한 번만 알립니다. 펄스는 모션 줄이기 설정을 켜면 멈춥니다."
    >
      <Demo title="Block" description="높이와 너비로 실제 콘텐츠의 모양을 흉내 냅니다.">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="size-12" />
      </Demo>
      <Demo
        title="List 로딩 화면"
        description="/blog 로딩 화면과 같은 구성입니다. 글 목록 한 줄은 메타, 제목, 요약 3줄입니다."
        column
      >
        <SkeletonRegion className="w-full">
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="border-t border-border py-6 first:border-t-0 first:pt-0">
              <Skeleton className="h-4 w-56 max-w-full" />
              <Skeleton className="mt-3 h-8 w-4/5" />
              <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
            </div>
          ))}
        </SkeletonRegion>
      </Demo>
      <PropsTable
        rows={[
          {
            name: "Skeleton.className",
            type: "string",
            description: "크기와 모양. 배경은 --border(장식용)",
          },
          {
            name: "SkeletonRegion.label",
            type: "string",
            default: '"불러오는 중"',
            description: "스크린 리더에만 읽히는 안내",
          },
          { name: "SkeletonRegion.className", type: "string", description: "묶음의 레이아웃" },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
