import { NotificationTypePayload } from "../(models)/NotificationTypePayload";

export function addedToWaitingListTemplate(
  data: NotificationTypePayload["ADDED_TO_WAITING_LIST"]
) {
  return {
    subject: "You’ve been added to the waiting list",
    body: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h3>Hi ${data.userName}, you’ve been added to the waiting list</h3>

        <p>
          You’ve been added to the waiting list for:
        </p>

        <ul>
          <li><strong>Class:</strong> ${data.classTitle}</li>
          <li><strong>Date:</strong> ${data.classDate}</li>
          <li><strong>Time:</strong> ${data.classTime}</li>
          <li><strong>Instructor:</strong> ${data.instructorName}</li>
        </ul>

        <p>
          We’ll notify you if a spot becomes available.
        </p>

        <p style="color: #666; font-size: 12px;">
          This is an automated message — please do not reply.
        </p>
      </div>
    `
  };
}
