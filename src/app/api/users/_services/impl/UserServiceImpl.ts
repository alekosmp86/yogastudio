import { UserService } from "../UserService";
import { User } from "@prisma/client";
import { UserActions } from "@/enums/UserActions";
import { prisma } from "@/lib/prisma";

export class UserServiceImpl implements UserService {
  async create(data: Omit<User, "id">): Promise<User> {
    return prisma.user.create({ data });
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findUniqueByFields(fields: Pick<User, "email">): Promise<User | null> {
    return prisma.user.findUnique({ where: fields });
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({
      where: {
        role: Roles.USER,
      },
    });
  }

  executeAction(id: number, action: string): Promise<User | null> {
    switch (action) {
      case UserActions.APPROVE_USER:
        return this.approveUser(id);
      case UserActions.BLOCK_USER:
        return this.rejectUser(id);
      default:
        throw new Error("Invalid action");
    }
  }

  private async approveUser(id: number): Promise<User | null> {
    await prisma.user.update({
      where: { id },
      data: { approved: true },
    });
    return this.getUserById(id);
  }

  private async rejectUser(id: number): Promise<User | null> {
    await prisma.user.update({
      where: { id },
      data: { approved: false },
    });
    return this.getUserById(id);
  }

  validateRequiredFields<T extends Record<string, never>>(data: T): void {
    const requiredFields = ["email", "role"] as const;

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }
}
