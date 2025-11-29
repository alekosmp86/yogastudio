"use client";

import { WEEKDAYS } from "@/static/StaticMockData";

export function ScheduleHeader() {
  return (
    <>
      {/* top-left blank cell (corner) */}
      <div className='sticky left-0 bg-theme-headercolor z-20'></div>

      {/* weekday headers */}
      {WEEKDAYS.map((d) => (
        <div
          key={d.label}
          className='text-center py-3 font-semibold text-primary-50 bg-theme-headercolor sticky top-0 z-10 text-xs sm:text-sm border-b border-theme-border'
        >
          {d.label} - {d.date}
        </div>
      ))}
    </>
  );
}
