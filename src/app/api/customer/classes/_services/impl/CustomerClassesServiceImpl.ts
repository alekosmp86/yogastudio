import { DailyClass } from "@/types/classes/DailyClass";
import { CustomerClassesService } from "../CustomerClassesService";
import { ApiUtils } from "app/api/utils/ApiUtils";
import { prisma } from "@/lib/prisma";
import { DateUtils } from "@/lib/utils/date";
import { preferenceService } from "app/api";

export class CustomerClassesServiceImpl implements CustomerClassesService {
  async getClassesList(): Promise<DailyClass[]> {
    const user = await ApiUtils.getSessionUser();

    const daysToShow = await preferenceService.getNumberPreferenceValue(
      "generateClassesForXDays"
    );

    const now = new Date();
    const today = DateUtils.startOfDay(now).toISOString();
    const lastDay = DateUtils.addDays(now, daysToShow).toISOString();
    const nextHour = DateUtils.addHours(
      DateUtils.getCurrentHour(),
      1
    ).toString();

    const [classes, reservationCounts] = await Promise.all([
      prisma.classInstance.findMany({
        where: {
          date: {
            gte: today,
            lte: lastDay,
          },
          OR: [
            // Today → only future classes
            {
              date: today,
              startTime: { gte: nextHour },
            },
            // Future days → all classes
            {
              date: { gt: today },
            },
          ],
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
        orderBy: [{ date: "asc" }, { startTime: "asc" }],
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
        date: c.date,
        startTime: c.startTime,
        title: c.template.title,
        description: c.template.description || "",
        instructor: c.template.instructor,
        capacity: c.template.capacity,
        reserved:
          reservationCounts.find((r) => r.classId === c.id)?._count ?? 0,
        available:
          availableSpots > 0 &&
          !c.reservations.some(
            (r) => r.userId === user.id && r.cancelled === false
          ),
      };
    });
  }
}
