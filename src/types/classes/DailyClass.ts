export interface DailyClass {
    id: number,
    date: string,
    startTime: string,
    title: string,
    instructor: string,
    description: string,
    capacity: number,
    reserved: number,
    available: boolean,
}