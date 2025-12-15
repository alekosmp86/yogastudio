import { Card, CardContent } from "./Card";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-4 flex items-center gap-4">
        {/* Icon */}
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-12" />
          </div>

          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />

          <div className="mt-2">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-3 w-24 mt-1" />
          </div>

          <div className="mt-3">
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
