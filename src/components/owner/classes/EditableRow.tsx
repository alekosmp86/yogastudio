import Button from "@/components/shared/Button";
import { GymClass } from "@/types/classes/GymClass";
import { Check, Pencil, Trash, X } from "lucide-react";
import { useState } from "react";

type EditableRowProps = {
  gymClass: GymClass;
  adding?: boolean;
  fields: { key: keyof GymClass; placeholder: string }[];
  onSaveNew: (gymClass: GymClass) => void;
  onUpdate: (id: GymClass["id"], gymClass: GymClass) => void;
  onCancel: () => void;
  onDelete: (id: GymClass["id"]) => void;
};

export default function EditableRow({
  gymClass,
  fields,
  adding = false,
  onSaveNew,
  onUpdate,
  onCancel,
  onDelete,
}: EditableRowProps) {
  const [isEditing, setIsEditing] = useState(adding);
  const [form, setForm] = useState(gymClass);

  const isUnchanged =
    form.title === gymClass.title &&
    form.instructor === gymClass.instructor &&
    form.description === gymClass.description &&
    form.capacity === gymClass.capacity;

  const handleChange = (field: keyof GymClass, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "capacity" ? Number(value) || 0 : value,
    }));
  };

  const save = () => {
    if (adding) {
      onSaveNew(form);
    } else {
      onUpdate(gymClass.id, form);
    }
    setIsEditing(false);
  };

  const cancel = () => {
    setIsEditing(false);
    setForm(gymClass);
    onCancel();
  };

  return (
    <tr className="bg-surface-divider border-b border-brand-300">
      {fields.map(({ key, placeholder }) => (
        <td key={key} className="px-4 py-3 text-textcolor-primary">
          {isEditing ? (
            <input
              className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-400 outline-none"
              value={form[key] as string | number}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
            />
          ) : (
            gymClass[key]
          )}
        </td>
      ))}

      <td className="flex items-center justify-center gap-2 px-2 py-3">
        {isEditing ? (
          <>
            <Button size="sm" variant="primary" Icon={Check} onClick={save} disabled={isUnchanged}>
              Save
            </Button>

            <Button size="sm" variant="secondary" Icon={X} onClick={cancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="primary" Icon={Pencil} onClick={() => setIsEditing(true)}>
              Edit
            </Button>

            <Button size="sm" className="bg-red-600 hover:bg-red-600/80" Icon={Trash} onClick={() => onDelete(gymClass.id)}>
              Delete
            </Button>
          </>
        )}
      </td>
    </tr>
  );
}
