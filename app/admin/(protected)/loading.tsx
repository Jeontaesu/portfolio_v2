import { Skeleton, SkeletonRegion } from "@/components/ui/skeleton";

// Shape of a typical Admin page: title, then rows. Keeps the layout from jumping when data arrives.
export default function AdminLoading() {
  return (
    <SkeletonRegion className="flex flex-col gap-6">
      <Skeleton className="h-8 w-48" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </SkeletonRegion>
  );
}
