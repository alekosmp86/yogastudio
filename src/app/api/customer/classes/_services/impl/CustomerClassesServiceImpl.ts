import { DailyClass } from "@/types/classes/DailyClass";
import { CustomerClassesService } from "../CustomerClassesService";
import { ApiUtils } from "app/api/utils/ApiUtils";
import { prisma } from "@/lib/prisma";
import { DateUtils } from "@/lib/utils/date";

export class CustomerClassesServiceImpl implements CustomerClassesService {
  async getTodayClasses(): Promise<DailyClass[]> {
    const today = DateUtils.startOfDay(new Date());
    const oneHourLater = DateUtils.addHours(DateUtils.getCurrentHour(), 1).toString();
    const user = await ApiUtils.getSessionUser();

    console.log(`today: ${today}`);
    console.log(`oneHourLater: ${oneHourLater}`);

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
        date: c.date.toString(),
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
