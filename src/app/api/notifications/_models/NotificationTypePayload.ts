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
  [NotificationType.CLASS_CANCELLED]: {
    userName: string;
    classTitle: string;
    classDate: string;
    classTime: string;
    instructorName: string;
    rescheduleBookingUrl: string;
    contactEmail: string;
    contactPhone: string;
  };
  [NotificationType.CLASS_SPOT_OPENED]: {
    userName: string;
    classTitle: string;
    classDate: string;
    classTime: string;
    instructorName: string;
    bookClassUrl: string;
  };
  [NotificationType.USER_BLOCKED]: {
    userName: string;
    contactEmail: string;
    contactPhone: string;
  };
};
