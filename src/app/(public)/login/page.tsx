"use client";

import { useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { RequestStatus } from "@/enums/RequestStatus";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SENT = "sent",
  ERROR = "error",
}

const messages: Record<Status, string> = {
  [Status.ERROR]: "Something went wrong. Try again later.",
  [Status.SENT]: "A login link has been sent to your email.",
  [Status.IDLE]: "",
  [Status.LOADING]: "Requesting link...",
};

export default function LoginPage() {
  const emailInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const messageUI = messages[status];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(Status.LOADING);

    try {
      const {message} = await http.get<ApiResponse<string>>(`/auth/request-link?email=${emailInput.current?.value}`, ApiType.FRONTEND);

      if (message !== RequestStatus.REQUEST_LINK_SENT) {
        setStatus(Status.ERROR);
        return;
      }

      setStatus(Status.SENT);
    } catch (err) {
      setStatus(Status.ERROR);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-surface-app text-brand-200'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 w-full max-w-xs bg-surface-section p-6 rounded-lg shadow-xl border border-brand-600'
      >
        <h1 className='text-xl font-semibold text-center text-brand-200'>
          Log in
        </h1>

        <Input
          label='Email'
          name='email'
          type='email'
          placeholder='you@example.com'
          ref={emailInput}
          required
        />

        <Button
          type='submit'
          disabled={status === Status.LOADING}
          variant="primary"
        >
          {status === Status.LOADING ? "Sending..." : "Get link"}
        </Button>

        {messageUI && (
          <p
            className={`text-sm text-center ${
              status === Status.ERROR ? "text-red-400" : "text-green-400"
            }`}
          >
            {messageUI}
          </p>
        )}
      </form>
    </div>
  );
}
