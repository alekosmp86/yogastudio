import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export default class DayjsUtils {
    static startOfDay(date: dayjs.Dayjs, timezone: string): dayjs.Dayjs {
        return dayjs(date).tz(timezone).startOf('day');
    }

    static addDays(date: dayjs.Dayjs, days: number, timezone: string): dayjs.Dayjs {
        return dayjs(date).tz(timezone).add(days, 'day');
    }

    static getWeekday(date: dayjs.Dayjs): number {
        return date.day() === 0 ? 6 : date.day() - 1;
    }
}