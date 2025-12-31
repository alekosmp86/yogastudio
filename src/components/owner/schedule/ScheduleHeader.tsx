"use client";

import { BusinessTime } from "@/lib/utils/date";

export function ScheduleHeader() {
  const week = BusinessTime.getCurrentBusinessWeek();

  return (
    <>
      {/* top-left blank cell (corner) */}
      <div className='sticky left-0 bg-black z-20'></div>

      {/* weekday headers */}
      {week.map((d, index) => (
        <div
          key={index}
          className='text-center py-3 font-semibold text-primary-50 bg-black sticky top-0 z-10 text-xs sm:text-sm border-b border-theme-border'
        >
          {BusinessTime.formatWeekdayLabel(d.date)}
        </div>
      ))}
    </>
  );
}
