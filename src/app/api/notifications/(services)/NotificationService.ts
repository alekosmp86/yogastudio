import { NotificationType } from "app/api/notifications/(enums)/NotificationTypes";
import { NotificationTypePayload } from "app/api/notifications/(models)/NotificationTypePayload";

export interface NotificationService {
  sendNotification<K extends NotificationType>(
    userId: number,
    notificationType: K,
    payload: NotificationTypePayload[K]
  ): Promise<void>;
}
