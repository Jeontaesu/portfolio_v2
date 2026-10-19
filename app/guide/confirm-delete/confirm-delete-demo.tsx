"use client";

import { ConfirmDelete } from "@/components/ui/confirm-delete";

// Demo only. The real component receives a Server Action; here the "action" does nothing, so pressing 삭제 deletes
// nothing and the dialog stays open until 취소 (in the app, the action redirects away).
export function ConfirmDeleteDemo({ consequence }: { consequence?: string }) {
  return (
    <ConfirmDelete
      targetName="Server Action은 공개 엔드포인트다"
      consequence={consequence}
      action={async () => {}}
    />
  );
}
