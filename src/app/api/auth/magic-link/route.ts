import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { magicLinkService, mailService } from "..";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: RequestStatus.EMAIL_REQUIRED },
      { status: 400 }
    );
  }

  try {
    const magicLink: string = await magicLinkService.generateMagicLink(email);
    const emailBody = `
        <p>Hello,</p>
        <p>Click <a href="${magicLink}">here</a> to access your account:</p>
        <p>This link expires in 15 minutes.</p>
      `;
    await mailService.sendMail(email, "Your login link", emailBody);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: RequestStatus.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: RequestStatus.SUCCESS });
}
