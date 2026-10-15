import { useEffect } from "react";

/**
 * Asks the browser to confirm before closing or reloading the tab while the form has unsaved edits.
 * It cannot intercept in-app (next/link) navigation; the Admin has no such link inside the editor.
 */
export function useUnsavedChangesWarning(dirty: boolean): void {
  useEffect(() => {
    if (!dirty) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
}
