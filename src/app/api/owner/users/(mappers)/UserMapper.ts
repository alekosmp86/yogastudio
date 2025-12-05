import { User } from "@/types/User";
import { User as PrismaUser } from "@prisma/client";

export interface UserMapper {
    toUser(user: PrismaUser): User;
}