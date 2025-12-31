import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export default class DayjsUtils {
  static getToday(timezone: string): dayjs.Dayjs {
    return dayjs().tz(timezone);
  }

  static startOfDay(timezone: string): dayjs.Dayjs {
    return dayjs().tz(timezone).startOf("day");
  }

  static addDays(
    date: dayjs.Dayjs,
    days: number,
    timezone: string
  ): dayjs.Dayjs {
    return dayjs(date).tz(timezone).add(days, "day");
  }

  static getWeekday(date: dayjs.Dayjs): number {
    return date.day() === 0 ? 6 : date.day() - 1;
  }

  static nextHour(day: dayjs.Dayjs = dayjs()): string {
    return day.add(1, "hour").startOf("hour").format("HH:mm");
  }

  static getCurrentHour(timezone: string): dayjs.Dayjs {
    return dayjs().tz(timezone).startOf("hour");
  }

  static addHours(
    day: dayjs.Dayjs,
    hours: number,
    timezone: string
  ): dayjs.Dayjs {
    return dayjs(day).tz(timezone).add(hours, "hour");
  }

  static formatDate(date: string, locale: string, timezone: string): string {
    return dayjs(date).tz(timezone).toDate().toLocaleDateString(locale, {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  }
}
