import { NotificationType } from "@/enums/NotificationTypes";

export interface NotificationService {
    sendNotification<K extends NotificationType, T>(userId: number, notificationType: K, payload: T): Promise<void>;
}