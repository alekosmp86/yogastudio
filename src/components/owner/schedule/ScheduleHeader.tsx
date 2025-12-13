"use client";

import { getCurrentWeekDates, pad2, WEEKDAYS } from "@/lib/utils";

export function ScheduleHeader() {
  const dates = getCurrentWeekDates();
  
  return (
    <>
      {/* top-left blank cell (corner) */}
      <div className='sticky left-0 bg-black z-20'></div>

      {/* weekday headers */}
      {dates.map((d, index) => (
        <div
          key={index}
          className='text-center py-3 font-semibold text-primary-50 bg-black sticky top-0 z-10 text-xs sm:text-sm border-b border-theme-border'
        >
          {WEEKDAYS[index]} - {pad2(d.getDate())}
        </div>
      ))}
    </>
  );
}
