"use client";

import { cn } from "../../lib/utils";
import * as React from "react";

export function Progress({
  className,
  value,
  max = 100,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value: number;
  max?: number;
}) {
  const percentage = Math.min(Math.max(value, 0), max);

  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
