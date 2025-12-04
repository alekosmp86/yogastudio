import { User } from "@prisma/client";

export class UserDto {
    constructor(
        public id: number,
        public email: string,
        public role: string,
        public name: string,
    ) {}

    static fromUser(user: User): UserDto {
        return new UserDto(
            user.id,
            user.email,
            user.role,
            user.name,
        );
    }
}