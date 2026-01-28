import { prisma } from "@/lib/prisma";
import { BusinessTime } from "@/lib/utils/date";
import { NextClass } from "@/types/classes/NextClass";
import { SessionUser } from "@/types/SessionUser";
import { UserMembership } from "@prisma/client";
import { PreferenceServiceImpl } from "app/api/owner/preferences/_services/impl/PreferenceServiceImpl";

type UserMembershipTemplates = {
  templates: {
    id: number;
    templateId: number;
    userMembershipId: number;
  }[];
} & UserMembership;

export const afterNextClassFetchedHook = async (payload: {
  user: SessionUser;
  nextClass: NextClass | null;
}) => {
  if (!payload.nextClass) {
    return payload;
  }

  const userMembershipActivities = await prisma.userMembership.findFirst({
    where: {
      userId: payload.user.id,
    },
    include: {
      templates: true,
    },
  });

  if (
    !userMembershipActivities ||
    userMembershipActivities.templates.length === 0
  ) {
    return { ...payload, nextClass: null };
  }

  const allowedTemplate = userMembershipActivities?.templates.find(
    (template) => template.id === payload.nextClass?.template.id,
  );

  if (!allowedTemplate) {
    // find the next class that is allowed by membership plan
    const nextAllowedClass = await getNextAllowedClass(
      userMembershipActivities,
    );

    if (!nextAllowedClass) {
      return { ...payload, nextClass: null };
    }
    return { ...payload, nextClass: nextAllowedClass };
  }

  return { ...payload };
};

async function getNextAllowedClass(
  userMembershipActivities: UserMembershipTemplates,
): Promise<NextClass | null> {
  const preferenceService = new PreferenceServiceImpl();

  const timezone = await preferenceService.getStringPreferenceValue("timezone");
  const businessTime = new BusinessTime(timezone);
  const today = businessTime.now().date;
  const nextHour = businessTime.addHours(1);

  const nextClass = await prisma.classInstance.findFirst({
    where: {
      OR: [
        // Future dates → any time is valid
        {
          date: {
            gt: today,
          },
        },

        // Today → only future times
        {
          date: today,
          startTime: {
            gte: nextHour,
          },
        },
      ],
      template: {
        id: {
          in: userMembershipActivities?.templates.map(
            (template) => template.templateId,
          ),
        },
      },
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    select: {
      id: true,
      template: {
        select: {
          id: true,
          title: true,
          description: true,
          instructor: true,
        },
      },
      reservations: {
        select: {
          id: true,
          cancelled: true,
        },
      },
      startTime: true,
      date: true,
    },
  });

  if (!nextClass) return null;

  return {
    id: nextClass.id,
    template: {
      id: nextClass.template.id,
      title: nextClass.template.title,
      description: nextClass.template.description ?? "",
      instructor: nextClass.template.instructor,
    },
    reservations: nextClass.reservations,
    startTime: nextClass.startTime,
    date: nextClass.date,
  };
}
