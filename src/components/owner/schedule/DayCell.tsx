"use client";

import { GymClass } from "@/types/classes/GymClass";

type DayCellProps = {
  data: GymClass | undefined;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export function DayCell({ data, onClick }: DayCellProps) {
  return (
    <div
      className='
        border border-surface-divider
        bg-surface-input
        text-textcolor-primary
        px-2 py-4 sm:px-3 sm:py-3
        text-xs sm:text-sm
        rounded-sm
        hover:bg-secondary-soft
        transition
        cursor-pointer
      '
      onClick={onClick}
    >
      {data ? data.title : ""}
    </div>
  );
}
