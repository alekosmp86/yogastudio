"use client";

import { WEEKDAYS } from "@/static/StaticMockData";

export function ScheduleHeader() {
  return (
    <>
      {/* top-left blank cell (corner) */}
      <div className='sticky left-0 bg-brand-800 z-20 border-r border-brand-600'></div>

      {/* weekday headers */}
      {WEEKDAYS.map((d) => (
        <div
          key={d.label}
          className='text-center py-3 font-semibold text-brand-300 bg-brand-800 sticky top-0 z-10 text-xs sm:text-sm border-b border-brand-600'
        >
          <div className='text-xs sm:text-sm'>
            {d.label} - {d.date}
          </div>
        </div>
      ))}
    </>
  );
}
