import { Roles } from "@/enums/Roles";
import { RegistryService } from "../RegistryService";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export class RegistryServiceImpl implements RegistryService {
  constructor(private readonly prisma: PrismaClient) {}

  async register(name: string, email: string, phone: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        phone,
        approved: false,
        role: Roles.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: false,
      },
    });
  }
}
