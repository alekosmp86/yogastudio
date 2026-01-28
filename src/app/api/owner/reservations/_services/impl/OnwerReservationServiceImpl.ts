import { OnwerReservationService } from "../OnwerReservationService";
import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";
import { prisma } from "@/lib/prisma";
import { preferenceService } from "app/api";
import { BusinessTime } from "@/lib/utils/date";
import { hookRegistry } from "@/lib/registry";
import { CoreHooks } from "@/modules/[core]/CoreHooks";

export class OnwerReservationServiceImpl implements OnwerReservationService {
  async getReservations(): Promise<ReservationsPerClass[]> {
    const timezone = await preferenceService.getStringPreferenceValue(
      "timezone"
    );
    const businessTime = new BusinessTime(timezone);
    const today = businessTime.now().date;

    /**
     * @todo: este codigo queda comentado por la posibilidad de obtener todas las reservas
     *        y mostrarlas al owner en una tabla
     * const daysAhead = await preferenceService.getNumberPreferenceValue("generateClassesForXDays");
     * const endDate = DateUtils.startOfDay(DateUtils.addDays(today, daysAhead));
     * 
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
    });*/

    return await prisma.classInstance.findMany({
      where: {
        date: today,
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
    });
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

    await hookRegistry.runHooks(CoreHooks.afterAttendanceUpdated, "after", {
      userId,
      attended,
    });
  }
}
