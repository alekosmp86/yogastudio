import { OnwerReservationService } from "../OnwerReservationService";
import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";
import { prisma } from "@/lib/prisma";

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
                  email: true
                },
              },
            },
          },
        },
      });
    }
}