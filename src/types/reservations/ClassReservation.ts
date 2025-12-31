import { GymClassBase } from "../classes/GymClassBase";

export type ClassReservation = {
    id: number;
    class: {
        id: number;
        date: string;
        startTime: string;
        template: GymClassBase;
    };
}