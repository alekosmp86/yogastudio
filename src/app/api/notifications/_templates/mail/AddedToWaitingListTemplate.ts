import { NotificationTypePayload } from "../../_models/NotificationTypePayload";

export function addedToWaitingListTemplate(
  data: NotificationTypePayload["ADDED_TO_WAITING_LIST"]
) {
  return {
    subject: "You’ve been added to the waiting list",
    body: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <h2 style="color: #1A4D6D; margin-top: 0; margin-bottom: 12px;">
            Hi ${data.userName},
          </h2>

          <p style="font-size: 15px; color: #333; margin-bottom: 16px;">
            You’ve been added to the waiting list for the following class:
          </p>

          <div style="background-color: #f0f6f8; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <table style="width: 100%; font-size: 14px; color: #333; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 100px;">Class</td>
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

          <p style="font-size: 15px; color: #333;">
            We’ll notify you immediately if a spot becomes available.
          </p>

          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            This is an automated message — please do not reply.
          </p>
        </div>
      </div>
    `,
  };
}
