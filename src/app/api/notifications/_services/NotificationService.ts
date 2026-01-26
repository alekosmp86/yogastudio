import { SessionUser } from "@/types/SessionUser";
import { NotificationType } from "../_enums/NotificationTypes";
import { NotificationTypePayload } from "../_models/NotificationTypePayload";
import { ClassInstance } from "@prisma/client";
import { ClassTemplate } from "@prisma/client";

export interface NotificationService {
  sendNotification<K extends NotificationType>(
    userId: number,
    notificationType: K,
    payload: NotificationTypePayload[K]
  ): Promise<void>;

  buildNotificationPayload<K extends NotificationType>(
    notificationType: K,
    user: SessionUser,
    classInstance: ClassInstance & { template: ClassTemplate }
  ): Promise<NotificationTypePayload[K]>;
}
