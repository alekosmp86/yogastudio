import { ClassReservation } from "@/types/reservations/ClassReservation";

export interface ReservationService {
    createReservation(classId: number, userId: number): Promise<string>;
    getReservations(userId: number, date: string): Promise<ClassReservation[]>;
    cancelReservation(reservationId: number): Promise<void>;
}
    