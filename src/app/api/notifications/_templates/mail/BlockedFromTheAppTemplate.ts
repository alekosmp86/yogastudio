import { NotificationTypePayload } from "../../_models/NotificationTypePayload";

export function blockedFromTheAppTemplate(
  data: NotificationTypePayload["USER_BLOCKED"]
) {
  return {
    subject: "You’ve been blocked from the app",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 24px;">
          
          <h2 style="color: #1A4D6D; margin-top: 0;">
            Hi ${data.userName},
          </h2>

          <p style="font-size: 15px; color: #be0000ff;">
            You’ve been blocked from the app.
          </p>

          <p style="font-size: 15px; color: #333;">
            If it was a mistake, please contact us via email at ${
              data.contactEmail
            } or WhatsApp at
            <a
              href="${`https://wa.me/${data.contactPhone}`}"
              target="_blank"
              className="hover:scale-110 transition"
            >${
              data.contactPhone
            }</a>.
          </p>

          <p style="font-size: 12px; color: #666; margin-top: 16px;">
            This is an automated message — please do not reply.
          </p>
        </div>
      </div>
    `,
  };
}
