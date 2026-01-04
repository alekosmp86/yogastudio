import { prisma } from "@/lib/prisma";
import { ProfileService } from "../ProfileService";
import { SessionUser } from "@/types/SessionUser";
import { preferenceService } from "app/api";
import { BusinessTime } from "@/lib/utils/date";
import { ProfileData } from "@/types/profile/ProfileData";

export class ProfileServiceImpl implements ProfileService {
  async updateProfile(
    userId: number,
    data: Pick<SessionUser, "name" | "email" | "phone">
  ): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  async getProfile(userId: number): Promise<ProfileData | null> {
    const timezone = await preferenceService.getStringPreferenceValue(
      "timezone"
    );
    const businessTime = new BusinessTime(timezone);
    const today = businessTime.now();
    const nextHour = businessTime.addHours(1);

    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,

        // Penalty info
        UserPenalty: {
          select: {
            noShowCount: true,
          },
        },

        // Reservation counts
        _count: {
          select: {
            reservations: true, // total reservations
          },
        },

        // Cancelled reservations count
        reservations: {
          select: {
            cancelled: true,
            class: {
              select: {
                date: true,
                startTime: true,
              },
            },
          },
        },
      },
    });

    if (!userData) return null;

    const totalReservations = userData._count.reservations;
    const cancelledReservations = userData.reservations.filter(
      (r) => r.cancelled
    ).length;
    const futureReservations = userData.reservations.filter(
      (r) => r.class.date >= today.date && r.class.startTime >= nextHour
    ).length;
    const penaltyCount = userData.UserPenalty?.noShowCount ?? 0;

    const result = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone ?? "",
      createdAt: businessTime.fromDate(userData.createdAt).date,

      reservations: {
        total: totalReservations,
        cancelled: cancelledReservations,
        upcoming: futureReservations,
      },

      penalties: {
        count: penaltyCount
      },
    };

    return result;
  }
}
