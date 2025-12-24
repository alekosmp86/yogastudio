import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getStartOfDay = (timezone?: string) => {
    const now = timezone ? dayjs().tz(timezone) : dayjs();
    return now.startOf("day").toISOString();
}

export const getTimeXHoursFromNow = (hours: number, timezone?: string) => {
    const now = timezone ? dayjs().tz(timezone) : dayjs();
    return now.add(hours, "hours");
}

export const getTodayWeekday = () => {
  // Monday = 0 ... Sunday = 6
  const jsDay = new Date().getDay(); // Sun=0 ... Sat=6
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function getCurrentWeekDates(): Date[] {
  const today = new Date();

  // getDay(): Sunday=0, Monday=1, ... Saturday=6
  const dayOfWeek = today.getDay();

  // We want Monday=0, Tuesday=1, ..., Sunday=6
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  // Build array [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export const HOURS = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 6; // 06 → 21
  return `${String(hour).padStart(2, "0")}:00`;
});

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];