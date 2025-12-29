import { UserPenaltyService } from "../UserPenaltyService";
import { UserPenalty } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { preferenceService } from "app/api";
import { DateUtils } from "@/lib/utils/date";

export class UserPenaltyServiceImpl implements UserPenaltyService {
  async findByUserId(userId: number): Promise<UserPenalty | null> {
    return await prisma.userPenalty.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async updateOrInsert(
    userId: number,
    attended: boolean
  ): Promise<UserPenalty> {
    let userPenalty = await this.findByUserId(userId);
    if (userPenalty) {
      userPenalty = await this.update(
        userId,
        attended ? Math.max(userPenalty.noShowCount - 1, 0) : userPenalty.noShowCount + 1,
        attended ? null : DateUtils.startOfDay(new Date())
      );
    } else {
      userPenalty = await prisma.userPenalty.create({
        data: {
          userId: userId,
          noShowCount: attended ? 0 : 1,
          lastNoShowAt: attended ? null : DateUtils.startOfDay(new Date()),
        },
      });
    }

    await this.calculatePenalty(userPenalty);
    return userPenalty;
  }

  async update(userId: number, noShowCount: number, lastNoShowAt: Date | null): Promise<UserPenalty> {
    return await prisma.userPenalty.update({
      where: {
        userId: userId,
      },
      data: {
        noShowCount: noShowCount,
        lastNoShowAt: lastNoShowAt,
      },
    });
  }

  async calculatePenalty(userPenalty: UserPenalty): Promise<void> {
    const penaltyMaxNoShowCount =
      await preferenceService.getNumberPreferenceValue(
        "penaltyMaxNoShowCount"
      );
    const penaltyBlockDuration =
      await preferenceService.getNumberPreferenceValue(
        "penaltyBlockDuration"
      );

    if (userPenalty.noShowCount >= penaltyMaxNoShowCount) {
      await prisma.userPenalty.update({
        where: {
          userId: userPenalty.userId,
        },
        data: {
          blockedUntil: DateUtils.addDays(new Date(), penaltyBlockDuration),
          lastNoShowAt: DateUtils.startOfDay(new Date()),
        },
      });
    } else {
      await prisma.userPenalty.update({
        where: {
          userId: userPenalty.userId,
        },
        data: {
          blockedUntil: null,
        },
      });
    }
  }

  async unblockUser(userId: number): Promise<void> {
    await prisma.userPenalty.update({
      where: {
        userId: userId,
      },
      data: {
        blockedUntil: null,
        noShowCount: 0,
        lastNoShowAt: null,
      },
    });
  }
}
