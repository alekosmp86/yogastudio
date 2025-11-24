"use client";

import Button from "@/components/shared/Button";
import Container from "@/components/shared/Container";
import Input from "@/components/shared/Input";
import { useState } from "react";
import { http } from "@/lib/http";
import { useRouter } from "next/navigation";

export default function CreateClassPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());

    const payload = {
      title: raw.title as string,
      instructor: raw.instructor as string,
      description: raw.description as string,
      capacity: Number(raw.capacity),
    };

    try {
      await http.post("/api/owner/classes/create", payload);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className='bg-brand-500 p-6 rounded-xl'>
      <h1 className='text-2xl font-bold text-brand-500 mb-6'>
        Create a New Class
      </h1>

      <form onSubmit={handleCreateClass} className='flex flex-col gap-6'>
        <Input
          name='title'
          label='Class Title'
          placeholder='e.g. Power Yoga'
          required
        />

        <Input
          name='instructor'
          label='Instructor Name'
          placeholder='e.g. Samantha Lee'
          required
        />

        <Input
          name='description'
          label='Description'
          placeholder='e.g. Strength, flexibility, balance flow...'
        />

        <Input
          name='capacity'
          label='Capacity'
          placeholder='e.g. 20'
          type='number'
          required
        />

        <div className='flex flex-row justify-end'>
          <div className='flex justify-end gap-2 w-80'>
            <Button
              variant='secondary'
              className='mt-4 w-full py-3 rounded-xl font-semibold transition'
              type='button'
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              variant='primary'
              disabled={loading}
              className='mt-4 w-full py-3 rounded-xl font-semibold transition'
              type='submit'
            >
              {loading ? "Creating..." : "Create Class"}
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}
