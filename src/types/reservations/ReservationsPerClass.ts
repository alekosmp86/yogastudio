import { GymClassBase } from "../classes/GymClassBase";
import { User } from "../User";

export type ReservationsPerClass = {
    id: number;
    date: Date;
    startTime: string;
    template: GymClassBase;
    reservations: {
        id: number;
        user: Pick<User, 'name' | 'email'>;
    }[];
}