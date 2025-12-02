import { MailService } from "../MailService";
import { Resend } from "resend";

export class ResendMailServiceImpl implements MailService {
  async sendMail(email: string, subject: string, body: string): Promise<void> {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    console.log("Sending email to", email);
    try {
      await resend.emails.send({
        to: email,
        from: "Gym Studio <onboarding@resend.dev>",
        subject,
        html: body,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
