import Button from "@/components/shared/Button";
import Field from "@/components/shared/Field";
import { useTranslation } from "react-i18next";

type EditProfileFormProps = {
  user: {
    name: string;
    email: string;
    phone?: string;
  };
  onCancel: () => void;
  onSave: (data: { name: string; email: string; phone?: string }) => void;
};

export default function EditProfileForm({
  user,
  onCancel,
  onSave,
}: EditProfileFormProps) {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label={t("name")} name="name" defaultValue={user.name} required />

      <Field
        label={t("email")}
        name="email"
        type="email"
        defaultValue={user.email}
        required
      />

      <Field
        label={t("phone")}
        name="phone"
        type="tel"
        defaultValue={user.phone}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" size="sm" variant="secondary" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button type="submit" size="sm" variant="primary">
          {t("save")}
        </Button>
      </div>
    </form>
  );
}
