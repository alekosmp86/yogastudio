export interface ReservationService {
    createReservation(classId: number, userId: number): Promise<string>;
}
    