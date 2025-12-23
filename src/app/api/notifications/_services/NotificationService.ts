import { NotificationType } from "../_enums/NotificationTypes";
import { NotificationTypePayload } from "../_models/NotificationTypePayload";

export interface NotificationService {
  sendNotification<K extends NotificationType>(
    userId: number,
    notificationType: K,
    payload: NotificationTypePayload[K]
  ): Promise<void>;
}
