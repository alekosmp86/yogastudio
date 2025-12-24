import { NotificationTypePayload } from "../../_models/NotificationTypePayload";

export function classCancelledTemplate(
  data: NotificationTypePayload["CLASS_CANCELLED"]
) {
  return {
    subject: "Class cancelled",
    body: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f5f7fa; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 24px;">

          <h2 style="color: #1A4D6D; margin-top: 0;">
            Hi ${data.userName},
          </h2>

          <p style="font-size: 15px; color: #333;">
            You have <strong>cancelled</strong> your class. Here are the details:
          </p>

          <table style="width: 100%; font-size: 14px; color: #333; border-collapse: collapse; margin: 8px 0;">
            <tr>
              <td style="padding: 2px 0; font-weight: 600; width: 20%;">Class:</td>
              <td style="padding: 2px 0;">${data.classTitle}</td>
            </tr>
            <tr>
              <td style="padding: 2px 0; font-weight: 600; width: 20%;">Date:</td>
              <td style="padding: 2px 0;">${data.classDate}</td>
            </tr>
            <tr>
              <td style="padding: 2px 0; font-weight: 600; width: 20%;">Time:</td>
              <td style="padding: 2px 0;">${data.classTime}</td>
            </tr>
            <tr>
              <td style="padding: 2px 0; font-weight: 600; width: 20%;">Instructor:</td>
              <td style="padding: 2px 0;">${data.instructorName}</td>
            </tr>
          </table>

          <p style="font-size: 15px; color: #333;">
            If it was a mistake, please contact us via email at ${data.contactEmail} or WhatsApp at
            <a
              href="${`https://wa.me/${data.contactPhone}`}"
              target="_blank"
              className="hover:scale-110 transition"
            >${data.contactPhone}</a>. Or try to reschedule it using the following link.
          </p>

          <div style="text-align: center; margin: 24px 0;">
            <a
              href="${data.rescheduleBookingUrl}"
              style="
                display: inline-block;
                background-color: #4f5dd9;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 20px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: bold;
              "
            >
              Reschedule booking
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
