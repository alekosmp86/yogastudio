import { UserService } from "../UserService";
import { User } from "@prisma/client";
import { UserActions } from "@/enums/UserActions";
import { prisma } from "@/lib/prisma";
import { Roles } from "@/enums/Roles";
import { UserDetail } from "@/types/users/UserDetail";

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

  async executeAction<T>(id: number, action: string): Promise<T | null> {
    switch (action) {
      case UserActions.APPROVE_USER:
        return this.approveUser(id) as T;
      case UserActions.BLOCK_USER:
        return this.rejectUser(id) as T;
      case UserActions.VIEW_USER_DETAILS:
        return this.getUserDetails(id) as T;
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

  private async getUserDetails(id: number): Promise<UserDetail | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        approved: true,
        createdAt: true,

        UserPenalty: {
          select: {
            noShowCount: true,
            blockedUntil: true,
            lastNoShowAt: true,
          },
        },

        reservations: {
          where: {
            cancelled: true,
          },
          select: {
            id: true,
            class: {
              select: {
                date: true,
                startTime: true,
                template: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    const result: UserDetail = {
      basicInfo: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      activityStats: {
        penalties: user.UserPenalty?.noShowCount ?? 0,
        cancelations: user.reservations.length,
      },
      cancelledClasses: user.reservations.map((r) => ({
        title: r.class.template.title,
        date: r.class.date,
        startTime: r.class.startTime,
      })),
    };
    return result;
  }
}
