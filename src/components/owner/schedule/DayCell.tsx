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
        group
        px-2 py-4 sm:px-3 sm:py-3
        rounded-md
        border
        transition-all duration-200
        cursor-pointer
        flex items-center
      ${  
        data
          ? "bg-custom-300 border-custom-100 hover:bg-custom-400"
          : "bg-custom-50 border-custom-100 hover:bg-custom-100"
      }`}
      onClick={onClick}
    >
      {data ? (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">
            {data.title}
          </span>
          <span className="text-xs text-white group-hover:text-white transition-colors">
            {data.instructor}
          </span>
        </div>
      ) : (
        <span className="text-xs text-custom-300 opacity-40">+</span>
      )}
    </div>
  );
}
