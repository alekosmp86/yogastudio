import { User } from "@prisma/client";
import { Roles } from "@/enums/Roles";

export class UserDto {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public role: Roles,
        public approved: boolean,
        public emailVerified: boolean,
        public phone?: string | null
    ) {}

    static fromUser(user: User): UserDto {
        return new UserDto(
            user.id,
            user.name,
            user.email,
            user.role as Roles,
            user.approved,
            user.emailVerified,
            user.phone
        );
    }
}