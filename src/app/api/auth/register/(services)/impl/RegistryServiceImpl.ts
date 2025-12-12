import { Roles } from "@/enums/Roles";
import { RegistryService } from "../RegistryService";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class RegistryServiceImpl implements RegistryService {

  async register(name: string, email: string, phone: string): Promise<User> {
    return await prisma.user.create({
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
