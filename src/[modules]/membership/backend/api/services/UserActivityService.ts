import { UserActivity } from "../models/UserActivity";

export interface UserActivityService {
    getAllUserActivities(userId: number): Promise<UserActivity | null>;
    saveUserActivities(userId: number, activitiesIds: number[]): Promise<void>;
}