import { NotificationTypePayload } from "../../_models/NotificationTypePayload";

export function classSpotOpenedTemplate(
  data: NotificationTypePayload["CLASS_SPOT_OPENED"]
) {
  return {
    subject: "Spot opened for a class 🧘‍♂️",
    body: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f5f7fa; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 24px;">

          <h2 style="color: #1A4D6D; margin-top: 0;">
            Hi ${data.userName},
          </h2>

          <p style="font-size: 15px; color: #333;">
            A spot has been <strong>opened</strong>. Here are the details:
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

          <div style="text-align: center; margin: 24px 0;">
            <a
              href="${data.bookClassUrl}"
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
              Book class
            </a>
          </div>

          <p style="font-size: 13px; color: #666;">
            Please be aware that this spot is only available for a limited time.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

          <p style="font-size: 12px; color: #999; text-align: center;">
            This is an automated message — please do not reply.
          </p>

        </div>
      </div>
    `,
  };
}
