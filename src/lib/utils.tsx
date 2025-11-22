import { ExecutionStatus } from "@/enums/ExecutionStatus";

export function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(" ");
}

export async function validateToken(
  token: string,
  callbackFn: (status: ExecutionStatus) => void
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/token-validation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      credentials: "include", // if using cookies
    }
  );

  if (!response.ok) {
    callbackFn(ExecutionStatus.FAILED);
    return;
  }

  callbackFn(ExecutionStatus.COMPLETED);
}
