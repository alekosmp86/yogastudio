import { ExecutionStatus } from "@/enums/ExecutionStatus";

export function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(" ");
}

export async function validateToken(
  token: string,
  callbackFn: (status: ExecutionStatus) => void
) {
  console.log(`Validating token: ${token}. Fetching from: ${process.env.NEXT_PUBLIC_APP_URL}/api/auth/token`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      credentials: "include", // if using cookies
    }
  );

  console.log(`Validation response: ${response}`);

  if (!response.ok) {
    callbackFn(ExecutionStatus.FAILED);
    return;
  }

  callbackFn(ExecutionStatus.COMPLETED);
}

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const HOURS = Array.from({ length: 15 }, (_, i) => {
  const hour = i + 7; // 07 → 21
  return `${String(hour).padStart(2, "0")}:00`;
});
