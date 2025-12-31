import { UserPenaltyService } from "../UserPenaltyService";
import { UserPenalty } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { notificationService, preferenceService } from "app/api";
import { NotificationType } from "app/api/notifications/_enums/NotificationTypes";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import DayjsUtils from "@/lib/utils/dayjs";
import dayjs from "dayjs";

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
    const timezone = await preferenceService.getStringPreferenceValue("timezone");
    let userPenalty = await this.findByUserId(userId);
    if (userPenalty) {
      userPenalty = await this.update(
        userId,
        attended ? Math.max(userPenalty.noShowCount - 1, 0) : userPenalty.noShowCount + 1,
        attended ? null : DayjsUtils.startOfDay(timezone).format("YYYY-MM-DD")
      );
    } else {
      userPenalty = await prisma.userPenalty.create({
        data: {
          userId: userId,
          noShowCount: attended ? 0 : 1,
          lastNoShowAt: attended ? null : DayjsUtils.startOfDay(timezone).format("YYYY-MM-DD"),
        },
      });
    }

    await this.calculatePenalty(userPenalty);
    return userPenalty;
  }

  async update(userId: number, noShowCount: number, lastNoShowAt: string | null): Promise<UserPenalty> {
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
    const user = await prisma.user.findUnique({
      where: {
        id: userPenalty.userId,
      },
    });
    if (!user) {
      this.logger.error(`User ${userPenalty.userId} not found`);
      return;
    }

    const penaltyMaxNoShowCount =
      await preferenceService.getNumberPreferenceValue(
        "penaltyMaxNoShowCount"
      );
    const penaltyBlockDuration =
      await preferenceService.getNumberPreferenceValue(
        "penaltyBlockDuration"
      );
    const timezone = await preferenceService.getStringPreferenceValue("timezone");

    if (userPenalty.noShowCount >= penaltyMaxNoShowCount) {
      await prisma.userPenalty.update({
        where: {
          userId: userPenalty.userId,
        },
        data: {
          blockedUntil: DayjsUtils.addDays(dayjs(), penaltyBlockDuration, timezone).format("YYYY-MM-DD"),
          lastNoShowAt: DayjsUtils.startOfDay(timezone).format("YYYY-MM-DD"),
        },
      });
      
      // notify user about being blocked
      const businessEmail = await preferenceService.getStringPreferenceValue("businessEmail");
      const businessPhone = await preferenceService.getStringPreferenceValue("businessWhatsappNumber");
      await notificationService.sendNotification(userPenalty.userId, NotificationType.USER_BLOCKED, {
        userName: user.name,
        untilDate: DayjsUtils.addDays(dayjs(), penaltyBlockDuration, timezone).toDate(),
        contactEmail: businessEmail,
        contactPhone: businessPhone,
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

  async addPenalty(userId: number): Promise<void> {
    this.updateOrInsert(userId, false);
  }

  async getPenaltyCount(userId: number): Promise<number> {
    const userPenalty = await this.findByUserId(userId);
    return userPenalty?.noShowCount ?? 0;
  }
}
