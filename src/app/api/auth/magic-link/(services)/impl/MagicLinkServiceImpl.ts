import { PrismaClient } from "@prisma/client";
import { RequestStatus } from "@/enums/RequestStatus";
import crypto from "crypto";
import { MagicLinkService } from "../MagicLinkService";

export class MagicLinkServiceImpl implements MagicLinkService {
  constructor(private readonly prisma: PrismaClient) {}

  async generateMagicLink(email: string): Promise<string> {
    console.log("Generating magic link for", email);
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      // If no user, just inform the frontend
      console.log("User not found");
      return RequestStatus.USER_NOT_FOUND;
    }

    if (!user.approved) {
      console.log("User not approved");
      return RequestStatus.USER_NOT_APPROVED;
    }

    console.log("User found, generating magic link");
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 min

    console.log("Saving magic link");
    await this.prisma.magicLink.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    return `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;
  }
}
