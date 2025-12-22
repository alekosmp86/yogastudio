import { NotificationType } from "@/enums/NotificationTypes";

type AddedToWaitingListPayload = {
    classTitle: string;
    classDate: string;
    classTime: string;
    instructorName: string;
}

export type NotificationTypePayload = {
    [NotificationType.ADDED_TO_WAITING_LIST]: AddedToWaitingListPayload;
}