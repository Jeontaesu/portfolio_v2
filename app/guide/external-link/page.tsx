import type { Metadata } from "next";

import { ExternalLink } from "@/components/ui/external-link";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";

export const metadata: Metadata = { title: "ExternalLink" };

const USAGE = `<ExternalLink href="https://github.com/Jeontaesu">GitHub</ExternalLink>`;

export default function ExternalLinkGuidePage() {
  return (
    <GuidePage
      title="ExternalLink"
      source="components/ui/external-link.tsx"
      description="다른 사이트로 가는 링크는 이 컴포넌트로만 만듭니다. 새 탭으로 열고, ↗ 아이콘을 보여 주며, 스크린 리더에는 '(새 창)'을 읽어 줍니다."
    >
      <Demo title="기본">
        <ExternalLink href="https://github.com/Jeontaesu" className="text-primary underline">
          GitHub
        </ExternalLink>
      </Demo>
      <PropsTable
        rows={[
          { name: "href", type: "string", description: "이동할 주소 (필수)" },
          {
            name: "target, rel",
            type: "—",
            description: 'Omit됨. 항상 target="_blank", rel="noopener noreferrer"',
          },
          { name: "className", type: "string", description: "색·밑줄 등은 호출하는 쪽에서" },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
