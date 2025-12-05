import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { magicLinkService } from "..";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { mailService } from "app/api";

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
    const magicLink: string = await magicLinkService.generateMagicLink(email);
    logger.log("Magic link generated");
    const emailBody = `
        <p>Hello,</p>
        <p>Click <a href="${magicLink}">${magicLink}</a> to access your account:</p>
        <p>This link expires in 15 minutes.</p>
      `;
    logger.log("Sending email...");
    await mailService.sendMail(email, "Your login link", emailBody);
    logger.log("Email sent");
  } catch (error) {
    logger.error("Error sending email:", error);
    return NextResponse.json(
      { message: RequestStatus.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: RequestStatus.EMAIL_SENT });
}
