import { OnwerReservationService } from "../OnwerReservationService";
import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";
import { prisma } from "@/lib/prisma";
import { preferenceService, userPenaltyService } from "app/api";
import { DateUtils } from "@/lib/utils/date";

export class OnwerReservationServiceImpl implements OnwerReservationService {
  async getReservations(): Promise<ReservationsPerClass[]> {
    const daysAhead = await preferenceService.getPreferenceValue<number>(
      "generateClassesForXDays"
    );

    const today = DateUtils.startOfDay(new Date());
    const endDate = DateUtils.startOfDay(DateUtils.addDays(today, daysAhead));

    return prisma.classInstance.findMany({
      where: {
        date: {
          gte: today.toISOString(),
          lte: endDate.toISOString(),
        },
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      include: {
        template: {
          select: {
            title: true,
            description: true,
            instructor: true,
            capacity: true,
          },
        },
        reservations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    /*return await prisma.classInstance.findMany({
      where: {
        date: targetDate,
      },
      orderBy: {
        startTime: "asc",
      },
      include: {
        template: {
          select: {
            title: true,
            description: true,
            instructor: true,
            capacity: true,
          },
        },
        reservations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });*/
  }

  async updateAttendance(
    reservationId: number,
    attended: boolean,
    userId: number
  ): Promise<void> {
    await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        attended,
      },
    });

    await userPenaltyService.updateOrInsert(userId, attended);
  }
}
