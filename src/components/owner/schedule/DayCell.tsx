"use client";

import { GymClass } from "@/types/classes/GymClass";

type DayCellProps = {
  data: GymClass | undefined;
  onClick: () => void;
};

export function DayCell({ data, onClick }: DayCellProps) {
  return (
    <div
      className={`
        ${data ? "bg-info-400" : "bg-theme-cardbg"}
        border border-theme-border        
        px-2 py-4 sm:px-3 sm:py-3
        text-md sm:text-sm
        rounded-sm
        hover:bg-info-600
        transition
        cursor-pointer
      `}
      onClick={onClick}
    >
      {data ? (
        <div className='flex flex-col'>
          <span className="font-semibold text-primary-900">{data.title}</span>
          <span className="text-xs text-secondary-700">{data.instructor}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
