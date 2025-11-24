"use client";

import Button from "@/components/shared/Button";
import Container from "@/components/shared/Container";
import Input from "@/components/shared/Input";
import { useState } from "react";

export default function CreateClassPage() {
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <h1 className="text-2xl font-bold text-[#1A4D6D] mb-6">
        Create a New Class
      </h1>

      <div className="flex flex-col gap-6">
        <Input label="Class Title" placeholder="e.g. Power Yoga" />

        <Input label="Instructor Name" placeholder="e.g. Samantha Lee" />

        <Input label="Description" placeholder="e.g. A dynamic flow that combines strength, flexibility, and balance." />

        <Input label="Capacity" placeholder="e.g. 20" />
      </div>

      <div className="flex gap-4">
        <Button disabled={loading} className="mt-8 w-full py-3 rounded-xl font-semibold text-white hover:bg-[#1A4D6D] transition disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Creating..." : "Create Class"}
        </Button>
        <Button variant="secondary" className="mt-8 w-full py-3 rounded-xl font-semibold text-white hover:bg-[#1A4D6D] transition disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </Button>
      </div>
    </Container>
  );
}
