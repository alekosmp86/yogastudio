export class BusinessTime {
  constructor(private readonly timezone: string) {}

  /** Raw system time (UTC, never modified) */
  private systemNow(): Date {
    return new Date();
  }

  /** Read system time AS business local time */
  now() {
    return this.fromDate(this.systemNow());
  }

  /** Convert any Date into business-local representation */
  fromDate(date: Date) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: this.timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(date);

    const get = (t: string) => parts.find((p) => p.type === t)!.value;

    const year = get("year");
    const month = get("month");
    const day = get("day");

    const hour = Number(get("hour"));
    const minute = Number(get("minute"));
    const second = Number(get("second"));

    const dateStr = `${year}-${month}-${day}`;

    return {
      /** YYYY-MM-DD */
      date: dateStr,

      /** HH:mm */
      time: `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`,

      year,
      month,
      day,
      hour,
      minute,
      second,
      timezone: this.timezone,

      /** Monday = 0 ... Sunday = 6 */
      weekday: this.businessWeekday(dateStr),
    };
  }

  /** Monday = 0 ... Sunday = 6 */
  businessWeekday(dateStr: string): number {
    const [y, m, d] = dateStr.split("-").map(Number);

    // Noon UTC avoids date shifting
    const safeDate = new Date(Date.UTC(y, m - 1, d, 12));

    const day = new Intl.DateTimeFormat("en-US", {
      timeZone: this.timezone,
      weekday: "short",
    }).format(safeDate);

    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(day);
  }

  /** Safe weekday shifting */
  shiftWeekday(weekday: number, offset: number): number {
    return (((weekday + offset) % 7) + 7) % 7;
  }

  /** Current business week (Mon → Sun) */
  getCurrentBusinessWeek(): { date: string; weekday: number }[] {
    const today = this.now().date;
    const weekday = this.businessWeekday(today);

    const monday = this.addDays(today, -weekday);

    return Array.from({ length: 7 }, (_, i) => ({
      date: this.addDays(monday, i),
      weekday: i,
    }));
  }

  formatWeekdayLabel(dateStr: string): string {
    const [y, m, d] = dateStr.split("-").map(Number);

    const safeDate = new Date(Date.UTC(y, m - 1, d, 12));

    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: this.timezone,
      weekday: "short",
      day: "2-digit",
    }).formatToParts(safeDate);

    const weekday = parts.find((p) => p.type === "weekday")!.value;
    const day = parts.find((p) => p.type === "day")!.value;

    return `${weekday} ${day}`;
  }

  /** Adds days to a YYYY-MM-DD string (SAFE) */
  addDays(dateStr: string, days: number): string {
    const [y, m, d] = dateStr.split("-").map(Number);

    const safeDate = new Date(Date.UTC(y, m - 1, d, 12));
    safeDate.setUTCDate(safeDate.getUTCDate() + days);

    return this.fromDate(safeDate).date;
  }

  /** Returns HH:00 based on business time */
  addHours(hours: number): string {
    const now = this.now();
    const nextHour = (now.hour + hours) % 24;
    return `${nextHour.toString().padStart(2, "0")}:00`;
  }

  /** Compare date + time strings safely */
  isAfter(dateA: string, timeA: string, dateB: string, timeB: string): boolean {
    if (dateA !== dateB) return dateA > dateB;
    return timeA > timeB;
  }

  formatDate(dateStr: string, locale: string): string {
    const [y, m, d] = dateStr.split("-").map(Number);

    // Noon UTC avoids date shifting across timezones
    const safeDate = new Date(Date.UTC(y, m - 1, d, 12));

    return new Intl.DateTimeFormat(locale, {
      timeZone: this.timezone,
      weekday: "long",
      day: "2-digit",
      month: "long",
    }).format(safeDate);
  }
}
