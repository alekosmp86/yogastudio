import React from "react";
import { HourCell } from "./HourCell";
import { DayCell } from "./DayCell";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { Time } from "@/static/Time";
import { GymClass } from "@/types/classes/GymClass";

type ScheduleRowsProps = {
  findClassInSchedule: (weekday: number, hour: string) => GymClass | undefined;
  showClassSelectorModal: (weekday: number, hour: string) => void;
};

export default function ScheduleRows({
  findClassInSchedule,
  showClassSelectorModal,
}: ScheduleRowsProps) {
  const { getPreferenceByName } = useAppPreferences();
  const classDurationMinutes = getPreferenceByName<number>(
    "classDurationMinutes"
  );

  const generateTimeSlots = (
    startHour: number,
    endHour: number,
    slotMinutes: number
  ): string[] => {
    const slots: string[] = [];

    const start = startHour * 60;
    const end = endHour * 60;

    for (
      let minutes = start;
      minutes + slotMinutes <= end;
      minutes += slotMinutes
    ) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;

      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }

    return slots;
  };

  const hours = generateTimeSlots(6, 22, classDurationMinutes ?? 60);

  return hours.map((hour) => (
    <React.Fragment key={hour}>
      <HourCell hour={hour} />
      {Time.WEEKDAYS.map((d, index) => (
        <DayCell
          key={`${d}-${hour}`}
          data={findClassInSchedule(index, hour)}
          onClick={() => showClassSelectorModal(index, hour)}
        />
      ))}
    </React.Fragment>
  ));
}
