import { DailyClass } from "@/types/classes/DailyClass";
import { CustomerClassesService } from "../CustomerClassesService";
import { ApiUtils } from "app/api/utils/ApiUtils";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getStartOfDay, getTimeXHoursFromNow } from "@/lib/utils/date";
import { preferencesStore } from "@/lib/preferences";

dayjs.extend(utc);
dayjs.extend(timezone);

export class CustomerClassesServiceImpl implements CustomerClassesService {
  constructor() {
    this.init();
  }

  async init() {
    await preferencesStore.load();
  }

  async getTodayClasses(): Promise<DailyClass[]> {
    const today = getStartOfDay(preferencesStore.getByName<string>("timezone"));
    const oneHourLater = getTimeXHoursFromNow(
      0,
      preferencesStore.getByName<string>("timezone")
    ).format("HH:mm");
    const user = await ApiUtils.getSessionUser();

    const [classes, reservationCounts] = await Promise.all([
      prisma.classInstance.findMany({
        where: {
          date: today,
          startTime: { gte: oneHourLater },
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
          reservations: {
            where: { userId: user.id },
            select: { id: true, userId: true, cancelled: true },
          },
        },
      }),

      prisma.reservation.groupBy({
        by: ["classId"],
        where: { cancelled: false },
        _count: true,
      }),
    ]);

    return classes.map((c) => {
      const availableSpots = c.template.capacity - c.reservations.length;

      return {
        id: c.id,
        date: c.date.toISOString(),
        startTime: c.startTime,
        title: c.template.title,
        description: c.template.description || "",
        instructor: c.template.instructor,
        capacity: c.template.capacity,
        reserved: reservationCounts.find((r) => r.classId === c.id)?._count ?? 0,
        available:
          availableSpots > 0 &&
          !c.reservations.some(
            (r) => r.userId === user.id && r.cancelled === false
          ),
      };
    });
  }
}
