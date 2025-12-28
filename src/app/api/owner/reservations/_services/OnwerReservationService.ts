import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";

export interface OnwerReservationService {
    getReservations(): Promise<ReservationsPerClass[]>;
    updateAttendance(id: number, attended: boolean, userId: number): Promise<void>;
}   