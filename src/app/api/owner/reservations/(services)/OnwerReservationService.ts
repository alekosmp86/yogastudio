import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";

export interface OnwerReservationService {
    getReservations(targetDate: string): Promise<ReservationsPerClass[]>;
}