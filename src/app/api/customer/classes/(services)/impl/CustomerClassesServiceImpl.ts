import { DailyClass } from "@/types/classes/DailyClass";
import { CustomerClassesService } from "../CustomerClassesService";
import { ApiUtils } from "app/api/utils/ApiUtils";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { APPCONFIG } from "app/config";

dayjs.extend(utc);
dayjs.extend(timezone);

export class CustomerClassesServiceImpl implements CustomerClassesService {

  async getTodayClasses(): Promise<DailyClass[]> {
    const nowUTC = dayjs().tz(APPCONFIG.TIMEZONE);
    const today = dayjs(nowUTC.format("YYYY-MM-DD")).toDate();

    const oneHourLater = nowUTC
      .add(1, "hour")
      .format("HH:mm");

    const user = await ApiUtils.getSessionUser();

    const classes = await prisma.classInstance.findMany({
      where: {
        date: today,
        startTime: {
          gte: oneHourLater,
        },
      },
      include: {
        template: {
          select: {
            title: true,
            instructor: true,
            capacity: true,
            description: true,
          },
        },
        _count: {
          select: { reservations: true },
        },
        reservations: {
          where: { userId: user.id },
          select: { id: true }, // we only need to check if it exists
        },
      },
    });

    return classes.map((c) => ({
      id: c.id,
      date: c.date.toISOString(),
      startTime: c.startTime,
      title: c.template.title,
      description: c.template.description || "",
      instructor: c.template.instructor,
      capacity: c.template.capacity,
      reserved: c._count.reservations,
      available: c.reservations.length === 0
    }));
  }
}
