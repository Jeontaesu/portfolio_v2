import type { Metadata } from "next";
import Link from "next/link";

import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteShell>
      <div className="container-page flex flex-col items-start gap-6 py-20 lg:py-32">
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">404</p>
        <h1 className="text-h1">페이지를 찾을 수 없습니다.</h1>
        <p className="max-w-2xl text-body-lg text-secondary">
          주소가 바뀌었거나 삭제된 페이지입니다. 아래 링크에서 다시 찾아보세요.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">홈으로</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/projects">프로젝트 보기</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/blog">블로그 보기</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
