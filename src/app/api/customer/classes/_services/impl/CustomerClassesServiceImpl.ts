import { DailyClass } from "@/types/classes/DailyClass";
import { CustomerClassesService } from "../CustomerClassesService";
import { prisma } from "@/lib/prisma";
import { BusinessTime } from "@/lib/utils/date";
import { preferenceService } from "app/api";

export class CustomerClassesServiceImpl implements CustomerClassesService {
  async getClassesList(userId: number): Promise<DailyClass[]> {
    const timezone = await preferenceService.getStringPreferenceValue(
      "timezone"
    );

    const businessTime = new BusinessTime(timezone);
    const now = businessTime.now();
    const today = now.date;
    const nextHour = businessTime.addHours(1);

    const [classes, reservationCounts] = await Promise.all([
      prisma.classInstance.findMany({
        where: {
          OR: [
            // Today → only future classes, from the next hour onward
            {
              date: {
                gte: today,
              },
              startTime: { gte: nextHour },
            },
            // Future days → all classes
            {
              date: {
                gt: today,
              },
            },
          ],
        },
        include: {
          template: {
            select: {
              id: true,
              title: true,
              instructor: true,
              capacity: true,
              description: true,
            },
          },
          reservations: {
            where: { userId },
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
        activity: {
            id: c.template.id,
            title: c.template.title,
            instructor: c.template.instructor,
            description: c.template.description || "",
            capacity: c.template.capacity,
        },
        reserved:
          reservationCounts.find((r) => r.classId === c.id)?._count ?? 0,
        available:
          availableSpots > 0 &&
          !c.reservations.some(
            (r) => r.userId === userId && r.cancelled === false
          ),
      };
    });
  }
}
