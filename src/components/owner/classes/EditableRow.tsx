import Button from "@/components/shared/Button";
import { GymClass } from "@/types/classes/GymClass";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

export default function EditableRow({gymClass, handleUpdate, handleDelete}: EditableRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(gymClass);

  const handleSaveEdit = () => {
    handleUpdate(gymClass.id, form);
    setIsEditing(false);
  };

  return (
      <tr
        key={gymClass.id}
        className='bg-brand-600 border-b border-brand-300'
      >
        {isEditing ? <td className='px-4 py-3'><input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder='Class title'
                  /></td> : <td className='px-4 py-3'>{gymClass.title}</td>}
        {isEditing ? <td className='px-4 py-3'><input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.instructor}
                    onChange={(e) =>
                      setForm({ ...form, instructor: e.target.value })
                    }
                    placeholder='Class instructor'
                  /></td> : <td className='px-4 py-3'>{gymClass.instructor}</td>}
        {isEditing ? <td className='px-4 py-3'><input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder='Class description'
                  /></td> : <td className='px-4 py-3'>{gymClass.description}</td>}
        {isEditing ? <td className='px-4 py-3'><input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.capacity}
                    onChange={(e) =>
                      setForm({ ...form, capacity: Number(e.target.value) })
                    }
                    placeholder='Class capacity'
                  /></td> : <td className='px-4 py-3'>{gymClass.capacity}</td>}
        <td className='flex items-center justify-center gap-2 px-2 py-3'>
          {isEditing ? (
            <>
              <Button size='sm' Icon={Pencil} onClick={handleSaveEdit}>
                Save
              </Button>
              <Button size='sm' Icon={Pencil} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button size='sm' Icon={Pencil} onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button
                size='sm'
                Icon={Trash}
                onClick={() => handleDelete(gymClass.id)}
              >
                Delete
              </Button>
            </>
          )}
        </td>
      </tr>
  )
}

type EditableRowProps = {
  gymClass: GymClass;
  handleUpdate: (id: number, gymClass: GymClass) => void;
  handleDelete: (id: number) => void;
}