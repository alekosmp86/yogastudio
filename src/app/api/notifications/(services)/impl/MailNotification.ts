import { NotificationService } from "../NotificationService";
import { NotificationType } from "app/api/notifications/(enums)/NotificationTypes";
import { NotificationTypePayload } from "app/api/notifications/(models)/NotificationTypePayload";
import { prisma } from "@/lib/prisma";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { mailService } from "app/api";
import { addedToWaitingListTemplate } from "../../(templates)/AddedToWaitingListTemplate";

type MailTemplate = {
  subject: string;
  body: string;
};

export class MailNotification implements NotificationService {
  private logger = new ConsoleLogger(this.constructor.name);

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

      await mailService.sendMail(
        user.email,
        template.subject,
        template.body
      );
    } catch (error) {
      this.logger.error(
        `Failed to send ${notificationType} notification to user ${userId}`,
        error
      );
    }
  }

  getMailTemplate<K extends NotificationType>(notificationType: K, payload: NotificationTypePayload[K]): MailTemplate | null {
    switch (notificationType) {
      case NotificationType.ADDED_TO_WAITING_LIST:
        return addedToWaitingListTemplate(payload);
      default:
        return null;
    }
  }
}
