"use client";

import { GymClass } from "@/types/classes/GymClass";

type DayCellProps = {
  data: GymClass | undefined;
  onClick: () => void;
};

export function DayCell({ data, onClick }: DayCellProps) {
  return (
    <div
      className='
        border border-surface-card
        bg-surface-white
        text-textcolor-primary
        px-2 py-4 sm:px-3 sm:py-3
        text-xs sm:text-sm
        rounded-sm
        hover:bg-primary-soft
        transition
        cursor-pointer
      '
      onClick={onClick}
    >
      {data ? (
        <div className='flex flex-col'>
          <span className="font-semibold text-textcolor-primary">{data.title}</span>
          <span className="text-xs text-textcolor-primary">{data.instructor}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
