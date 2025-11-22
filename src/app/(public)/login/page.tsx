"use client";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { AuthMessages } from "enums/AuthMessages";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Message = {
  type: "success" | "error";
  text: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState<Message>({
    type: "success",
    text: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/login-link`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      await handleAuthResponses(response);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  const handleAuthResponses = async (response: Response) => {
    if (!response.ok) {
      throw new Error("Failed to request magic link");
    }

    const data = await response.json();
    switch (data.status) {
      case AuthMessages.USER_NOT_FOUND:
        router.push("/register");
        break;
      case AuthMessages.USER_NOT_APPROVED:
        setMessage({ type: "error", text: "User pending approval" });
        break;
      case AuthMessages.EMAIL_SENT:
        setMessage({
          type: "success",
          text: "Email sent. Please check your inbox.",
        });
        break;
      default:
        setMessage({ type: "error", text: "Failed to request magic link" });
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/yoga.jpg')] bg-cover">
      <div className='bg-gray-800 p-4 rounded-lg shadow-lg'>
        <label className='flex flex-col items-center text-white pb-2'>
          Yoga Studio
        </label>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-72'>
          <Input name='email' type='email' placeholder='Email' />

          <Button type='submit' className='p-2 bg-blue-500 text-white'>
            Log In
          </Button>
        </form>
        {message && (
          <p
            className={`pt-3 ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
