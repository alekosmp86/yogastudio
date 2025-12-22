import { NotificationType } from "@/enums/NotificationTypes";
import { UserReservationService } from "../UserReservationService";
import { RequestStatus } from "@/enums/RequestStatus";
import { prisma } from "@/lib/prisma";
import { ClassReservation } from "@/types/reservations/ClassReservation";
import { WaitingList } from "@prisma/client";
import { notificationService } from "app/api";
import { NotificationTypePayload } from "@/types/NotificationTypePayload";

export class UserReservationServiceImpl implements UserReservationService {
  async getReservations(userId: number, date: string, time: string): Promise<ClassReservation[]> {
    return prisma.reservation.findMany({
      where: { userId, class: { date, startTime: { gt: time } } },
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
        waitingList: true,
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
      const isOnWaitingList = classInstance.waitingList.some(
        (waitingList: WaitingList) => waitingList.userId === userId
      );

      if (isOnWaitingList) {
        return RequestStatus.ON_WAITING_LIST;
      } else {
        //add to waiting list
        await prisma.waitingList.create({
          data: {
            userId,
            classId,
          },
        });

        //notify user
        const payload: NotificationTypePayload[NotificationType.ADDED_TO_WAITING_LIST] = {
            classTitle: classInstance.template.title,
            classDate: classInstance.date.toDateString(),
            classTime: classInstance.startTime,
            instructorName: classInstance.template.instructor,
        };
        notificationService.sendNotification(userId, NotificationType.ADDED_TO_WAITING_LIST, payload);
      }

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

  async cancelReservationFromClass(classId: number): Promise<void> {
    await prisma.reservation.deleteMany({
      where: { classId },
    });
  }
}
