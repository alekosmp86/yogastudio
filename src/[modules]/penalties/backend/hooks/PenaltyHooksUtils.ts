import { prisma } from "@/lib/prisma";
import { BusinessTime } from "@/lib/utils/date";
import { MailNotification } from "app/api/notifications/_services/impl/MailNotification";
import { PreferenceServiceImpl } from "app/api/owner/preferences/_services/impl/PreferenceServiceImpl";
import { NotificationType } from "app/api/notifications/_enums/NotificationTypes";

const preferenceService = new PreferenceServiceImpl();
const mailNotificationService = new MailNotification();

export class PenaltyHooksUtils {
  static async notifyUserBlocked(
    userId: number,
    businessTime: BusinessTime
  ): Promise<void> {
    const [businessEmail, businessPhone, penaltyBlockDuration] =
      await Promise.all([
        preferenceService.getStringPreferenceValue("businessEmail"),
        preferenceService.getStringPreferenceValue("businessWhatsappNumber"),
        preferenceService.getNumberPreferenceValue("penaltyBlockDuration"),
      ]);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return;
    }

    await mailNotificationService.sendNotification(
      userId,
      NotificationType.USER_BLOCKED,
      {
        userName: user.name,
        untilDate: businessTime.addDays(
          businessTime.now().date,
          penaltyBlockDuration
        ),
        contactEmail: businessEmail,
        contactPhone: businessPhone,
      }
    );
  }
}
