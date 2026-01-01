import Button from "@/components/shared/Button";
import { cn } from "@/lib/utils/utils";
import { GymClass } from "@/types/classes/GymClass";
import { Check, Pencil, Trash, X } from "lucide-react";
import { Activity, useState } from "react";

type ClassesCardProps = {
  gymClass: GymClass;
  fields: {
    key: keyof GymClass;
    placeholder: string;
    style?: string;
    mobileLabel?: string;
  }[];
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
    <div className="rounded-2xl bg-white/90 border border-custom-100 p-4 shadow-sm space-y-3">
      {fields.map(({ key, placeholder, style, mobileLabel }) => (
        <div key={key} className={`text-custom-400 ${isEditing ? style : ""}`}>
          {isEditing ? (
            <div className="space-y-1">
              <label
                htmlFor={key}
                className="block text-xs font-medium uppercase tracking-wide text-custom-300"
              >
                {placeholder}
              </label>
              <input
                id={key}
                className="
                  w-full rounded-lg px-3 py-2 text-sm
                  border border-custom-100
                  focus:border-custom-200 focus:ring-2 focus:ring-custom-100
                  outline-none transition
                "
                value={form[key] as string | number}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ) : (
            <div className="flex justify-between gap-4">
              {mobileLabel && (
                <span className="text-xs tracking-wide text-custom-300">
                  {mobileLabel}
                </span>
              )}
              <span className={cn("text-sm text-custom-400 text-right truncate", style)}>
                {gymClass[key]}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-custom-100">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant={isUnchanged ? "secondary" : "primary"}
              Icon={Check}
              onClick={save}
              disabled={isUnchanged}
              className="rounded-full"
            />

            <Button
              size="sm"
              variant="ghost"
              Icon={X}
              onClick={cancel}
              className="rounded-full text-custom-300 hover:text-custom-400"
            />
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              Icon={Pencil}
              onClick={() => setIsEditing(true)}
              disabled={busy}
              className="rounded-full text-custom-300 hover:text-custom-400"
            />

            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                Icon={Trash}
                onClick={() => onDelete(gymClass.id)}
                disabled={busy}
                className="rounded-full text-red-400 hover:text-red-500"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
