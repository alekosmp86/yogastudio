import { ClassInstanceService } from "../ClassInstanceService";
import { ClassInstance } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  ClassInstanceRelations,
  ClassInstanceWithRelations,
} from "../../_types/ClassInstanceRelations";

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
}
