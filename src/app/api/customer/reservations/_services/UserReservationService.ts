import { ClassReservation } from "@/types/reservations/ClassReservation";
import { SessionUser } from "@/types/SessionUser";
import { ClassInstance } from "@prisma/client";
import { NotificationType } from "app/api/notifications/_enums/NotificationTypes";
import { NotificationTypePayload } from "app/api/notifications/_models/NotificationTypePayload";
import { ClassTemplate } from "@prisma/client";

export interface UserReservationService {
    createReservation(classId: number, user: SessionUser): Promise<string>;
    getReservations(userId: number, date: string, time: string): Promise<ClassReservation[]>;
    cancelReservation(reservationId: number): Promise<void>;
    cancelReservationFromClass(classId: number): Promise<void>;
}