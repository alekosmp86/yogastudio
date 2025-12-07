import Button from "@/components/shared/Button";
import { GymClass } from "@/types/classes/GymClass";
import { Check, Pencil, Trash, X } from "lucide-react";
import { useState } from "react";

type ClassesCardProps = {
  gymClass: GymClass;
  fields: { key: keyof GymClass; placeholder: string; style?: string; mobileLabel?: string }[];
  adding: boolean;
  busy: boolean;
  onSaveNew: (gymClass: GymClass) => void;
  onUpdate: (id: number, updated: GymClass) => void;
  onDelete?: (id: number) => void;
  onCancel: () => void;
};

export default function ClassesCard({
  gymClass,
  fields,
  adding,
  busy,
  onSaveNew,
  onUpdate,
  onDelete,
  onCancel,
}: ClassesCardProps) {
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
    <div className='bg-white border border-primary-500 p-2 shadow-xl'>
      {fields.map(({ key, placeholder, style, mobileLabel }) => (
        <div
          key={key}
          className={`px-2 text-primary-900 ${style}`}
        >
          {isEditing ? (
            <div className="mt-2 mb-2">
              <label htmlFor={key} className="text-primary-900">{placeholder}</label>
              <input
                className='w-full px-2 py-2 rounded-md focus:ring-1 focus:ring-brand-600 text-white'
                value={form[key] as string | number}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ) : (
            mobileLabel ? (
              <div className="mt-2 mb-2 flex flex-row">
                <p>{`${mobileLabel}: ${gymClass[key]}`}</p>
              </div>
            ) : (
              gymClass[key]
            )
          )}
        </div>
      ))}

      {isEditing ? (
        <div className='flex items-center justify-end gap-2'>
          <Button
            size='md'
            variant={isUnchanged ? "secondary" : "primary"}
            className={isUnchanged ? "disabled:cursor-not-allowed disabled:pointer-events-none" : ""}
            Icon={Check}
            onClick={save}
            disabled={isUnchanged}
          />

          <Button size='md' variant={busy ? "secondary" : "negative"} Icon={X} onClick={cancel} />
        </div>
      ) : (
        <div className='flex items-center justify-end gap-2'>
          <Button
            size='md'
            variant={busy ? "secondary" : "primary"}
            className={busy ? "disabled:cursor-not-allowed disabled:pointer-events-none" : "text-white"}
            Icon={Pencil}
            onClick={() => setIsEditing(true)}
            disabled={busy}
          />

          {onDelete && (
            <Button
              size='md'
              variant={busy ? "secondary" : "negative"}
              className={busy ? "disabled:cursor-not-allowed disabled:pointer-events-none" : "text-white"}
              Icon={Trash}
              onClick={() => onDelete(gymClass.id)}
              disabled={busy}
            />
          )}
        </div>
      )}
    </div>
  );
}
