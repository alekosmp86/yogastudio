import { NotificationType } from "../_enums/NotificationTypes";

export type NotificationTypePayload = {
  [NotificationType.ADDED_TO_WAITING_LIST]: {
    userName: string;
    classTitle: string;
    classDate: string;
    classTime: string;
    instructorName: string;
  };
  [NotificationType.CLASS_BOOKED]: {
    userName: string;
    classTitle: string;
    classDate: string;
    classTime: string;
    instructorName: string;
    cancelBookingUrl: string;
  };
  [NotificationType.CLASS_CANCELATION]: {
    userName: string;
    classTitle: string;
    classDate: string;
    classTime: string;
    instructorName: string;
    contactEmail: string;
    contactPhone: string;
  };
};
