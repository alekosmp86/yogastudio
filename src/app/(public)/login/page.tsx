"use client";

import { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`/api/auth/request-link?email=${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Unable to process request");
        return;
      }

      // Email sent
      setStatus("sent");
      setMessage("A login link has been sent to your email.");

    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Try again later.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-xl font-semibold text-center">Log in</h1>

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type="submit"
          disabled={status === "loading"}
          className="p-2 bg-blue-500 text-white"
        >
          {status === "loading" ? "Sending..." : "Send Magic Link"}
        </Button>

        {message && (
          <p
            className={`text-sm text-center ${
              status === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
