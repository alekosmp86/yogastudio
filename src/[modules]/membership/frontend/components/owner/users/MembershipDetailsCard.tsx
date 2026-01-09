import { Membership } from "@/modules/membership/backend/api/models/Membership";
import { useTranslation } from "react-i18next";

type MembershipDetailsCardProps = {
  membership: Membership;
};

export function MembershipDetailsCard({
  membership,
}: MembershipDetailsCardProps) {
  const {t} = useTranslation();
  return (
    <div className='rounded-md bg-gradient-to-b from-custom-300 to-custom-200 p-4 shadow-lg shadow-custom-500'>
      <h3 className='text-lg font-semibold text-white mb-2'>
        {t("current")}
      </h3>

      <div className='text-sm'>
        <p className='font-semibold text-white'>
          {t("name")}: {membership.name}
        </p>
        <p className='font-semibold text-white'>
          {t("duration")}: {membership.durationDays} days
        </p>
        <p className='font-semibold text-white'>
          {t("maxActivities")}: {membership.maxActivities === -1
            ? "-"
            : membership.maxActivities}
        </p>
      </div>
    </div>
  );
}
