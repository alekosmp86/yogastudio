type Activity = {
    id: number,
    title: string,
    instructor: string,
    description: string,
    capacity: number,
}

export interface DailyClass {
    id: number,
    date: string,
    startTime: string,
    activity: Activity,
    reserved: number,
    available: boolean,
}