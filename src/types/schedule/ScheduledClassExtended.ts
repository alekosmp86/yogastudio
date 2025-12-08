import { Schedule } from "./Schedule";

export type ScheduledClassExtended = {
    id: number;
    title: string;
    description: string | null;
    instructor: string;
    capacity: number;
    schedule: Schedule[];
}