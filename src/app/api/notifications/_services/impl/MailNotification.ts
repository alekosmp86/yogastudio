import { NotificationService } from "../NotificationService";
import { NotificationType } from "app/api/notifications/_enums/NotificationTypes";
import { NotificationTypePayload } from "app/api/notifications/_models/NotificationTypePayload";
import { prisma } from "@/lib/prisma";
import { mailService } from "app/api";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import * as templates from "app/api/notifications/_templates/mail";
import { SessionUser } from "@/types/SessionUser";
import { ClassInstance, ClassTemplate } from "@prisma/client";
import { preferencesStore } from "@/lib/preferences";

type MailTemplate = {
  subject: string;
  body: string;
};

export class MailNotification implements NotificationService {
  private logger = new ConsoleLogger(this.constructor.name);

  constructor() {
    this.init();
  }

  async init() {
    await preferencesStore.load();
  }

  async sendNotification<K extends NotificationType>(
    userId: number,
    notificationType: K,
    payload: NotificationTypePayload[K]
  ): Promise<void> {
    this.logger.log(
      `Sending ${notificationType} notification to user ${userId}`
    );

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        this.logger.error(`User ${userId} not found`);
        return;
      }

      const template = this.getMailTemplate(notificationType, payload);
      if (!template) {
        this.logger.error(`No mail template for ${notificationType}`);
        return;
      }

      this.logger.log(`Sending mail notification to ${user.email}`);
      await mailService.sendMail(user.email, template.subject, template.body);
    } catch (error) {
      this.logger.error(
        `Failed to send ${notificationType} notification to user ${userId}`,
        error
      );
    }
  }

  getMailTemplate(
    notificationType: NotificationType,
    payload: NotificationTypePayload[NotificationType]
  ): MailTemplate | null {
    switch (notificationType) {
      case NotificationType.ADDED_TO_WAITING_LIST:
        return templates.addedToWaitingListTemplate(
          payload as NotificationTypePayload[NotificationType.ADDED_TO_WAITING_LIST]
        );

      case NotificationType.CLASS_BOOKED:
        return templates.classBookedTemplate(
          payload as NotificationTypePayload[NotificationType.CLASS_BOOKED]
        );

      case NotificationType.CLASS_CANCELLED:
        return templates.classCancelledTemplate(
          payload as NotificationTypePayload[NotificationType.CLASS_CANCELLED]
        );

      case NotificationType.CLASS_SPOT_OPENED:
        return templates.classSpotOpenedTemplate(
          payload as NotificationTypePayload[NotificationType.CLASS_SPOT_OPENED]
        );

      case NotificationType.USER_BLOCKED:
        return templates.blockedFromTheAppTemplate(
          payload as NotificationTypePayload[NotificationType.USER_BLOCKED]
        );

      default:
        return null;
    }
  }

  buildNotificationPayload<K extends NotificationType>(
    notificationType: K,
    user: SessionUser,
    classInstance: ClassInstance & { template: ClassTemplate }
  ): NotificationTypePayload[K] {
    const base = {
      userName: user.name,
      classTitle: classInstance.template.title,
      classDate: classInstance.date,
      classTime: classInstance.startTime,
      instructorName: classInstance.template.instructor,
    };

    switch (notificationType) {
      case NotificationType.ADDED_TO_WAITING_LIST:
        return base as NotificationTypePayload[K];

      case NotificationType.CLASS_BOOKED:
        return {
          ...base,
          cancelBookingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/customer/reservations`,
        } as NotificationTypePayload[K];

      case NotificationType.CLASS_CANCELLED:
        return {
          ...base,
          contactEmail: preferencesStore.getByName<string>("businessEmail"),
          contactPhone: preferencesStore.getByName<string>(
            "businessWhatsappNumber"
          ),
          rescheduleBookingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/customer/classes`,
        } as NotificationTypePayload[K];

      case NotificationType.CLASS_SPOT_OPENED:
        return {
          ...base,
          bookClassUrl: `${process.env.NEXT_PUBLIC_APP_URL}/customer/classes`,
        } as NotificationTypePayload[K];

      case NotificationType.USER_BLOCKED:
        return {
          userName: user.name,
          contactEmail: preferencesStore.getByName<string>("businessEmail"),
          contactPhone: preferencesStore.getByName<string>(
            "businessWhatsappNumber"
          ),
        } as NotificationTypePayload[K];
    }
  }
}
