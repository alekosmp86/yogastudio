"use client";

import { Membership } from "@/modules/membership/backend/api/models/Membership";
import { useEffect, useState } from "react";
import { MembershipDetailsCard } from "./MembershipDetailsCard";
import { MembershipSelector } from "./MembershipSelector";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { UserMembership } from "@/modules/membership/backend/api/models/UserMembership";

type UserMembershipSectionProps = {
  id: string;
};

export function UserMembershipSection({ id }: UserMembershipSectionProps) {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [availableMemberships, setAvailableMemberships] = useState<
    Membership[]
  >([]);
  const [currentMembership, setCurrentMembership] =
    useState<UserMembership | null>(null);

  useEffect(() => {
    const fetchUserMembership = async () => {
      const { message, data } = await http.get<ApiResponse<UserMembership>>(
        `/owner/membership/plans/user/${id}`,
        ApiType.FRONTEND
      );

      if (message === RequestStatus.SUCCESS && data) {
        setCurrentMembership(data);
      }
    };

    fetchUserMembership();
  }, [id]);

  const handleMembershipChange = (membershipId: number) => {
    setSelectedId(membershipId);
    setCurrentMembership(null);
  };

  return (
    <div className='space-y-2 bg-white p-4 sm:p-6 rounded-xl shadow-md text-custom-300'>
      <h2 className='text-lg font-semibold'>Membership</h2>

      <div className='flex flex-col gap-6 lg:flex-row lg:items-start'>
        {currentMembership && (
          <div className='w-full lg:w-1/3'>
            <MembershipDetailsCard
              membership={currentMembership.membershipPlan}
            />
          </div>
        )}

        <div className='w-full lg:w-2/3'>
          <MembershipSelector
            currentMembershipId={currentMembership?.membershipPlan.id || 0}
            onChange={handleMembershipChange}
          />
        </div>
      </div>
    </div>
  );
}
