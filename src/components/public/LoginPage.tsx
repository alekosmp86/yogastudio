import { RequestStatus } from "@/enums/RequestStatus";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { ApiType } from "@/enums/ApiTypes";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SENT = "sent",
  ERROR = "error",
  USER_NOT_APPROVED = "user_not_approved",
}

const messages: Record<Status, string> = {
  [Status.ERROR]: "Something went wrong. Try again later.",
  [Status.SENT]: "A login link has been sent to your email.",
  [Status.IDLE]: "",
  [Status.LOADING]: "Requesting link...",
  [Status.USER_NOT_APPROVED]: "User pending approval. Please contact the admin.",
};

const logger = new ConsoleLogger("LoginPage");

export default function LoginPage() {
  const emailInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const messageUI = messages[status];
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(Status.LOADING);

    try {
      const {message} = await http.get<ApiResponse<string>>(`/auth/magic-link?email=${emailInput.current?.value}`, ApiType.FRONTEND);

      switch (message) {
        case RequestStatus.EMAIL_SENT:
          setStatus(Status.SENT);
          break;
        case RequestStatus.USER_NOT_APPROVED:
          setStatus(Status.USER_NOT_APPROVED);
          break;
        case RequestStatus.USER_NOT_FOUND:
          router.push(`/register?email=${encodeURIComponent(emailInput.current?.value || "")}`);
          break;
        default:
          setStatus(Status.ERROR);
          break;
      }

      logger.log("Link status", message);
    } catch (error) {
      logger.error("Error requesting link", error);
      setStatus(Status.ERROR);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-theme-bg-3 text-brand-200'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 w-full max-w-xs bg-theme-cardbg p-6 rounded-lg shadow-xl border border-brand-600'
      >
        <h1 className='text-xl font-semibold text-center text-primary-800'>
          Log in
        </h1>

        <div className='flex flex-col'>
          <label htmlFor='email' className='text-primary-800'>
            Email
          </label>
          <Input
            name='email'
            type='email'
            placeholder='you@example.com'
            className='text-primary-800'
            ref={emailInput}
            required
          />
        </div>

        <Button
          type='submit'
          disabled={status === Status.LOADING}
          variant='primary'
        >
          {status === Status.LOADING ? "Sending..." : "Get link"}
        </Button>

        {messageUI && (
          <p
            className={`text-sm text-center ${
              (status === Status.ERROR || status === Status.USER_NOT_APPROVED) ? "text-danger-600" : "text-primary-700"
            }`}
          >
            {messageUI}
          </p>
        )}
      </form>
    </div>
  );
}