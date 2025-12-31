export class DateUtils {
  static dateWithTimezone(date: Date): Date {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  }

  static today(): Date {
    return DateUtils.dateWithTimezone(new Date());
  }

  static startOfToday(): Date {
    const d = DateUtils.dateWithTimezone(new Date());
    d.setHours(0, 0, 0, 0);
    return d;
  }

  static addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  static getCurrentHour(): number {
    const d = DateUtils.dateWithTimezone(new Date());
    d.setMinutes(0, 0, 0);
    return d.getHours() % 24;
  }

  static addHours(currentHour: number, hours: number): string {
    return `${String((currentHour + hours) % 24).padStart(2, "0")}:00`;
  }

  static getWeekday(date: Date): number {
    return date.getDay() === 0 ? 6 : date.getDay() - 1;
  }

  static toDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
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
    const d = DateUtils.dateWithTimezone(new Date(monday));
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export const HOURS = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 6; // 06 → 21
  return `${String(hour).padStart(2, "0")}:00`;
});

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
