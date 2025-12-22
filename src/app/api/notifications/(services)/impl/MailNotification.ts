import { NotificationService } from "../NotificationService";
import { NotificationType } from "@/enums/NotificationTypes";
import { prisma } from "@/lib/prisma";
import { NotificationTypePayload } from "@/types/NotificationTypePayload";
import { mailService } from "app/api";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";

export class MailNotification implements NotificationService {
  private logger = new ConsoleLogger(this.constructor.name);

  async sendNotification<K extends NotificationType, T>(
    userId: number,
    notificationType: K,
    payload: T
  ): Promise<void> {
    this.logger.log(
      `Sending ${notificationType} notification to user ${userId}`
    );

    try {
      const userToNotify = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userToNotify) {
        this.logger.error(`User ${userId} not found`);
        return;
      }

      let mailSubject,
        mailBody = "";
      switch (notificationType) {
        case NotificationType.ADDED_TO_WAITING_LIST: {
          const data =
            payload as NotificationTypePayload[NotificationType.ADDED_TO_WAITING_LIST];
          mailSubject = "You’ve been added to the waiting list";
          mailBody = `You have been added to the waiting list for ${data.classTitle} \n
                    Date: ${data.classDate} \n
                    Time: ${data.classTime} \n
                    Instructor: ${data.instructorName}`;
          break;
        }
      }

      mailService.sendMail(userToNotify.email, mailSubject, mailBody);
    } catch {
      this.logger.error(
        `Failed to send ${notificationType} notification to user ${userId}`
      );
    }
  }
}
