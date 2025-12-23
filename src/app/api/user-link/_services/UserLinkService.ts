import { User } from "@prisma/client";

export interface UserLinkService {
    findUserByEmail(email: string): Promise<User | null>;
}