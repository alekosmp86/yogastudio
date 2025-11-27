"use client";

import { WEEKDAYS } from "@/static/StaticMockData";

export function ScheduleHeader() {
  return (
    <>
      {/* top-left blank cell (corner) */}
      <div className='sticky left-0 bg-surface-section z-20 border-r border-surface-input'></div>

      {/* weekday headers */}
      {WEEKDAYS.map((d) => (
        <div
          key={d.label}
          className='text-center py-3 font-semibold text-textcolor-ondark bg-surface-section sticky top-0 z-10 text-xs sm:text-sm border-b border-surface-input'
        >
          <div className='text-xs sm:text-sm'>
            {d.label} - {d.date}
          </div>
        </div>
      ))}
    </>
  );
}
