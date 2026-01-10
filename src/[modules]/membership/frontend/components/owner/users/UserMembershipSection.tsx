"use client";

import { Membership } from "@/modules/membership/backend/api/models/Membership";
import { useEffect, useState } from "react";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { UserMembership } from "@/modules/membership/backend/api/models/UserMembership";
import { MembershipOptionCard } from "./MembershipOptionCard";
import { useToast } from "@/lib/contexts/ToastContext";
import { useTranslation } from "react-i18next";
import { ToastType } from "@/enums/ToastType";

type UserMembershipSectionProps = {
  id: string;
};

export function UserMembershipSection({ id }: UserMembershipSectionProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();
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

  useEffect(() => {
    const fetchMemberships = async () => {
      const { message, data } = await http.get<ApiResponse<Membership[]>>(
        `/owner/membership/plans`,
        ApiType.FRONTEND
      );

      if (message === RequestStatus.SUCCESS && data) {
        setAvailableMemberships(data);
      }
    };

    fetchMemberships();
  }, []);

  const handleMembershipChange = (membershipId: number) => {
    if (!currentMembership) return;

    updateUserMembershipPlan(currentMembership.id, membershipId);
    setCurrentMembership((prev) => {
      if (!prev) {
        return null;
      }
      const newAssignedMembership = availableMemberships.find(
        (m) => m.id === membershipId
      );
      if (!newAssignedMembership) {
        return prev;
      }

      const assignedMembership = {
        ...prev,
        membershipPlanId: membershipId,
        membershipPlan: newAssignedMembership,
      };

      return assignedMembership;
    });
  };

  const updateUserMembershipPlan = async (
    userMembershipId: number,
    newMembershipId: number
  ) => {
    const { message, data } = await http.put<ApiResponse<UserMembership>>(
      `/owner/membership/plans/user/${id}`,
      ApiType.FRONTEND,
      { userMembershipId, newMembershipId }
    );

    if (message === RequestStatus.SUCCESS && data) {
      showToast({
        message: t("membershipUpdatedSuccessfully"),
        type: ToastType.SUCCESS,
      });
      setCurrentMembership(data);
    }
  };

  return (
    <div className='space-y-2 bg-white p-4 sm:p-6 rounded-xl shadow-md text-custom-300'>
      <h2 className='text-lg font-semibold'>Membership</h2>

      <div className='flex flex-col gap-6 lg:flex-row lg:items-start'>
        {availableMemberships.length > 0 &&
          currentMembership &&
          availableMemberships.map((membership) => (
            <MembershipOptionCard
              key={membership.id}
              membership={membership}
              selected={currentMembership.membershipPlanId === membership.id}
              onSelect={(e: number) => handleMembershipChange(e)}
            />
          ))}
      </div>
    </div>
  );
}
