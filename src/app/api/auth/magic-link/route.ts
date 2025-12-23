import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { magicLinkService } from "..";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { mailService } from "app/api";
import { MagicLinkResponse } from "@/types/requests/MagicLinkResponse";

const logger = new ConsoleLogger("MagicLinkRoute");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  logger.log("Email:", email);

  if (!email) {
    logger.log("Email is required");
    return NextResponse.json(
      { message: RequestStatus.EMAIL_REQUIRED },
      { status: 400 }
    );
  }

  try {
    logger.log("Generating magic link...");
    const magicLinkResponse: MagicLinkResponse = await magicLinkService.generateMagicLink(email);

    switch (magicLinkResponse.status) {
      case RequestStatus.USER_NOT_FOUND:
        logger.log("User not found");
        return NextResponse.json(
          { message: RequestStatus.USER_NOT_FOUND },
          { status: 404 }
        );
      case RequestStatus.USER_NOT_APPROVED:
        logger.log("User not approved");
        return NextResponse.json(
          { message: RequestStatus.USER_NOT_APPROVED },
          { status: 401 }
        );
      case RequestStatus.SUCCESS:
        logger.log("Magic link generated");
        const emailBody = `
            <p>Hello,</p>
            <p>Click <a href="${magicLinkResponse.magicLink}">${magicLinkResponse.magicLink}</a> to access your account:</p>
            <p>This link expires in 15 minutes.</p>
          `;
        logger.log("Sending email...");
        await mailService.sendMail(email, "Your login link", emailBody);
        logger.log("Email sent");
        return NextResponse.json({ message: RequestStatus.EMAIL_SENT });
    }
  } catch (error) {
    logger.error("Error sending email:", error);
    return NextResponse.json(
      { message: RequestStatus.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}
