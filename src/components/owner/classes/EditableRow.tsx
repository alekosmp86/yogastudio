import Button from "@/components/shared/Button";
import { GymClass } from "@/types/classes/GymClass";
import { Check, Pencil, Trash, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type EditableRowProps = {
  gymClass: GymClass;
  adding?: boolean;
  busy: boolean;
  fields: { key: keyof GymClass; placeholder: string }[];
  onSaveNew: (gymClass: GymClass) => void;
  onUpdate: (id: number, gymClass: GymClass) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
};

export default function EditableRow({
  gymClass,
  fields,
  adding = false,
  busy,
  onSaveNew,
  onUpdate,
  onCancel,
  onDelete,
}: EditableRowProps) {
  const { t } = useTranslation();
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
    <tr className="bg-white/80 hover:bg-custom-50/60 transition-colors border-b border-custom-100">
      {fields.map(({ key, placeholder }) => (
        <td
          key={key}
          className="px-4 py-3 text-sm text-custom-400 align-middle"
        >
          {isEditing ? (
            <input
              className="
                w-full rounded-lg bg-white px-3 py-2 text-sm
                border border-custom-100
                focus:border-custom-200 focus:ring-2 focus:ring-custom-100
                outline-none transition
              "
              value={form[key] as string | number}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={t(placeholder)}
            />
          ) : (
            <span className="block truncate">{gymClass[key]}</span>
          )}
        </td>
      ))}

      <td className="px-3 py-3">
        <div className="flex items-center justify-center gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant={isUnchanged ? "secondary" : "primary"}
                Icon={Check}
                onClick={save}
                disabled={isUnchanged}
                className="rounded-full"
              >
                {t("save")}
              </Button>

              <Button
                size="sm"
                variant="ghost"
                Icon={X}
                onClick={cancel}
                className="rounded-full text-custom-300 hover:text-custom-400"
              >
                {t("cancel")}
              </Button>
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
              >
                {t("edit")}
              </Button>

              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  Icon={Trash}
                  onClick={() => onDelete(gymClass.id)}
                  disabled={busy}
                  className="rounded-full text-red-400 hover:text-red-500"
                >
                  {t("delete")}
                </Button>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
