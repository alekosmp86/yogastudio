import { ReservationService } from "../ReservationService";
import { RequestStatus } from "@/enums/RequestStatus";
import { prisma } from "@/lib/prisma";

export class ReservationServiceImpl implements ReservationService {

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
}
