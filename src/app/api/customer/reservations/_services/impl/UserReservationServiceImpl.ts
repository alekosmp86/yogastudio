import { NotificationType } from "app/api/notifications/_enums/NotificationTypes";
import { UserReservationService } from "../UserReservationService";
import { RequestStatus } from "@/enums/RequestStatus";
import { prisma } from "@/lib/prisma";
import { ClassReservation } from "@/types/reservations/ClassReservation";
import { ClassInstance, ClassTemplate, WaitingList } from "@prisma/client";
import {
  classInstanceService,
  notificationService,
  preferenceService,
  waitingListService,
} from "app/api";
import { SessionUser } from "@/types/SessionUser";
import { BusinessTime } from "@/lib/utils/date";
import { hookRegistry } from "@/lib/registry";
import { CoreHooks } from "@/modules/[core]/CoreHooks";

export class UserReservationServiceImpl implements UserReservationService {
  async getReservations(userId: number): Promise<ClassReservation[]> {
    const timezone = await preferenceService.getStringPreferenceValue(
      "timezone"
    );
    const businessTime = new BusinessTime(timezone);
    const date = businessTime.now().date;
    const oneHourLater = businessTime.addHours(1);

    return prisma.reservation.findMany({
      where: {
        userId,
        cancelled: false,
        OR: [
          // Future days
          {
            class: {
              date: { gt: date },
            },
          },

          // Today, but only future hours
          {
            class: {
              date,
              startTime: { gte: oneHourLater },
            },
          },
        ],
      },
      orderBy: [{ class: { date: "asc" } }, { class: { startTime: "asc" } }],
      select: {
        id: true,
        class: {
          select: {
            id: true,
            date: true,
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
    const classInstance =
      await classInstanceService.findUniqueByIdIncludingData(classId, {
        template: true,
        reservations: true,
        waitingList: true,
      });

    if (!classInstance) {
      return RequestStatus.NOT_FOUND;
    }

    // 2 — Check if user already reserved
    const alreadyReserved = classInstance.reservations.find(
      (r) => r.userId === user.id
    );

    if (alreadyReserved) {
      if (alreadyReserved.cancelled) {
        this.rescheduleReservation(alreadyReserved.id);
        return RequestStatus.SUCCESS;
      } else {
        return RequestStatus.CLASS_ALREADY_RESERVED;
      }
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
          await notificationService.buildNotificationPayload(
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
      await notificationService.buildNotificationPayload(
        NotificationType.CLASS_BOOKED,
        user,
        classInstance
      )
    );

    return RequestStatus.SUCCESS;
  }

  async cancelReservation(
    reservationId: number,
    user: SessionUser
  ): Promise<void> {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: {
        class: {
          include: {
            template: true,
          },
        },
      },
    });

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        cancelled: true,
      },
      include: {
        class: {
          include: {
            template: true,
          },
        },
      },
    });

    await hookRegistry.runHooks(
      CoreHooks.afterReservationCancelled,
      "after",
      updatedReservation
    );

    this.notifyUserAboutReservationCancellation(reservation.class, user);
    this.notifyUsersInWaitingList(reservation.class, user);
  }

  async cancelReservationFromClass(
    classId: number,
    user: SessionUser
  ): Promise<void> {
    const classInstance = await prisma.classInstance.findUnique({
      where: { id: classId },
      include: {
        template: true,
      },
    });

    if (!classInstance) {
      throw new Error("Class not found");
    }

    const existingReservation = await prisma.reservation.findUnique({
      where: {
        userId_classId: {
          userId: user.id,
          classId: classId,
        },
      },
    });

    if (existingReservation) {
      const updatedReservation = await prisma.reservation.update({
        where: { id: existingReservation.id },
        data: {
          cancelled: true,
        },
        include: {
          class: {
            include: {
              template: true,
            },
          },
        },
      });

      await hookRegistry.runHooks(
        CoreHooks.afterReservationCancelled,
        "after",
        updatedReservation
      );

      this.notifyUserAboutReservationCancellation(classInstance, user);
      this.notifyUsersInWaitingList(classInstance, user);
    }
  }

  async rescheduleReservation(reservationId: number): Promise<void> {
    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        cancelled: false,
      },
    });
  }

  async notifyUserAboutReservationCancellation(
    classInstance: ClassInstance & { template: ClassTemplate },
    user: SessionUser
  ): Promise<void> {
    notificationService.sendNotification(
      user.id,
      NotificationType.CLASS_CANCELLED,
      await notificationService.buildNotificationPayload(
        NotificationType.CLASS_CANCELLED,
        user,
        classInstance
      )
    );
  }

  async notifyUsersInWaitingList(
    classInstance: ClassInstance & { template: ClassTemplate },
    user: SessionUser
  ): Promise<void> {
    const waitingList = await prisma.waitingList.findMany({
      where: { classId: classInstance.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    for (const waitingListUser of waitingList) {
      notificationService.sendNotification(
        waitingListUser.userId,
        NotificationType.CLASS_SPOT_OPENED,
        await notificationService.buildNotificationPayload(
          NotificationType.CLASS_SPOT_OPENED,
          user,
          classInstance
        )
      );
    }
  }
}
