import { ReservationService } from "../ReservationService";
import { RequestStatus } from "@/enums/RequestStatus";
import { prisma } from "@/lib/prisma";
import { ClassReservation } from "@/types/reservations/ClassReservation";

export class ReservationServiceImpl implements ReservationService {
  async getReservations(userId: number, date: string): Promise<ClassReservation[]> {
    return prisma.reservation.findMany({
      where: { userId, class: { date: date } },
      select: {
        id: true,
        class: {
          select: {
            id: true,
            startTime: true,
            template: {
              select: {
                title: true,
                instructor: true,
                capacity: true,
                description: true,
              },
            }
          }
        }
      }
    });
  }

  async createReservation(classId: number, userId: number): Promise<string> {
    // 1 — Load class + reservations + capacity
    const classInstance = await prisma.classInstance.findUnique({
      where: { id: classId },
      include: {
        template: true,
        reservations: true,
      },
    });

    if (!classInstance) {
      return RequestStatus.NOT_FOUND;
    }

    // 2 — Check if user already reserved
    const alreadyReserved = classInstance.reservations.some(
      (r) => r.userId === userId
    );

    if (alreadyReserved) {
      return RequestStatus.CLASS_ALREADY_RESERVED;
    }

    // 3 — Check if class is full
    const isFull = classInstance.reservations.length >= classInstance.template.capacity;

    if (isFull) {
      return RequestStatus.CLASS_FULL;
    }

    // 4 — Create reservation
    await prisma.reservation.create({
      data: {
        userId,
        classId,
      },
    });

    return RequestStatus.SUCCESS;
  }

  async cancelReservation(reservationId: number): Promise<void> {
    await prisma.reservation.delete({
      where: { id: reservationId },
    });
  }
}
