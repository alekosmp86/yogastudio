"use client";

import Button from "@/components/shared/Button";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { http } from "@/lib/http";
import { CreateClassResponse } from "@/types/classes/CreateClassResponse";
import { GymClass } from "@/types/classes/GymClass";
import { GymClassBase } from "@/types/classes/GymClassBase";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function ClassTable() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<GymClassBase>({
    title: "",
    instructor: "",
    description: "",
    capacity: 0,
  });

  useEffect(() => {
    const fetchClasses = async () => {
      const data: GymClass[] = await http.get(
        "/owner/classes",
        ApiType.FRONTEND
      );
      setClasses(data);
    };
    fetchClasses();
  }, []);

  const handleSave = async () => {
    const newClass: GymClassBase = {
      title: form.title,
      instructor: form.instructor,
      description: form.description,
      capacity: Number(form.capacity),
    };

    /** @todo: handle success and error */
    const { message, id }: CreateClassResponse = await http.post(
      "/owner/classes",
      ApiType.FRONTEND,
      newClass
    );
    if (message === RequestStatus.CREATE_ERROR) {
      //show toast message
      return;
    }

    setClasses([...classes, { id, ...newClass }]);
    setForm({ title: "", instructor: "", description: "", capacity: 0 });
    setAdding(false);
  };

  const handleDelete = async (id: number) => {
    const response = await http.delete(
      `/owner/classes/${id}`,
      ApiType.FRONTEND
    );
    if (response) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className='bg-brand-700 rounded-xl p-6 shadow-xl border border-brand-700'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-brand-400'>Your Classes</h2>
        <Button
          variant='primary'
          onClick={() => setAdding(true)}
          disabled={adding}
        >
          Add Class
        </Button>
      </div>

      <div className='overflow-x-auto rounded-sm border border-brand-600'>
        <table className='w-full text-center text-brand-200'>
          <thead className='bg-brand-800 text-brand-400 sticky top-0 z-10'>
            <tr>
              <th className='px-4 py-3'>Title</th>
              <th className='px-4 py-3'>Instructor</th>
              <th className='px-4 py-3'>Description</th>
              <th className='px-4 py-3'>Capacity</th>
              <th className='px-4 py-3 text-center'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.length > 0
              ? classes.map((c) => (
                  <tr
                    key={c.id}
                    className='bg-brand-600 border-b border-brand-300'
                  >
                    <td className='px-4 py-3'>{c.title}</td>
                    <td className='px-4 py-3'>{c.instructor}</td>
                    <td className='px-4 py-3'>{c.description}</td>
                    <td className='px-4 py-3'>{c.capacity}</td>
                    <td className='flex items-center justify-center gap-2 px-2 py-3'>
                      <Button size='sm' Icon={Pencil}>
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        Icon={Trash}
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              : !adding && (
                  <tr>
                    <td colSpan={5} className='text-center py-4'>
                      No classes found
                    </td>
                  </tr>
                )}

            {/* New row when adding */}
            {adding && (
              <tr className='bg-brand-800/60 border-t border-brand-600'>
                <td className='px-4 py-3'>
                  <input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder='Class title'
                  />
                </td>
                <td className='px-4 py-3'>
                  <input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.instructor}
                    onChange={(e) =>
                      setForm({ ...form, instructor: e.target.value })
                    }
                    placeholder='Instructor'
                  />
                </td>
                <td className='px-4 py-3'>
                  <input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder='Description'
                  />
                </td>
                <td className='px-4 py-3'>
                  <input
                    type='number'
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.capacity}
                    onChange={(e) =>
                      setForm({ ...form, capacity: Number(e.target.value) })
                    }
                    placeholder='20'
                  />
                </td>
                <td className='px-4 py-3 flex justify-end gap-2'>
                  <Button
                    size='sm'
                    variant='secondary'
                    onClick={() => {
                      setForm({
                        title: "",
                        instructor: "",
                        description: "",
                        capacity: 0,
                      });
                      setAdding(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size='sm' variant='primary' onClick={handleSave}>
                    Save
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view hint */}
      {classes.length > 0 && (
        <p className='mt-3 text-xs text-brand-500 block sm:hidden'>
          Scroll → to view the full table
        </p>
      )}
    </div>
  );
}
