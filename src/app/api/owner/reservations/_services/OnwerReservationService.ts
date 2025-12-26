import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";
import { SessionUser } from "@/types/SessionUser";

export interface OnwerReservationService {
    getReservations(targetDate: string): Promise<ReservationsPerClass[]>;
    updateAttendance(id: number, attended: boolean, user: SessionUser): Promise<void>;
}   