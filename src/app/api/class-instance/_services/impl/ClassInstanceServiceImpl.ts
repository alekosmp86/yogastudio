import { ClassInstanceService } from "../ClassInstanceService";
import { ClassInstance } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  ClassInstanceRelations,
  ClassInstanceWithRelations,
} from "../../_types/ClassInstanceRelations";
import { preferenceService } from "app/api";
import { BusinessTime } from "@/lib/utils/date";
import { NextClass } from "@/types/classes/NextClass";

export class ClassInstanceServiceImpl implements ClassInstanceService {
  async findFirstByFields(
    fields: Pick<ClassInstance, "templateId" | "startTime" | "date">
  ): Promise<ClassInstance | null> {
    return await prisma.classInstance.findFirst({
      where: fields,
    });
  }

  async findUniqueByIdIncludingData(
    id: number,
    dataToInclude: ClassInstanceRelations
  ): Promise<ClassInstanceWithRelations<ClassInstanceRelations> | null> {
    return await prisma.classInstance.findUnique({
      where: { id },
      include: {
        template: dataToInclude.template ?? false,
        reservations: dataToInclude.reservations ?? false,
        waitingList: dataToInclude.waitingList ?? false,
      },
    });
  }

  async create(data: {
    templateId: number;
    startTime: string;
    date: string;
  }): Promise<ClassInstance> {
    return await prisma.classInstance.create({
      data: {
        templateId: data.templateId,
        startTime: data.startTime,
        date: data.date,
      },
    });
  }

  async getNextClass(): Promise<NextClass | null> {
    const timezone = await preferenceService.getStringPreferenceValue(
      "timezone"
    );
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
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      select: {
        id: true,
        template: {
          select: {
            id: true,
            title: true,
            description: true,
            instructor: true
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
}
