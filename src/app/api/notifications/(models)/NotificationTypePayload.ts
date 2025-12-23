import { NotificationType } from "app/api/notifications/(enums)/NotificationTypes";

export type NotificationTypePayload = {
  [NotificationType.ADDED_TO_WAITING_LIST]: {
    userName: string;
    classTitle: string;
    classDate: string;
    classTime: string;
    instructorName: string;
  };
  // future notifications go here
};
