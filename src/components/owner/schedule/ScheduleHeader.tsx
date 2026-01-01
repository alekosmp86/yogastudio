"use client";

import { BusinessTime } from "@/lib/utils/date";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";

export function ScheduleHeader() {
  const { getPreferenceByName } = useAppPreferences();
  const businessTime = new BusinessTime(
    getPreferenceByName<string>("timezone") || "UTC"
  );
  const week = businessTime.getCurrentBusinessWeek();

  return (
    <>
      {/* top-left blank corner */}
      <div
        className="
          sticky left-0 top-0 z-30
          bg-custom-100
          border-b border-r border-custom-100
        "
      />

      {/* weekday headers */}
      {week.map((d, index) => (
        <div
          key={index}
          className="
            sticky top-0 z-20
            flex items-center justify-center
            py-3
            text-xs sm:text-sm
            font-semibold
            text-custom-300
            bg-custom-100
            border-b border-custom-100
          "
        >
          {businessTime.formatWeekdayLabel(d.date)}
        </div>
      ))}
    </>
  );
}
