"use client";

import { Button } from "@/components/ui/button";

// Generic on purpose: the original error (DB, stack) stays in the server log and is never shown.
export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-start gap-4">
      <h1 className="text-h3">문제가 발생했습니다.</h1>
      <p className="text-body text-secondary">잠시 후 다시 시도해 주세요.</p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
