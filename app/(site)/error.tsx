"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";

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
    <ErrorState
      variant="page"
      description="페이지를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      action={<Button onClick={reset}>다시 시도</Button>}
    />
  );
}
