"use client";

import { readSession, refreshSession } from "@/lib/auth";
import { useToast } from "@/lib/contexts/ToastContext";
import { useEffect, useState } from "react";
import { SessionUser } from "@/types/SessionUser";
import { useUISlot } from "@/lib/hooks/useUISlot";
import { CoreUiSlots } from "@/modules/[core]/CoreUiSlots";

export default function CustomerClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useToast();
  //const [profileFormVisible, setProfileFormVisible] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  const moduleComponents = useUISlot(CoreUiSlots.CustomerProfileCompletion);

  useEffect(() => {
    const handleProfileCompletion = async () => {
      const loggedUser = await readSession();

      if (!loggedUser) return;

      setUser(loggedUser);
      if (!loggedUser.phone) {
        //setProfileFormVisible(true);
      }
    };

    handleProfileCompletion();
  }, []);

  /*const handleProfileCompletionSubmit = async (
    data: Pick<SessionUser, "name" | "phone">
  ) => {
    setProfileFormVisible(false);
    const { message } = await http.put<ApiResponse<void>>(
      "/customer/profile",
      ApiType.FRONTEND,
      data
    );

    if (message === RequestStatus.SUCCESS) {
      toast.showToast({
        message: "Profile updated successfully",
        type: ToastType.SUCCESS,
        duration: 3000,
      });

      const updatedUser = { ...user!, ...data };
      await refreshSession(updatedUser);
    } else {
      toast.showToast({
        message: "Profile update failed",
        type: ToastType.ERROR,
        duration: 3000,
      });
      setProfileFormVisible(true);
    }
  };*/

  return (
    <>
      {children}
      {/** Uncomment this when using the user's phone
        <ProfileCompletionForm
          userData={user}
          isOpen={profileFormVisible}
          onSubmit={(data) => handleProfileCompletionSubmit(data)}
        />
         */}
      {moduleComponents.map((Component, index) => (
        <Component key={index} id={user?.id} />
      ))}
    </>
  );
}
