import { UserPenalty } from "@prisma/client";

export interface UserPenaltyService {
    updateOrInsert(userId: number, attended: boolean): Promise<UserPenalty>;
    findByUserId(userId: number): Promise<UserPenalty | null>;
}