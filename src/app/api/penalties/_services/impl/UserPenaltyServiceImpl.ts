import { UserPenaltyService } from "../UserPenaltyService";
import { UserPenalty } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { preferenceService } from "app/api";
import dayjs from "dayjs";

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
        attended ? userPenalty.noShowCount -1 : userPenalty.noShowCount + 1
      );
    } else {
      userPenalty = await prisma.userPenalty.create({
        data: {
          userId: userId,
          noShowCount: attended ? 0 : 1
        },
      });
    }

    await this.calculatePenalty(userPenalty);
    return userPenalty;
  }

  async update(
    userId: number,
    noShowCount: number,
  ): Promise<UserPenalty> {
    return await prisma.userPenalty.update({
      where: {
        userId: userId,
      },
      data: {
        noShowCount: noShowCount,
      },
    });
  }

  async calculatePenalty(userPenalty: UserPenalty): Promise<void> {
    const penaltyMaxNoShowCount =
      await preferenceService.getPreferenceValue<number>(
        "penaltyMaxNoShowCount"
      );
    const penaltyBlockDuration =
      await preferenceService.getPreferenceValue<number>(
        "penaltyBlockDuration"
      );

    if (userPenalty.noShowCount >= penaltyMaxNoShowCount) {
      await prisma.userPenalty.update({
        where: {
          userId: userPenalty.userId,
        },
        data: {
          blockedUntil: dayjs().add(penaltyBlockDuration, "days").toDate(),
          lastNoShowAt: dayjs().toDate(),
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
}
