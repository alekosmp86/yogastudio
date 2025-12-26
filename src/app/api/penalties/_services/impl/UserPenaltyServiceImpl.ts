import { UserPenaltyService } from "../UserPenaltyService";
import { UserPenalty } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class UserPenaltyServiceImpl implements UserPenaltyService {
  async findByUserId(userId: number): Promise<UserPenalty | null> {
    return await prisma.userPenalty.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async updateOrInsert(userId: number, attended: boolean): Promise<UserPenalty> {
    const userPenalty = await this.findByUserId(userId);
    if (userPenalty) {
      return await this.update(userId, attended ? userPenalty.noShowCount : userPenalty.noShowCount + 1);
    }
    return await prisma.userPenalty.create({
      data: {
        userId: userId,
        noShowCount: attended ? 0 : 1,
      },
    });
  }

  async update(userId: number, noShowCount: number): Promise<UserPenalty> {
    return await prisma.userPenalty.update({
      where: {
        userId: userId,
      },
      data: {
        noShowCount: noShowCount,
      },
    });
  }
}
