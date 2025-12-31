import { DailyClass } from "@/types/classes/DailyClass";
import { CustomerClassesService } from "../CustomerClassesService";
import { ApiUtils } from "app/api/utils/ApiUtils";
import { prisma } from "@/lib/prisma";
import { preferenceService } from "app/api";
import DayjsUtils from "@/lib/utils/dayjs";

export class CustomerClassesServiceImpl implements CustomerClassesService {
  async getClassesList(): Promise<DailyClass[]> {
    const user = await ApiUtils.getSessionUser();

    const timezone = await preferenceService.getStringPreferenceValue(
      "timezone"
    );

    const today = DayjsUtils.getToday(timezone);
    const nextHour = DayjsUtils.nextHour(today);

    const [classes, reservationCounts] = await Promise.all([
      prisma.classInstance.findMany({
        where: {
          date: {
            gte: today.format("YYYY-MM-DD"),
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

    const filteredByCurrentHour = classes.filter(
      (c) => c.startTime >= nextHour
    );

    return filteredByCurrentHour.map((c) => {
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
