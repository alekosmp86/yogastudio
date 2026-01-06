import { DailyClass } from "@/types/classes/DailyClass";

export function fetchClassesByMembershipPostHook(payload: DailyClass[]) {
    console.log('fetchClassesByMembershipPostHook', payload);
    return payload;
}