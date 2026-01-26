import { UserPenaltyService } from "../UserPenaltyService";
import { UserPenalty } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { BusinessTime } from "@/lib/utils/date";

export class UserPenaltyServiceImpl implements UserPenaltyService {
  private logger = new ConsoleLogger(this.constructor.name);

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
    const timezonePreference = await prisma.appPreferences.findUnique({
      where: { name: "timezone" },
    });
    const timezone = timezonePreference?.value || "UTC";
    const businessTime = new BusinessTime(timezone);

    let userPenalty = await this.findByUserId(userId);
    if (userPenalty) {
      userPenalty = await this.update(
        userId,
        attended
          ? Math.max(userPenalty.noShowCount - 1, 0)
          : userPenalty.noShowCount + 1,
        attended ? null : businessTime.now().date
      );
    } else {
      userPenalty = await prisma.userPenalty.create({
        data: {
          userId: userId,
          noShowCount: attended ? 0 : 1,
          lastNoShowAt: attended ? null : businessTime.now().date,
        },
      });
    }

    return await this.calculatePenalty(userPenalty);
  }

  async update(
    userId: number,
    noShowCount: number,
    lastNoShowAt: string | null
  ): Promise<UserPenalty> {
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

  async calculatePenalty(userPenalty: UserPenalty): Promise<UserPenalty> {
    const user = await prisma.user.findUnique({
      where: {
        id: userPenalty.userId,
      },
    });
    if (!user) {
      this.logger.error(`User ${userPenalty.userId} not found`);
      throw new Error(`User ${userPenalty.userId} not found`);
    }

    const maxPenaltiesCountPref = await prisma.appPreferences.findUnique({
      where: { name: "maxPenaltiesCount" },
    });
    const penaltyBlockDurationPref = await prisma.appPreferences.findUnique({
      where: { name: "penaltyBlockDuration" },
    });
    
    const maxPenaltiesCount = Number(maxPenaltiesCountPref?.value || 0);
    const penaltyBlockDuration = Number(penaltyBlockDurationPref?.value || 0);

    if (userPenalty.noShowCount >= maxPenaltiesCount) {
      return await this.blockUser(userPenalty, penaltyBlockDuration);
    } else {
      return await prisma.userPenalty.update({
        where: {
          userId: userPenalty.userId,
        },
        data: {
          blockedUntil: null,
        },
      });
    }
  }

  private async blockUser(userPenalty: UserPenalty, penaltyBlockDuration: number) {
    const timezonePref = await prisma.appPreferences.findUnique({
      where: { name: "timezone" },
    });
    const timezone = timezonePref?.value || "UTC";
    const businessTime = new BusinessTime(timezone);
    
    return await prisma.userPenalty.update({
      where: {
        userId: userPenalty.userId,
      },
      data: {
        blockedUntil: businessTime.addDays(
          businessTime.now().date,
          penaltyBlockDuration
        ),
        lastNoShowAt: businessTime.now().date,
      },
    });
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

  async addPenalty(userId: number): Promise<UserPenalty> {
    return await this.updateOrInsert(userId, false);
  }

  async getPenaltyCount(userId: number): Promise<number> {
    const userPenalty = await this.findByUserId(userId);
    return userPenalty?.noShowCount ?? 0;
  }
}
