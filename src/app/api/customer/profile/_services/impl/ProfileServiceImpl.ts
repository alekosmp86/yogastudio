import { prisma } from "@/lib/prisma";
import { ProfileService } from "../ProfileService";
import { SessionUser } from "@/types/SessionUser";

export class ProfileServiceImpl implements ProfileService {
  async updateProfile(
    userId: number,
    data: Pick<SessionUser, "name" | "phone">
  ): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }
}
