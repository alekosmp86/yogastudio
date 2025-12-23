import { MagicLink } from "@prisma/client";
import { RequestStatus } from "@/enums/RequestStatus";
import crypto from "crypto";
import { MagicLinkService } from "../MagicLinkService";
import { LoggerService } from "app/api/logger/_services/LoggerService";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { UserLinkService } from "app/api/user-link/_services/UserLinkService";
import { MagicLinkResponse } from "@/types/requests/MagicLinkResponse";
import { prisma } from "@/lib/prisma";

export class MagicLinkServiceImpl implements MagicLinkService {
  private readonly logger: LoggerService;

  constructor(private readonly userLinkService: UserLinkService) {
    this.logger = new ConsoleLogger(this.constructor.name);
  }

  async generateMagicLink(email: string): Promise<MagicLinkResponse> {
    this.logger.log("Generating magic link for", email);
    const user = await this.userLinkService.findUserByEmail(email);

    if (!user) {
      // If no user, just inform the frontend
      this.logger.log("User not found");
      return {
        status: RequestStatus.USER_NOT_FOUND,
        magicLink: null,
      };
    }

    if (!user.approved) {
      this.logger.log("User not approved");
      return {
        status: RequestStatus.USER_NOT_APPROVED,
        magicLink: null,
      };
    }

    this.logger.log("User found, generating magic link");
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 min

    this.logger.log("Saving magic link");
    await prisma.magicLink.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      status: RequestStatus.SUCCESS,
      magicLink: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`,
    };
  }

  async findLinkByToken(token: string): Promise<MagicLink | null> {
    return prisma.magicLink.findUnique({ where: { token } });
  }
}
