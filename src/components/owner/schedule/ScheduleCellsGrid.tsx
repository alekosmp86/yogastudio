"use client";

import { HOURS, WEEKDAYS } from "@/static/StaticMockData";

export function ScheduleCellsGrid() {
  return (
    <>
      {HOURS.map((hour) =>
        WEEKDAYS.map((day) => (
          <div
            key={`${day.label}-${hour}`}
            className="border border-brand-600 px-1 py-4 sm:px-2 sm:py-3 text-xs sm:text-sm rounded-sm hover:bg-brand-800 transition"
          ></div>
        ))
      )}
    </>
  );
}
