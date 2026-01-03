import { useTranslation } from "react-i18next";

type ProfileReadOnlyProps = {
  user: {
    name: string;
    email: string;
    phone?: string;
    createdAt: string;
  };
};

export default function ProfileReadOnly({ user }: ProfileReadOnlyProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <ProfileField label={t("name")} value={user.name} />
      <ProfileField label={t("email")} value={user.email} />
      <ProfileField label={t("phone")} value={user.phone || t("notProvided")} />
      <ProfileField
        label={t("memberSince")}
        value={new Date(user.createdAt).toLocaleDateString()}
      />
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-primary-600">{label}</p>
      <p className="font-medium text-primary-800">{value}</p>
    </div>
  );
}
