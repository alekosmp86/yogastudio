import { ExecutionStatus } from "@/enums/ExecutionStatus";
import { http } from "./http";
import { ApiType } from "@/enums/ApiTypes";

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

export async function removeSession() {
  await http.post("/auth/logout", ApiType.FRONTEND);
}

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const HOURS = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 6; // 06 → 21
  return `${String(hour).padStart(2, "0")}:00`;
});

export const getTodayWeekday = () => {
  // Monday = 0 ... Sunday = 6
  const jsDay = new Date().getDay(); // Sun=0 ... Sat=6
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function getCurrentWeekDates(): Date[] {
  const today = new Date();

  // getDay(): Sunday=0, Monday=1, ... Saturday=6
  const dayOfWeek = today.getDay();

  // We want Monday=0, Tuesday=1, ..., Sunday=6
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  // Build array [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

