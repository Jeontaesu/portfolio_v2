/**
 * Shows which Tailwind breakpoint is active so resizing the window is easy to read.
 * Pure CSS (one span per range, the others hidden): no resize listener, nothing to mismatch on hydration.
 * Ranges follow DESIGN §3: Mobile < 768, Tablet 768–1023, Desktop ≥ 1024, Wide ≥ 1280.
 */
export function BreakpointBadge() {
  return (
    <p
      aria-hidden="true"
      className="fixed right-4 bottom-4 z-50 rounded-sm bg-foreground px-3 py-1.5 text-caption font-semibold text-primary-foreground"
    >
      <span className="md:hidden">Mobile · &lt; 768</span>
      <span className="hidden md:inline lg:hidden">Tablet · md</span>
      <span className="hidden lg:inline xl:hidden">Desktop · lg</span>
      <span className="hidden xl:inline">Wide · xl</span>
    </p>
  );
}
