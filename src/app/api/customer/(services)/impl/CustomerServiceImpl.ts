import { CustomerService } from "../CustomerService";
import { ScheduledClassExtended } from "@/types/schedule/ScheduledClassExtended";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export class CustomerServiceImpl implements CustomerService {
  constructor(private readonly prisma: PrismaClient) {}

  async getTodayClasses(): Promise<ScheduledClassExtended[]> {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const now = dayjs().tz("America/Montevideo");
    const oneHourLater = now.add(1, "hour").minute(0).second(0).millisecond(0).format("HH:mm");
    console.log(`Searching for classes after ${oneHourLater}`);

    const scheduleFilter = {
      weekday: this.getTodayWeekday(),
      startTime: { gte: oneHourLater },
      isActive: true,
    };

    const todaysUpcomingClasses = await this.prisma.classTemplate.findMany({
      where: {
        schedule: { some: scheduleFilter },
      },
      include: {
        schedule: {
          where: scheduleFilter,
        },
      },
    });

    return todaysUpcomingClasses.map((classTemplate) => ({
      ...classTemplate,
      schedule: classTemplate.schedule,
    }));
  }

  getTodayWeekday(): number {
    const jsDay = new Date().getDay(); // 0=Sunday, 6=Saturday
    return jsDay === 0 ? 6 : jsDay - 1;
  }
}
