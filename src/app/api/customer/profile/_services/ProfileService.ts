import { SessionUser } from "@/types/SessionUser";
import { ProfileData } from "@/types/profile/ProfileData";

export interface ProfileService {
    updateProfile(userId: number, data: Pick<SessionUser, "name" | "phone">): Promise<void>;
    getProfile(userId: number): Promise<ProfileData | null>;
}