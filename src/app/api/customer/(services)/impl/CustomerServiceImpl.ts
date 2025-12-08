import { pad2 } from "@/lib/utils";
import { CustomerService } from "../CustomerService";
import { ScheduledClassExtended } from "@/types/schedule/ScheduledClassExtended";
import { PrismaClient } from "@prisma/client";

export class CustomerServiceImpl implements CustomerService {
  constructor(private readonly prisma: PrismaClient) {}

  async getTodayClasses(): Promise<ScheduledClassExtended[]> {
    const now = new Date();
    
    const oneHourLaterDate = new Date(now.getTime() + 60 * 60 * 1000);
    const oneHourLater = `${pad2(oneHourLaterDate.getHours())}:00`;

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
