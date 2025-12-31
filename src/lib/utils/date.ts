export class BusinessTime {
  static readonly TIMEZONE = "America/Montevideo";

  /** Raw system time (UTC, never modified) */
  private static systemNow(): Date {
    return new Date();
  }

  /** Read system time AS business local time */
  static now() {
    return this.fromDate(this.systemNow());
  }

  /** Convert any Date into business-local representation */
  static fromDate(date: Date) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: this.TIMEZONE,
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
      time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`,

      year,
      month,
      day,
      hour,
      minute,
      second,

      /** Monday = 0 ... Sunday = 6 */
      weekday: this.businessWeekday(dateStr),
    };
  }

  /** Monday = 0 ... Sunday = 6 */
  static businessWeekday(dateStr: string): number {
    const [y, m, d] = dateStr.split("-").map(Number);

    // Create a LOCAL date at noon to avoid day shifts
    const safeDate = new Date(Date.UTC(y, m - 1, d, 12));

    const day = new Intl.DateTimeFormat("en-US", {
      timeZone: this.TIMEZONE,
      weekday: "short",
    }).format(safeDate);

    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(day);
  }

  static shiftWeekday(weekday: number, offset: number): number {
    return (((weekday + offset) % 7) + 7) % 7;
  }

  /** Current business week (Mon → Sun) */
  static getCurrentBusinessWeek(): {
    date: string;
    weekday: number;
  }[] {
    const today = this.now().date;
    const weekday = this.businessWeekday(today);

    const monday = this.addDays(today, -weekday);

    return Array.from({ length: 7 }, (_, i) => ({
      date: this.addDays(monday, i),
      weekday: i,
    }));
  }

  static formatWeekdayLabel(dateStr: string): string {
    const [y, m, d] = dateStr.split("-").map(Number);

    const safeDate = new Date(Date.UTC(y, m - 1, d, 12));

    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: this.TIMEZONE,
      weekday: "short",
      day: "2-digit",
    }).formatToParts(safeDate);

    const weekday = parts.find((p) => p.type === "weekday")!.value;
    const day = parts.find((p) => p.type === "day")!.value;

    return `${weekday} ${day}`;
  }

  /** Adds days to a YYYY-MM-DD string (SAFE) */
  static addDays(dateStr: string, days: number): string {
    const [y, m, d] = dateStr.split("-").map(Number);

    const safeDate = new Date(Date.UTC(y, m - 1, d, 12));
    safeDate.setUTCDate(safeDate.getUTCDate() + days);

    return this.fromDate(safeDate).date;
  }

  static addHours(hours: number): string {
    const now = this.fromDate(this.systemNow());
    const nextHour = (now.hour + hours) % 24;
    return `${nextHour.toString().padStart(2, "0")}:00`;
  }

  /** Compare date + time strings safely */
  static isAfter(
    dateA: string,
    timeA: string,
    dateB: string,
    timeB: string
  ): boolean {
    if (dateA !== dateB) return dateA > dateB;
    return timeA > timeB;
  }
}
