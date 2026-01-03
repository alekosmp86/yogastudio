export type NextClass = {
    id: number;
    template: {
        title: string;
        description: string;
        instructor: string;
    };
    reservations: {
        id: number;
        cancelled: boolean;
    }[];
    startTime: string;
    date: string;
}