"use client";

import { useState } from "react";
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(Status.LOADING);
    setMessage("");

    try {
      const {message} = await http.get<ApiResponse<string>>(`/auth/request-link?email=${email}`, ApiType.FRONTEND);

      if (message !== RequestStatus.REQUEST_LINK_SENT) {
        setStatus(Status.ERROR);
        setMessage("Unable to process request");
        return;
      }

      setStatus(Status.SENT);
      setMessage("A login link has been sent to your email.");
    } catch (err) {
      setStatus(Status.ERROR);
      setMessage("Something went wrong. Try again later.");
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-[#0f151b] text-[#d6d6da]'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 w-full max-w-xs bg-[#23283f] p-6 rounded-lg shadow-xl border border-[#434447]'
      >
        <h1 className='text-xl font-semibold text-center text-[#d6d6da]'>
          Log in
        </h1>

        <Input
          label='Email'
          name='email'
          type='email'
          placeholder='you@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type='submit'
          disabled={status === Status.LOADING}
          className='p-2 rounded-md bg-[#6d6766] text-[#d6d6da] hover:bg-[#9e9a9f] disabled:opacity-50 transition'
        >
          {status === Status.LOADING ? "Sending..." : "Get link"}
        </Button>

        {message && (
          <p
            className={`text-sm text-center ${
              status === Status.ERROR ? "text-red-400" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
