import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonListItem() {
  return (
    <div className="flex items-center space-x-4 p-2">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
