import Button from "@/components/shared/Button";
import Field from "@/components/shared/Field";
import { useTranslation } from "react-i18next";
import { ProfileData } from "@/types/profile/ProfileData";

type EditProfileFormProps = {
  profile: ProfileData;
  onCancel: () => void;
  onSave: (data: { name: string; email: string; phone?: string }) => void;
};

export default function EditProfileForm({
  profile,
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
      <Field label={t("name")} name="name" defaultValue={profile.name} required />

      <Field
        label={t("email")}
        name="email"
        type="email"
        defaultValue={profile.email}
        required
      />

      <Field
        label={t("phone")}
        name="phone"
        type="tel"
        defaultValue={profile.phone}
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
