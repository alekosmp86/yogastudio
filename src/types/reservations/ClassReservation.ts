import { GymClassBase } from "../classes/GymClassBase";

export type ClassReservation = {
    id: number;
    class: {
        id: number;
        date: Date;
        startTime: string;
        template: GymClassBase;
    };
}