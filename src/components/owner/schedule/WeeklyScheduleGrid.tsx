"use client";

import { useState } from "react";
import { useClasses } from "@/lib/contexts/ClassesContext";
import { WEEKDAYS, HOURS } from "@/lib/utils";
import { GymClass } from "@/types/classes/GymClass";
import ClassSelectorDropdown from "./ClassSelectorDropdown";
import { mockWeeklySchedule } from "app/owner/schedule/ScheduleMockData";

export default function WeeklyScheduleGrid() {
  const { classes } = useClasses();
  const [schedule, setSchedule] = useState(mockWeeklySchedule);
  const [selectorPos, setSelectorPos] = useState<{
    weekday: number;
    hour: string;
  } | null>(null);
  const [selectorAnchor, setSelectorAnchor] = useState<DOMRect | null>(null);

  const openSelector = (weekday: number, hour: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSelectorAnchor(rect);
    setSelectorPos({ weekday, hour });
  };

  const applyClassSelection = (cls: GymClass | null) => {
    if (!selectorPos) return;
    const { weekday, hour } = selectorPos;

    setSchedule((prev) => {
      const existing = prev.find(
        (s) => s.weekday === weekday && s.startTime === hour
      );

      if (cls === null) {
        // remove
        return prev.filter(
          (s) => !(s.weekday === weekday && s.startTime === hour)
        );
      }

      if (existing) {
        // replace
        return prev.map((s) =>
          s.weekday === weekday && s.startTime === hour
            ? { ...s, templateId: cls.id }
            : s
        );
      }

      // add new
      return [
        ...prev,
        { id: Date.now(), templateId: cls.id, weekday, startTime: hour },
      ];
    });

    setSelectorPos(null);
  };

  const getClassAt = (weekday: number, hour: string) => {
    const entry = schedule.find(
      (s) => s.weekday === weekday && s.startTime === hour
    );
    if (!entry) return null;
    return classes.find((c) => c.id === entry.templateId);
  };

  return (
    <div className='p-4 sm:p-6 bg-brand-700 rounded-xl shadow-xl border border-brand-600 text-brand-200'>
      <h2 className='text-lg sm:text-xl font-semibold text-brand-400 mb-4'>
        Weekly Schedule
      </h2>

      {/* scroll wrapper */}
      <div className='relative overflow-x-auto rounded-md border border-brand-600 shadow-inner'>
        <div
          className='grid min-w-max'
          style={{
            gridTemplateColumns: `70px repeat(${WEEKDAYS.length}, 1fr)`,
          }}
        >
          {/* Header row */}
          <div className='sticky left-0 bg-brand-800 z-20'></div>
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className='text-center py-2 font-semibold text-brand-300 bg-brand-800 sticky top-0 z-10 text-xs sm:text-sm'
            >
              {d}
            </div>
          ))}

          {/* Time rows */}
          {HOURS.map((hour) => (
            <>
              {/* hour column — sticky on mobile */}
              <div
                key={hour}
                className='px-2 py-4 border-b border-brand-600 text-xs sm:text-sm bg-brand-800 sticky left-0 z-10'
              >
                {hour}
              </div>

              {/* grid cells */}
              {WEEKDAYS.map((_, weekday) => {
                const cls = getClassAt(weekday, hour);
                return (
                  <div
                    key={`${weekday}-${hour}`}
                    onClick={(e) => openSelector(weekday, hour, e)}
                    className={`border border-brand-600 cursor-pointer px-1 py-4 sm:px-2 sm:py-3 text-xs sm:text-sm transition rounded-sm
                      ${
                        cls
                          ? "bg-brand-500 text-brand-900 hover:bg-brand-400"
                          : "hover:bg-brand-800"
                      }
                    `}
                  >
                    {cls ? cls.title : ""}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {selectorPos && selectorAnchor && (
        <div
          className='fixed'
          style={{
            top: selectorAnchor.top + window.scrollY + 40,
            left: selectorAnchor.left,
          }}
        >
          <ClassSelectorDropdown
            classes={classes}
            onSelect={applyClassSelection}
            onClose={() => setSelectorPos(null)}
          />
        </div>
      )}

      <p className='mt-3 text-xs text-brand-500 block sm:hidden text-center'>
        👉 Swipe horizontally to view full week
      </p>
    </div>
  );
}