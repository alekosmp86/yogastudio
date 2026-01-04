import { useTranslation } from "react-i18next";
import { ProfileData } from "@/types/profile/ProfileData";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { BusinessTime } from "@/lib/utils/date";

type ProfileReadOnlyProps = {
  profile: ProfileData;
};

export default function ProfileReadOnly({ profile }: ProfileReadOnlyProps) {
  const { t } = useTranslation();
  const { getPreferenceByName } = useAppPreferences();
  const language = getPreferenceByName<string>("language") || "en";
  const timezone = getPreferenceByName<string>("timezone") || "UTC";
  const businessTime = new BusinessTime(timezone);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <ProfileField label={t("name")} value={profile.name} />
      <ProfileField label={t("email")} value={profile.email} />
      <ProfileField
        label={t("phone")}
        value={profile.phone || t("notProvided")}
      />
      <ProfileField label={t("memberSince")} value={businessTime.formatDate(profile.createdAt, language)} />
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
