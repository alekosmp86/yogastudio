import { NotificationService } from "../NotificationService";
import { NotificationType } from "app/api/notifications/_enums/NotificationTypes";
import { NotificationTypePayload } from "app/api/notifications/_models/NotificationTypePayload";
import { prisma } from "@/lib/prisma";
import { mailService } from "app/api";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import * as templates from "app/api/notifications/_templates/mail";
import { SessionUser } from "@/types/SessionUser";
import { ClassInstance, ClassTemplate } from "@prisma/client";
import dayjs from "dayjs";
import { APPCONFIG } from "app/config";
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

      case NotificationType.CLASS_CANCELATION:
        return templates.classCancelationTemplate(
          payload as NotificationTypePayload[NotificationType.CLASS_CANCELATION]
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
      classDate: dayjs(classInstance.date)
        .tz(APPCONFIG.TIMEZONE)
        .format("YYYY-MM-DD"),
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

      case NotificationType.CLASS_CANCELATION:        
        return {
          ...base,
          contactEmail: preferencesStore.getByName<string>("businessEmail"),
          contactPhone: preferencesStore.getByName<string>("businessWhatsappNumber"),
          rescheduleBookingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/customer/classes`,
        } as NotificationTypePayload[K];
    }
  }
}
