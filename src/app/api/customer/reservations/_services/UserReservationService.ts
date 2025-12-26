import { ClassReservation } from "@/types/reservations/ClassReservation";
import { SessionUser } from "@/types/SessionUser";

export interface UserReservationService {
    createReservation(classId: number, user: SessionUser): Promise<string>;
    getReservations(userId: number, date: string, time: string): Promise<ClassReservation[]>;
    cancelReservation(reservationId: number, user: SessionUser): Promise<void>;
    cancelReservationFromClass(classId: number, user: SessionUser): Promise<void>;
    rescheduleReservation(reservationId: number, user: SessionUser): Promise<void>;
}