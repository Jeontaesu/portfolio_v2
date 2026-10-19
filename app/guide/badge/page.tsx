import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";

export const metadata: Metadata = { title: "Badge" };

const USAGE = `<Badge variant="success">Published</Badge>
<Badge>Draft</Badge>
<Badge variant="destructive">오류</Badge>`;

export default function BadgeGuidePage() {
  return (
    <GuidePage
      title="Badge"
      source="components/ui/badge.tsx"
      description="상태 표시. 상태색 10% 배경 위의 텍스트는 대비가 4.5:1에 못 미쳐서, 흰 surface + 상태 텍스트 토큰 + 점으로 만들었습니다. 색만으로 뜻을 전하지 않고 라벨이 의미를 가집니다 (D-015)."
    >
      <Demo title="Variant">
        <Badge>neutral</Badge>
        <Badge variant="primary">primary</Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="warning">warning</Badge>
        <Badge variant="destructive">destructive</Badge>
      </Demo>
      <Demo title="상태 예시" description="글 목록의 게시 상태에 쓰는 조합입니다.">
        <Badge variant="success">Published</Badge>
        <Badge>Draft</Badge>
      </Demo>
      <PropsTable
        rows={[
          {
            name: "variant",
            type: '"neutral" | "primary" | "success" | "warning" | "destructive"',
            default: '"neutral"',
            description: "텍스트 색과 점 색",
          },
          { name: "children", type: "ReactNode", description: "라벨. 점은 장식이므로 aria-hidden" },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
