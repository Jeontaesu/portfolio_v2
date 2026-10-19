import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";

export const metadata: Metadata = { title: "EmptyState" };

const USAGE = `<EmptyState
  title="아직 글이 없습니다"
  description="첫 글을 작성해 보세요."
  action={
    <Button asChild>
      <Link href="/admin/posts/new">새 글 작성</Link>
    </Button>
  }
/>`;

export default function EmptyStateGuidePage() {
  return (
    <GuidePage
      title="EmptyState"
      source="components/ui/empty-state.tsx"
      description="데이터 영역의 empty 상태(loading / empty / error / success 중 하나)입니다. 무엇이 없는지 말하고, 가능하면 다음 행동을 하나 제시합니다."
    >
      <Demo title="제목만" column>
        <div className="w-full">
          <EmptyState title="아직 게시된 글이 없습니다." />
        </div>
      </Demo>
      <Demo title="설명 + 액션" column>
        <div className="w-full">
          <EmptyState
            title="아직 글이 없습니다"
            description="첫 글을 작성해 보세요."
            action={
              <Button asChild>
                <Link href="/guide/button">새 글 작성</Link>
              </Button>
            }
          />
        </div>
      </Demo>
      <PropsTable
        rows={[
          { name: "title", type: "string", description: "비어 있는 이유" },
          { name: "description", type: "string", default: "-", description: "보충 설명" },
          {
            name: "action",
            type: "ReactNode",
            default: "-",
            description: "다음 행동. 보통 Button asChild + Link",
          },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
