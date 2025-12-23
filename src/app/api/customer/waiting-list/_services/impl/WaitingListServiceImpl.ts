import { WaitingListService } from "../WaitingListService";
import { prisma } from "@/lib/prisma";

export class WaitingListServiceImpl implements WaitingListService {
  async addToWaitingList(userId: number, classId: number): Promise<void> {
    await prisma.waitingList.create({
      data: {
        userId,
        classId,
      },
    });
  }
}