import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { MailService } from "../MailService";
import { Resend } from "resend";

export class ResendMailServiceImpl implements MailService {
  private readonly logger = new ConsoleLogger(this.constructor.name);
  async sendMail(email: string, subject: string, body: string): Promise<void> {
    const resend = new Resend(process.env.NEXT_PRIVATE_RESEND_API_KEY);

    this.logger.log("Sending email to", email);
    try {
      await resend.emails.send({
        to: email,
        from: "GymStudio <noreply@alekosoft.lat>",
        subject,
        html: body,
      });
    } catch (error) {
      this.logger.error(error as string);
    }
  }
}
