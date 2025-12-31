// src/services/BusinessTime.ts
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

    const get = (t: string) =>
      parts.find(p => p.type === t)!.value;

    const year = get("year");
    const month = get("month");
    const day = get("day");
    const hour = Number(get("hour"));
    const minute = Number(get("minute"));
    const second = Number(get("second"));

    return {
      /** YYYY-MM-DD */
      date: `${year}-${month}-${day}`,

      /** HH:mm */
      time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      hour,
      minute,
      second,
      
      /** Monday = 0 ... Sunday = 6 */
      weekday: this.businessWeekday(date),
    };
  }

  /** Monday = 0 ... Sunday = 6 */
  static businessWeekday(date: Date): number {
    const day = new Intl.DateTimeFormat("en-US", {
      timeZone: this.TIMEZONE,
      weekday: "short",
    }).format(date);

    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(day);
  }

  /** Adds days to a YYYY-MM-DD string */
  static addDays(dateStr: string, days: number): string {
    const d = new Date(`${dateStr}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + days);
    return this.fromDate(d).date;
  }

  static addHours(dateStr: string, hours: number): string {
    const d = new Date(`${dateStr}T00:00:00Z`);
    d.setUTCHours(d.getUTCHours() + hours);
    return this.fromDate(d).date;
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
