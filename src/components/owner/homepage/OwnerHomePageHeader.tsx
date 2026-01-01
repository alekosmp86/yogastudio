"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { removeSession } from "@/lib/utils/utils";
import Button from "@/components/shared/Button";
import LogoutButton from "@/components/shared/LogoutButton";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export default function OwnerHomePageHeader() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = async () => {
    await removeSession();
    router.push("/login");
  };

  return (
    <header className="z-20 rounded-b-2xl bg-gradient-to-b from-custom-400 to-custom-300 px-4 py-6 text-custom-50 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">{t("ownerDashboard")}</h1>
          <p className="text-sm text-white/70 mt-1">{t("manageYourBusiness")}</p>
        </div>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-sm text-white/80 hover:text-white flex items-center gap-1 rounded-xl"
        >
          <LogoutButton className="w-6 h-6" />
        </Button>
      </div>

      <div className="mt-4">
        <Breadcrumbs />
      </div>
    </header>
  );
}
