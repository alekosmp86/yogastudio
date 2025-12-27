import { UserPenalty } from "@prisma/client";

export interface UserPenaltyService {
    updateOrInsert(userId: number, attended: boolean): Promise<UserPenalty>;
    findByUserId(userId: number): Promise<UserPenalty | null>;
    calculatePenalty(userPenalty: UserPenalty): Promise<void>;
    unblockUser(userId: number): Promise<void>;
}