import { Membership } from "@/modules/membership/backend/api/models/Membership";
import { MembershipOptionCard } from "./MembershipOptionCard";
import { useEffect, useState } from "react";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";

type MembershipSelectorProps = {
  onChange: (membershipId: number) => void;
  currentMembershipId: number;
};

export function MembershipSelector({
  onChange,
  currentMembershipId,
}: MembershipSelectorProps) {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [selectedMembershipId, setSelectedMembershipId] =
    useState<number>(currentMembershipId);

  useEffect(() => {
    const fetchMemberships = async () => {
      const { message, data } = await http.get<ApiResponse<Membership[]>>(
        `/owner/membership/plans`,
        ApiType.FRONTEND
      );

      if (message === RequestStatus.SUCCESS && data) {
        setMemberships(data);
      }
    };

    fetchMemberships();
  }, []);

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {memberships.map((membership) => (
          <MembershipOptionCard
            key={membership.id}
            membership={membership}
            selected={membership.id === selectedMembershipId}
            onSelect={() => {
              setSelectedMembershipId(membership.id);
              onChange(membership.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
