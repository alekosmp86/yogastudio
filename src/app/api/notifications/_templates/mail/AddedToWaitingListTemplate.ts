import { NotificationTypePayload } from "../../_models/NotificationTypePayload";

export function addedToWaitingListTemplate(
  data: NotificationTypePayload["ADDED_TO_WAITING_LIST"]
) {
  return {
    subject: "You’ve been added to the waiting list",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 24px;">
          
          <h2 style="color: #1A4D6D; margin-top: 0;">
            Hi ${data.userName},
          </h2>

          <p style="font-size: 15px; color: #333;">
            You’ve been added to the waiting list for the following class:
          </p>

          <table style="width: 100%; font-size: 14px; color: #333; border-collapse: collapse; margin: 8px 0;">
            <tr>
              <td style="padding: 2px 0; font-weight: bold; width: 90px;">Class</td>
              <td style="padding: 2px 0;">${data.classTitle}</td>
            </tr>
            <tr>
              <td style="padding: 2px 0; font-weight: bold;">Date</td>
              <td style="padding: 2px 0;">${data.classDate}</td>
            </tr>
            <tr>
              <td style="padding: 2px 0; font-weight: bold;">Time</td>
              <td style="padding: 2px 0;">${data.classTime}</td>
            </tr>
            <tr>
              <td style="padding: 2px 0; font-weight: bold;">Instructor</td>
              <td style="padding: 2px 0;">${data.instructorName}</td>
            </tr>
          </table>

          <p style="font-size: 15px; color: #333; margin-top: 12px;">
            We’ll notify you as soon as a spot becomes available.
          </p>

          <p style="font-size: 12px; color: #666; margin-top: 16px;">
            This is an automated message — please do not reply.
          </p>
        </div>
      </div>
    `,
  };
}
