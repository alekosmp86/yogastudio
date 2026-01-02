import { User } from "@/types/users/User";
import { User as PrismaUser } from "@prisma/client";

export interface UserMapper {
  toUser(user: PrismaUser): User;
}
