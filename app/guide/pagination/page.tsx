import type { Metadata } from "next";

import { Pagination } from "@/components/ui/pagination";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";

export const metadata: Metadata = { title: "Pagination" };

const USAGE = `<Pagination
  page={page}
  pageCount={pageCount}
  hrefFor={(p) => \`/admin/posts?\${new URLSearchParams({ ...params, page: String(p) })}\`}
/>`;

// Demo only: the links point back at this page, so nothing changes when they are followed.
const hrefFor = () => "/guide/pagination";

export default function PaginationGuidePage() {
  return (
    <GuidePage
      title="Pagination"
      source="components/ui/pagination.tsx"
      description="이전/다음 링크 방식입니다. 상태는 useState가 아니라 URL search param이라 공유와 뒤로 가기가 됩니다. 첫/마지막 페이지에서는 해당 방향이 aria-disabled 상태로 남습니다."
    >
      <Demo title="첫 페이지" column>
        <div className="w-full max-w-md">
          <Pagination page={1} pageCount={5} hrefFor={hrefFor} />
        </div>
      </Demo>
      <Demo title="중간 페이지" column>
        <div className="w-full max-w-md">
          <Pagination page={3} pageCount={5} hrefFor={hrefFor} />
        </div>
      </Demo>
      <Demo title="마지막 페이지" column>
        <div className="w-full max-w-md">
          <Pagination page={5} pageCount={5} hrefFor={hrefFor} />
        </div>
      </Demo>
      <Demo
        title="페이지가 1개 이하"
        description="아무것도 렌더링하지 않습니다. 아래는 pageCount={1}의 결과입니다."
      >
        <Pagination page={1} pageCount={1} hrefFor={hrefFor} />
        <p className="text-body-sm text-secondary">(렌더링 없음)</p>
      </Demo>
      <PropsTable
        rows={[
          { name: "page", type: "number", description: "현재 페이지 (1부터)" },
          { name: "pageCount", type: "number", description: "전체 페이지 수. 1 이하면 null" },
          {
            name: "hrefFor",
            type: "(page: number) => string",
            description: "페이지 번호를 URL로. 호출하는 쪽이 다른 search param을 유지",
          },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
