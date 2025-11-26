"use client";

import { HOURS, WEEKDAYS } from "@/static/StaticMockData";
import { ScheduleHeader } from "./ScheduleHeader";
import { HourCell } from "./HourCell";
import { DayCell } from "./DayCell";
import React from "react";

export default function WeeklyScheduleGrid() {
  // grid columns: 70px for hour column, then 1fr per weekday (keeps flexible)
  const gridCols = `70px repeat(${WEEKDAYS.length}, minmax(140px, 1fr))`;

  return (
    <div className="p-4 sm:p-6 bg-brand-700 rounded-xl shadow-xl border border-brand-600 text-brand-200">
      <h2 className="text-lg sm:text-xl font-semibold text-brand-400 mb-4">
        Weekly Schedule
      </h2>

      <div className="relative overflow-x-auto rounded-md border border-brand-600 shadow-inner">
        <div
          className="grid min-w-max"
          style={{
            gridTemplateColumns: gridCols,
          }}
        >
          {/* Header row */}
          <ScheduleHeader />

          {/* rows: each hour is a row with first the hour cell, then weekday cells */}
          {HOURS.map((hour) => (
            // We intentionally render a sequence of grid items per hour:
            // first the HourCell (sticky left), then WEEKDAYS.length DayCell items.
            <React.Fragment key={hour}>
              <HourCell hour={hour} />
              {WEEKDAYS.map((d) => (
                <DayCell key={`${d.label}-${hour}`} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-brand-500 block sm:hidden text-center">
        👉 Swipe horizontally to view full week
      </p>
    </div>
  );
}
