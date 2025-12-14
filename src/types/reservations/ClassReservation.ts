import { GymClassBase } from "../classes/GymClassBase";

export type ClassReservation = {
    id: number;
    class: {
        id: number;
        startTime: string;
        template: GymClassBase;
    };
}