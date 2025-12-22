import { SessionUser } from "@/types/SessionUser";

export interface ProfileService {
    updateProfile(userId: number, data: Pick<SessionUser, "name" | "phone">): Promise<void>;
}