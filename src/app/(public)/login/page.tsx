"use client";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push("/"); // Home will redirect based on role
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72">
        <Input label="Email" name="email" type="email" placeholder="Email" />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border"
        />

        <Button type="submit" className="p-2 bg-blue-500 text-white">
          Log In
        </Button>
      </form>
    </div>
  );
}
