"use client";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";

// Generic on purpose: the original error (DB, stack) stays in the server log and is never shown.
export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return <ErrorState action={<Button onClick={reset}>다시 시도</Button>} />;
}
