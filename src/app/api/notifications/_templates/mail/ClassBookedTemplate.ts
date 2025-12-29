import { NotificationTypePayload } from "../../_models/NotificationTypePayload";

export function classBookedTemplate(
  data: NotificationTypePayload["CLASS_BOOKED"]
) {
  return {
    subject: "Your class is booked 🧘‍♂️",
    body: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f5f7fa; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">

          <h2 style="color: #1A4D6D; margin-top: 0; margin-bottom: 12px;">
            Hi ${data.userName},
          </h2>

          <p style="font-size: 15px; color: #333; margin-bottom: 16px;">
            Your spot has been <strong>successfully booked</strong>. Here are the class details:
          </p>

          <div style="background-color: #f0f6f8; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <table style="width: 100%; font-size: 14px; color: #333; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 110px;">Class</td>
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

          <div style="text-align: center; margin-bottom: 20px;">
            <a
              href="${data.cancelBookingUrl}"
              style="
                display: inline-block;
                background-color: #d9534f;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 22px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: bold;
              "
            >
              Cancel booking
            </a>
          </div>

          <p style="font-size: 13px; color: #555;">
            If you can’t attend, please cancel in advance so someone else can take your place.
          </p>

          <p style="font-size: 12px; color: #999; margin-top: 20px;">
            This is an automated message — please do not reply.
          </p>

        </div>
      </div>
    `,
  };
}
