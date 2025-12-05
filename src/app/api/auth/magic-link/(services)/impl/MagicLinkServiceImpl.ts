import { MagicLink, PrismaClient } from "@prisma/client";
import { RequestStatus } from "@/enums/RequestStatus";
import crypto from "crypto";
import { MagicLinkService } from "../MagicLinkService";
import { LoggerService } from "app/api/logger/LoggerService";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { UserLinkService } from "app/api/user-link/(services)/UserLinkService";

export class MagicLinkServiceImpl implements MagicLinkService {
  private readonly logger: LoggerService;

  constructor(private readonly prisma: PrismaClient, private readonly userLinkService: UserLinkService) {
    this.logger = new ConsoleLogger(this.constructor.name);
  }

  async generateMagicLink(email: string): Promise<string> {
    this.logger.log("Generating magic link for", email);
    const user = await this.userLinkService.findUserByEmail(email);

    if (!user) {
      // If no user, just inform the frontend
      this.logger.log("User not found");
      return RequestStatus.USER_NOT_FOUND;
    }

    if (!user.approved) {
      this.logger.log("User not approved");
      return RequestStatus.USER_NOT_APPROVED;
    }

    this.logger.log("User found, generating magic link");
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 min

    this.logger.log("Saving magic link");
    await this.prisma.magicLink.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    return `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;
  }

  async findLinkByToken(token: string): Promise<MagicLink | null> {
    return this.prisma.magicLink.findUnique({ where: { token } });
  }
}
