import type { Metadata } from "next";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";
import { ConfirmDeleteDemo } from "./confirm-delete-demo";

export const metadata: Metadata = { title: "ConfirmDelete" };

const USAGE = `<ConfirmDelete
  targetName={category.name}
  consequence="글은 미분류로 남습니다."
  action={deleteCategory.bind(null, category.id)}
/>`;

export default function ConfirmDeleteGuidePage() {
  return (
    <GuidePage
      title="ConfirmDelete"
      source="components/ui/confirm-delete.tsx"
      description="삭제 확인. Radix AlertDialog라서 열리면 '취소'에 먼저 포커스가 가고, 바깥 클릭으로 닫히지 않으며, 포커스 트랩·Esc·포커스 복귀를 Radix가 처리합니다. 데모에서는 아무것도 삭제하지 않습니다."
    >
      <Demo title="기본">
        <ConfirmDeleteDemo />
      </Demo>
      <Demo
        title="결과 안내 포함"
        description="삭제의 영향이 있으면 consequence로 한 줄 더 알려 줍니다."
      >
        <ConfirmDeleteDemo consequence="글은 미분류로 남습니다." />
      </Demo>
      <PropsTable
        rows={[
          {
            name: "targetName",
            type: "string",
            description: "삭제 대상 이름. 버튼의 sr-only 문구와 확인 문구에 들어감",
          },
          {
            name: "consequence",
            type: "string",
            default: "-",
            description: "삭제 결과 한 줄 안내",
          },
          {
            name: "action",
            type: "() => Promise<void>",
            description: "Server Action(id가 bind됨). 권한 확인은 action이 직접 함",
          },
          {
            name: "triggerLabel",
            type: "string",
            default: '"삭제"',
            description: "열기 버튼 라벨",
          },
          {
            name: "triggerSize",
            type: '"sm" | "md"',
            default: '"sm"',
            description: "열기 버튼 크기",
          },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
