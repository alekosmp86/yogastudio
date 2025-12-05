import { UserMapper } from "../UserMapper";
import { User } from "@/types/User";
import { User as PrismaUser } from "@prisma/client";
import { Roles } from "@/enums/Roles";

export class UserMapperImpl implements UserMapper {
    toUser(user: PrismaUser): User {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as Roles,
            phone: user.phone,
            approved: user.approved,
            emailVerified: user.emailVerified
        };
    }
}