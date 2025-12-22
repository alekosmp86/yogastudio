"use client";

import { readSession, refreshSession } from "@/lib/auth";
import { useToast } from "@/lib/contexts/ToastContext";
import { useEffect, useState } from "react";
import { ProfileCompletionForm } from "./ProfileCompletionForm";
import { SessionUser } from "@/types/SessionUser";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ToastType } from "@/enums/ToastType";

export default function CustomerClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useToast();
  const [profileFormVisible, setProfileFormVisible] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const handleProfileCompletion = async () => {
      const loggedUser = await readSession();

      if (!loggedUser) return;

      setUser(loggedUser);
      if (!loggedUser.phone) {
        setProfileFormVisible(true);
      }
    };

    handleProfileCompletion();
  }, []);

  const handleProfileCompletionSubmit = async (data: Pick<SessionUser, "name" | "phone">) => {
    setProfileFormVisible(false);
    const { message } = await http.put<ApiResponse<void>>(
      "/customer/profile",
      ApiType.FRONTEND,
      data
    );

    if(message === RequestStatus.SUCCESS) {
      toast.showToast({
        message: "Profile updated successfully",
        type: ToastType.SUCCESS,
        duration: 3000,
      });
      
      const updatedUser = {...user!, ...data};
      await refreshSession(updatedUser);
    } else {
      toast.showToast({
        message: "Profile update failed",
        type: ToastType.ERROR,
        duration: 3000,
      });
      setProfileFormVisible(true);
    }
  };

  return (
    <>
      {children}
      <ProfileCompletionForm
        userData={user}
        isOpen={profileFormVisible}
        onSubmit={(data) => handleProfileCompletionSubmit(data)}
      />
    </>
  );
}
