import Button from "@/components/shared/Button";
import { GymClass } from "@/types/classes/GymClass";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

export default function EditableRow({gymClass, adding, handleSaveNew, handleUpdate, handleCancel, handleDelete}: EditableRowProps) {
  const [isEditing, setIsEditing] = useState(adding);
  const [form, setForm] = useState(gymClass);

  const handleSaveEdit = () => {
    if(adding) {
      handleSaveNew(form);
    } else {
      handleUpdate(gymClass.id, form);
    }
    setIsEditing(false);
  };

  const cancelAction = () => {
    setIsEditing(false);
    setForm(gymClass);
    handleCancel();
  };

  return (
      <tr
        key={gymClass.id}
        className='bg-brand-600 border-b border-brand-300'
      >
        <td className='px-4 py-3'>
        {isEditing ? <input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder='Class title'
                  /> : gymClass.title}
        </td>
        <td className='px-4 py-3'>
        {isEditing ? <input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.instructor}
                    onChange={(e) =>
                      setForm({ ...form, instructor: e.target.value })
                    }
                    placeholder='Class instructor'
                  /> : gymClass.instructor}</td>
        <td className='px-4 py-3'>
        {isEditing ? <input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder='Class description'
                  /> : gymClass.description}</td>
        <td className='px-4 py-3'>
        {isEditing ? <input
                    className='w-full bg-brand-700 text-brand-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none'
                    value={form.capacity}
                    onChange={(e) =>
                      setForm({ ...form, capacity: isNaN(Number(e.target.value)) ? 0 : Number(e.target.value) })
                    }
                    placeholder='Class capacity'
                  /> : gymClass.capacity}</td>
        <td className='flex items-center justify-center gap-2 px-2 py-3'>
          {isEditing ? (
            <>
              <Button size='sm' Icon={Pencil} onClick={handleSaveEdit}>
                Save
              </Button>
              <Button size='sm' Icon={Pencil} onClick={cancelAction}>
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
  adding: boolean;
  handleSaveNew: (gymClass: GymClass) => void;
  handleCancel: () => void;
  handleUpdate: (id: number, gymClass: GymClass) => void;
  handleDelete: (id: number) => void;
}