import { UserLinkService } from "../UserLinkService";
import { PrismaClient, User } from "@prisma/client";

export class UserLinkServiceImpl implements UserLinkService {
    constructor(private readonly prisma: PrismaClient) {}
    
    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }
}