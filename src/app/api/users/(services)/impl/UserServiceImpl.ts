import { PrismaClient } from "@prisma/client";
import { UserService } from "../UserService";
import { User } from "@prisma/client";
import { UserActions } from "@/enums/UserActions";

export class UserServiceImpl implements UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Omit<User, "id">): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findUniqueByFields(fields: Pick<User, "email">): Promise<User | null> {
    return this.prisma.user.findUnique({ where: fields });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  executeAction(id: number, action: string): Promise<User | null> {
    switch (action) {
      case UserActions.APPROVE_USER:
        return this.approveUser(id);
      case UserActions.REJECT_USER:
        return this.rejectUser(id);
      default:
        throw new Error("Invalid action");
    }
  }

  async approveUser(id: number): Promise<User | null> {
    await this.prisma.user.update({
      where: { id },
      data: { approved: true },
    });
    return this.getUserById(id);
  }

  async rejectUser(id: number): Promise<User | null> {
    await this.prisma.user.update({
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
