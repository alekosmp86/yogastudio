import { uiRegistry } from "@/lib/hooks";
import DashboardCard from "./DashboardCard";
import { DashboardItems } from "./DashboardItems";
import { useTranslation } from "react-i18next";
import { CoreUiSlots } from "@/modules/[core]/CoreUiSlots";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <>
      <p className="text-white text-xl mt-6 mb-6">{t("welcomeOwner")}</p>

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

        {uiRegistry.renderUI(CoreUiSlots.OwnerDashboardCards)}
      </div>
    </>
  );
}
