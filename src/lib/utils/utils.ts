import { ExecutionStatus } from "@/enums/ExecutionStatus";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";

export function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(" ");
}

export async function validateToken(
  token: string,
  callbackFn: (status: ExecutionStatus) => void
) {
  console.log(
    `Validating token: ${token}. Fetching from: ${process.env.NEXT_PUBLIC_APP_URL}/api/auth/token`
  );
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

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
