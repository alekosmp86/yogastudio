"use client";

import { DashboardItems } from "./DashboardItems";
import DashboardCard from "./DashboardCard";
import { useTranslation } from "react-i18next";
import { SectionSeparator } from "@/components/shared/SectionSeparator";

export function OwnerDashboardClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <>
      <p className="text-white text-xl mt-6 mb-6">{t("welcomeOwner")}</p>

      <SectionSeparator label={t("main")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DashboardItems.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            icon={<item.icon size={40} />}
          />
        ))}

        <SectionSeparator label={t("modules")} />
        {children}
      </div>
    </>
  );
}
