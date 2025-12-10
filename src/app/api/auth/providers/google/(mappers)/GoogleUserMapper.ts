import { User } from "@prisma/client";

export interface GoogleUserMapper {
    toUser(data: unknown): Omit<User, "id">;
}