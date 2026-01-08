import { Card, CardContent } from "@/components/shared/Card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function MembershipAddCard() {
  const { t } = useTranslation();

  return (
    <Link href="/modules/membership/plans/new" className="block">
      <Card className="h-full flex flex-col mb-4 bg-white border-2 border-dashed border-custom-300 rounded-2xl shadow-sm hover:shadow-md hover:bg-custom-50 transition-all cursor-pointer">
        <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-custom-100 text-custom-300">
            <Plus className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-semibold text-custom-300">
            {t("createNewPlan")}
          </h3>

          <p className="text-sm text-gray-500 max-w-[220px]">
            {t("createNewPlanDescription")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
