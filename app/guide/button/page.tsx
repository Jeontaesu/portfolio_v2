import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";

export const metadata: Metadata = { title: "Button" };

const VARIANTS = ["primary", "secondary", "ghost", "destructive"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const USAGE = `<Button>저장</Button>
<Button variant="secondary" size="lg">취소</Button>
<Button variant="destructive">삭제</Button>

// 비동기 처리 중: 너비는 유지하고 spinner + aria-busy
<Button loading>저장 중</Button>

// 링크를 버튼처럼 (자식에 props와 ref를 넘김)
<Button asChild>
  <Link href="/projects">View Projects</Link>
</Button>`;

export default function ButtonGuidePage() {
  return (
    <GuidePage
      title="Button"
      source="components/ui/button.tsx"
      description="variant × size 두 축을 CVA로 정의합니다. 클릭할 수 있는 요소는 항상 button 또는 a이고, md·lg가 44px 터치 타겟을 충족합니다."
    >
      <Demo title="Variant">
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Demo>
      <Demo
        title="Size"
        description="sm(40px)은 밀도가 높은 데스크톱 UI용입니다. 기본은 md(44px)입니다."
      >
        {SIZES.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </Demo>
      <Demo title="Disabled">
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            {variant}
          </Button>
        ))}
      </Demo>
      <Demo
        title="Loading"
        description="loading이 true면 너비를 유지한 채 spinner를 보여 주고 aria-busy를 켭니다. 비활성화도 함께 적용됩니다."
      >
        <Button loading>저장 중</Button>
        <Button variant="secondary" loading>
          저장 중
        </Button>
      </Demo>
      <Demo title="With icon" description="장식 아이콘은 aria-hidden입니다.">
        <Button>
          <Plus className="size-4" aria-hidden="true" />새 글
        </Button>
      </Demo>
      <Demo
        title="asChild"
        description="Slot으로 자식 요소(next/link)에 스타일을 입힙니다. 페이지 이동은 button이 아니라 a여야 합니다."
      >
        <Button asChild>
          <Link href="/projects">View Projects</Link>
        </Button>
      </Demo>
      <PropsTable
        rows={[
          {
            name: "variant",
            type: '"primary" | "secondary" | "ghost" | "destructive"',
            default: '"primary"',
            description: "시각 스타일",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: "높이와 글자 크기",
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "자식 요소를 버튼으로 렌더링. 자식이 props와 ref를 받아야 함",
          },
          {
            name: "loading",
            type: "boolean",
            default: "false",
            description: "spinner 표시, 클릭 막음, aria-busy. asChild와 함께 쓰면 무시",
          },
          { name: "disabled", type: "boolean", description: "비활성화 (opacity 50%)" },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
