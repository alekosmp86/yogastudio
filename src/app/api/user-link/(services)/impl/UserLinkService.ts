import { UserLinkService } from "../UserLinkService";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class UserLinkServiceImpl implements UserLinkService {
    
    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }
}