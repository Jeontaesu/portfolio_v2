import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";

export const metadata: Metadata = { title: "ErrorState" };

const USAGE = `"use client";

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return <ErrorState action={<Button onClick={reset}>다시 시도</Button>} />;
}`;

export default function ErrorStateGuidePage() {
  return (
    <GuidePage
      title="ErrorState"
      source="components/ui/error-state.tsx"
      description="error.tsx에서 쓰는 오류 상태입니다. role='alert'라 나타나는 즉시 읽히고, 문구는 일반적인 내용만 씁니다. DB 오류나 stack trace는 서버 로그에만 남습니다."
    >
      <Demo
        title="inline (Admin)"
        description="기본값. 컨테이너 안에 놓이는 작은 블록입니다."
        column
      >
        <ErrorState headingLevel="h3" action={<Button>다시 시도</Button>} />
      </Demo>
      <Demo
        title="page (Public)"
        description="페이지 전체를 대신합니다. overline + h1, container-page 폭을 씁니다."
        column
      >
        <div className="w-full">
          <ErrorState
            variant="page"
            headingLevel="h3"
            description="페이지를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
            action={<Button>다시 시도</Button>}
          />
        </div>
      </Demo>
      <PropsTable
        rows={[
          {
            name: "variant",
            type: '"page" | "inline"',
            default: '"inline"',
            description: "page는 overline + h1, 큰 여백",
          },
          {
            name: "title",
            type: "string",
            default: '"문제가 발생했습니다."',
            description: "제목 (h1)",
          },
          {
            name: "headingLevel",
            type: '"h1" | "h2" | "h3"',
            default: '"h1"',
            description: "제목 태그. 다른 h1 아래에 놓일 때만 낮춤",
          },
          {
            name: "description",
            type: "string",
            default: '"잠시 후 다시 시도해 주세요."',
            description: "보충 설명",
          },
          {
            name: "action",
            type: "ReactNode",
            description: "재시도 등. 핸들러는 호출하는 Client Component가 가짐",
          },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
