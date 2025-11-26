"use client";

import { HOURS } from "@/static/StaticMockData";

export function ScheduleHourColumn() {
  return (
    <>
      {HOURS.map((hour) => (
        <div
          key={hour}
          className="px-2 py-4 border-b border-brand-600 text-xs sm:text-sm bg-brand-800 sticky left-0 z-10"
        >
          {hour}
        </div>
      ))}
    </>
  );
}
