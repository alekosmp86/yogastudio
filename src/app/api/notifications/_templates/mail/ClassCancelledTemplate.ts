import { NotificationTypePayload } from "../../_models/NotificationTypePayload";

export function classCancelledTemplate(
  data: NotificationTypePayload["CLASS_CANCELLED"]
) {
  return {
    subject: "Your class reservation was cancelled",
    body: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f5f7fa; padding: 32px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 28px;">

          <h2 style="color: #1A4D6D; margin: 0 0 12px;">
            Hi ${data.userName},
          </h2>

          <p style="font-size: 15px; color: #333; margin-bottom: 20px;">
            Your reservation has been <strong style="color:#d9534f;">cancelled</strong>. Below are the class details:
          </p>

          <div style="background-color: #f0f6f8; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <table style="width: 100%; font-size: 14px; color: #333;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Class</td>
                <td style="padding: 6px 0;">${data.classTitle}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Date</td>
                <td style="padding: 6px 0;">${data.classDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Time</td>
                <td style="padding: 6px 0;">${data.classTime}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Instructor</td>
                <td style="padding: 6px 0;">${data.instructorName}</td>
              </tr>
            </table>
          </div>

          <span style="font-size: 14px; color: #555; margin-bottom: 18px;">
            If this was a mistake, you can reach us at
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
          </span>

          <div style="text-align: center; margin-bottom: 24px;">
            <a
              href="${data.rescheduleBookingUrl}"
              style="
                display: inline-block;
                background-color: #4A9BBE;
                color: #ffffff;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: bold;
                text-decoration: none;
              "
            >
              Reschedule class
            </a>
          </div>

          <p style="font-size: 12px; color: #999; text-align: center;">
            This is an automated message — please do not reply.
          </p>

        </div>
      </div>
    `,
  };
}
