import { OnwerReservationService } from "../OnwerReservationService";
import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";
import { prisma } from "@/lib/prisma";
import { userPenaltyService } from "app/api";

export class OnwerReservationServiceImpl implements OnwerReservationService {
  async getReservations(targetDate: string): Promise<ReservationsPerClass[]> {
    return await prisma.classInstance.findMany({
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

    await userPenaltyService.updateOrInsert(userId, attended);
  }
}
