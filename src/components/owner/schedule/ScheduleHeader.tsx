"use client";

import { BusinessTime } from "@/lib/utils/date";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";

export function ScheduleHeader() {
  const {getPreferenceByName} = useAppPreferences();
  const businessTime = new BusinessTime(getPreferenceByName<string>("timezone") || "UTC");
  const week = businessTime.getCurrentBusinessWeek();

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
          {businessTime.formatWeekdayLabel(d.date)}
        </div>
      ))}
    </>
  );
}
