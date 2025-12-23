import { NotificationTypePayload } from "../../(models)/NotificationTypePayload";

export function classBookedTemplate(
  data: NotificationTypePayload["CLASS_BOOKED"]
) {
  return {
    subject: "You’ve booked a class",
    body: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h3>Hi ${data.userName}</h3>

        <p>
          You’ve booked a class:
        </p>

        <ul>
          <li><strong>Class:</strong> ${data.classTitle}</li>
          <li><strong>Date:</strong> ${data.classDate}</li>
          <li><strong>Time:</strong> ${data.classTime}</li>
          <li><strong>Instructor:</strong> ${data.instructorName}</li>
        </ul>

        <p>
          You can cancel your booking by clicking the button below.
        </p>

        <p style="color: #666; font-size: 12px;">
          This is an automated message — please do not reply.
        </p>
      </div>
    `,
  };
}