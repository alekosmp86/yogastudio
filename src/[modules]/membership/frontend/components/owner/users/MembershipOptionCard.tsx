import { Membership } from "@/modules/membership/backend/api/models/Membership";
import { useTranslation } from "react-i18next";

type MembershipOptionCardProps = {
  membership: Membership;
  selected: boolean;
  onSelect: (membershipId: number) => void;
};

export function MembershipOptionCard({
  membership,
  selected,
  onSelect,
}: MembershipOptionCardProps) {
  const { t } = useTranslation();
  
  return (
    <button
      onClick={() => onSelect(membership.id)}
      className={`
        w-full text-left rounded-xl p-4 border transition shadow-lg
        ${
          selected
            ? "border-custom-400 bg-accent-300"
            : "border border-gray-300"
        }
      `}
    >
      <div className='flex justify-between items-center'>
        <h4 className='text-custom-300 font-semibold'>{membership.name}</h4>
        {selected && (
          <span className='text-xs px-2 py-1 rounded bg-custom-300 text-white'>
            Selected
          </span>
        )}
      </div>

      <div className='mt-2 text-xs text-custom-300 space-y-1'>
        <p>{t("duration")}: {membership.durationDays} days</p>
        <p>
          {t("maxActivities")}:{" "}
          {membership.maxActivities === -1
            ? "-"
            : membership.maxActivities}
        </p>
      </div>
    </button>
  );
}
