import { NotificationTypePayload } from "../../_models/NotificationTypePayload";

export function blockedFromTheAppTemplate(
  data: NotificationTypePayload["USER_BLOCKED"]
) {
  const blockedUntilText = data.untilDate || "indefinitely";

  return {
    subject: "Account access suspended",
    body: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 24px;">
        <div style="
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          border-left: 6px solid #be0000;
        ">

          <h2 style="color: #1A4D6D; margin-top: 0;">
            Hello ${data.userName},
          </h2>

          <p style="font-size: 15px; color: #333;">
            Your access to the application has been <strong>temporarily suspended</strong>.
          </p>

          <div style="
            margin: 16px 0;
            padding: 12px 16px;
            background-color: #fff4f4;
            border-radius: 6px;
            color: #be0000;
            font-size: 14px;
          ">
            <strong>Status:</strong> Blocked<br />
            <strong>Until:</strong> ${blockedUntilText}
          </div>

          <p style="font-size: 14px; color: #333;">
            If you believe this action was taken in error or need further clarification,
            please contact our support team:
          </p>

          <p style="font-size: 14px; color: #333;">
            📧 Email:
            <a href="mailto:${data.contactEmail}" style="color: #1A4D6D;">
              ${data.contactEmail}
            </a>
            <br />
            💬 WhatsApp:
            <a
              href="https://wa.me/${data.contactPhone}"
              target="_blank"
              style="color: #1A4D6D; text-decoration: none;"
            >
              ${data.contactPhone}
            </a>
          </p>

          <p style="font-size: 12px; color: #777; margin-top: 24px;">
            This is an automated message. Please do not reply directly to this email.
          </p>

        </div>
      </div>
    `,
  };
}
