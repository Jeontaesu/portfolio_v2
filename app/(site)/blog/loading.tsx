import { Skeleton, SkeletonRegion } from "@/components/ui/skeleton";

// /blog renders per request (?category=), so it is the one public route that can show a loading state.
// Mirrors the page: header block, filter row, then list rows.
export default function BlogLoading() {
  return (
    <SkeletonRegion className="container-page pt-12 pb-16 lg:pt-20 lg:pb-24">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-6 h-12 w-72 max-w-full" />
      <div className="mt-12 flex gap-3 border-t border-foreground pt-8">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-11 w-20" />
        ))}
      </div>
      <div className="mt-10 border-b border-border">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="border-t border-border py-8">
            <Skeleton className="h-4 w-56 max-w-full" />
            <Skeleton className="mt-3 h-8 w-4/5" />
            <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
          </div>
        ))}
      </div>
    </SkeletonRegion>
  );
}
