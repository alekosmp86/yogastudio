import { NotificationType } from "app/api/notifications/_enums/NotificationTypes";
import { UserReservationService } from "../UserReservationService";
import { RequestStatus } from "@/enums/RequestStatus";
import { prisma } from "@/lib/prisma";
import { ClassReservation } from "@/types/reservations/ClassReservation";
import { ClassInstance, ClassTemplate, WaitingList } from "@prisma/client";
import { classInstanceService, notificationService, waitingListService } from "app/api";
import { SessionUser } from "@/types/SessionUser";
import dayjs from "dayjs";
import { APPCONFIG } from "app/config";
import { NotificationTypePayload } from "app/api/notifications/_models/NotificationTypePayload";

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
            },
          },
        },
      },
    });
  }

  async createReservation(classId: number, user: SessionUser): Promise<string> {
    // 1 — Load class + reservations + capacity
    const classInstance = await classInstanceService.findUniqueByIdIncludingData(classId, {
      template: true,
      reservations: true,
      waitingList: true,
    });

    if (!classInstance) {
      return RequestStatus.NOT_FOUND;
    }

    // 2 — Check if user already reserved
    const alreadyReserved = classInstance.reservations.some(
      (r) => r.userId === user.id
    );

    if (alreadyReserved) {
      return RequestStatus.CLASS_ALREADY_RESERVED;
    }

    // 3 — Check if class is full
    const isFull =
      classInstance.reservations.length >= classInstance.template.capacity;

    if (isFull) {
      const isOnWaitingList = classInstance.waitingList.some(
        (waitingList: WaitingList) => waitingList.userId === user.id
      );

      if (isOnWaitingList) {
        return RequestStatus.ON_WAITING_LIST;
      } else {
        //add to waiting list
        await waitingListService.addToWaitingList(user.id, classId);

        //notify user
        notificationService.sendNotification(
          user.id,
          NotificationType.ADDED_TO_WAITING_LIST,
          notificationService.buildNotificationPayload(
            NotificationType.ADDED_TO_WAITING_LIST,
            user,
            classInstance
          )
        );
      }

      return RequestStatus.CLASS_FULL;
    }

    // 4 — Create reservation
    await prisma.reservation.create({
      data: {
        userId: user.id,
        classId,
      },
    });

    //notify user
    notificationService.sendNotification(
      user.id,
      NotificationType.CLASS_BOOKED,
      notificationService.buildNotificationPayload(
        NotificationType.CLASS_BOOKED,
        user,
        classInstance
      )
    );

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
