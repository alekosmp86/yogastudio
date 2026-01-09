import { Membership } from "@/modules/membership/backend/api/models/Membership";

type MembershipOptionCardProps = {
  membership: Membership;
  selected: boolean;
  onSelect: () => void;
};

export function MembershipOptionCard({
  membership,
  selected,
  onSelect,
}: MembershipOptionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left rounded-xl p-4 border transition
        ${
          selected
            ? "border-custom-400 bg-custom-400"
            : "border-gray-700 hover:border-gray-500"
        }
      `}
    >
      <div className='flex justify-between items-center'>
        <h4 className='text-white font-semibold'>{membership.name}</h4>
        {selected && (
          <span className='text-xs px-2 py-1 rounded bg-custom-400 text-black'>
            Selected
          </span>
        )}
      </div>

      <div className='mt-2 text-xs text-gray-400 space-y-1'>
        <p>Duration: {membership.durationDays} days</p>
        <p>
          Activities:{" "}
          {membership.maxActivities === -1
            ? "Unlimited"
            : membership.maxActivities}
        </p>
      </div>
    </button>
  );
}
