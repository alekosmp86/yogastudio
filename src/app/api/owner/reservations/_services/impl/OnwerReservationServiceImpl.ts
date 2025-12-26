import { OnwerReservationService } from "../OnwerReservationService";
import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";
import { prisma } from "@/lib/prisma";
import { SessionUser } from "@/types/SessionUser";

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
    user: SessionUser
  ): Promise<void> {
    await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        attended,
      },
    });

    if (!attended) {
      await prisma.userPenalty.upsert({
        where: {
          userId: user.id,
        },
        update: {
          noShowCount: {
            increment: 1,
          },
        },
        create: {
          userId: user.id,
          noShowCount: 1,
        },
      });
    }
  }
}
