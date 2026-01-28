import { BusinessTime } from "@/lib/utils/date";
import {
  ClassInstance,
  ClassTemplate,
  Reservation,
} from "@prisma/client";
import { userPenaltyService } from "../api";
import { prisma } from "@/lib/prisma";
import { PenaltyHooksUtils } from "./PenaltyHooksUtils";

export const afterReservationCancelledHook = async (
  reservation: Reservation & {
    class: ClassInstance & { template: ClassTemplate };
  }
) => {
  const isLateCancelation = await checkForLateCancelation(reservation.class);
  if (isLateCancelation) {
    const userPenalty = await userPenaltyService.addPenalty(reservation.userId);

    const timezonePref = await prisma.appPreferences.findUnique({
      where: { name: "timezone" },
    });
    const timezone = timezonePref?.value || "UTC";
    const businessTime = new BusinessTime(timezone);

    if (
      userPenalty.blockedUntil &&
      userPenalty.blockedUntil > businessTime.now().date
    ) {
      await PenaltyHooksUtils.notifyUserBlocked(reservation.userId, businessTime);
    }
  }
  return reservation;
};

const checkForLateCancelation = async (
  classInstance: ClassInstance & { template: ClassTemplate }
) => {
  const lateCancelHoursPreference = await prisma.appPreferences.findUnique({
    where: { name: "lateCancelHours" },
  });
  const timezonePreference = await prisma.appPreferences.findUnique({
    where: { name: "timezone" },
  });

  const lateCancelHours = Number(lateCancelHoursPreference?.value || 0);
  const timezone = timezonePreference?.value || "UTC";
  const businessTime = new BusinessTime(timezone);
  if (businessTime.now().date !== classInstance.date) return false;
  return businessTime.addHours(lateCancelHours) >= classInstance.startTime;
};
