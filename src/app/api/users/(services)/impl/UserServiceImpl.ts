import { PrismaClient } from "@prisma/client";
import { UserService } from "../UserService";
import { User } from "@prisma/client";

export class UserServiceImpl implements UserService {
    constructor(private readonly prisma: PrismaClient) {}

    async getUserById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findUniqueByFields(fields: Pick<User, "email">): Promise<User | null> {
        return this.prisma.user.findUnique({ where: fields });
    }
}