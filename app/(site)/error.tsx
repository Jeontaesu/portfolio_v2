"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

// Client Component by framework requirement (error boundaries need `reset`).
// Shows a generic message only; details go to the console, never to the page.
type SiteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SiteError({ error, reset }: SiteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex flex-col items-start gap-6 py-20 lg:py-32">
      <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">Error</p>
      <h1 className="text-h1">문제가 발생했습니다.</h1>
      <p className="max-w-2xl text-body-lg text-secondary">
        페이지를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
