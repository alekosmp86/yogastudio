"use client";

import { SectionSeparator } from "@/components/shared/SectionSeparator";
import { CoreUiSlots } from "@/modules/[core]/CoreUiSlots";
import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import { DashboardItems } from "./DashboardItems";
import { useUISlot } from "@/lib/hooks/useUISlot";

export default function Dashboard() {
  const { t } = useTranslation();
  const components = useUISlot(CoreUiSlots.OwnerDashboardCards);

  return (
    <>
      <p className='text-white text-xl mt-6 mb-6'>{t("welcomeOwner")}</p>

      <SectionSeparator label={t("main")} color='custom-50' />

      <div className='m-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
        {DashboardItems.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            icon={<item.icon size={40} />}
          />
        ))}
      </div>

      <SectionSeparator label={t("modules")} color='custom-50' />

      <div className='m-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
        {components.length > 0 ? (
          <>
            {components.map((Component, i) => (
              <Component key={i} />
            ))}
          </>
        ) : (
          <p className='text-white text-md mt-6 mb-6'>
            {t("noModulesRegistered")}
          </p>
        )}
      </div>
    </>
  );
}
