import Button from "@/components/shared/Button";
import { Card, CardContent } from "@/components/shared/Card";
import { SectionSeparator } from "@/components/shared/SectionSeparator";
import { MembershipPlan } from "@prisma/client";
import { Clock, Edit, ListOrdered, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

type MembershipManagerCardProps = {
  plan: MembershipPlan;
};

export default function MembershipManagerCard({
  plan,
}: MembershipManagerCardProps) {
  const { t } = useTranslation();

  return (
    <Card className='h-full flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl'>
      <CardContent className='p-5 sm:p-6 flex flex-col h-full'>
        {/* Header */}
        <div className='text-center mb-5'>
          <h3 className='text-2xl font-semibold text-custom-300'>
            {plan.name}
          </h3>
          <p className='text-sm text-gray-500 mt-1'>{t("planOverview")}</p>
        </div>

        <SectionSeparator label={t("details")} color='black' />

        {/* Content */}
        <div className='mt-5 flex flex-col sm:flex-row sm:justify-between gap-6 flex-1'>
          {/* Plan details */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2 text-custom-300'>
              <Clock className='w-4 h-4 opacity-80' />
              <span className='text-sm font-medium'>{t("duration")}:</span>
              <span className='text-sm text-gray-600'>
                {plan.durationDays} {t("days")}
              </span>
            </div>

            <div className='flex items-center gap-2 text-custom-300'>
              <ListOrdered className='w-4 h-4 opacity-80' />
              <span className='text-sm font-medium'>{t("maxActivities")}:</span>
              <span className='text-sm text-gray-600'>
                {plan.maxActivities}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className='flex flex-col gap-1 sm:min-w-[80px]'>
            <Button
              variant='primary'
              size='sm'
              Icon={Edit}
              className='w-full'
            >
              {t("edit")}
            </Button>

            <Button
              variant='negative'
              size='sm'
              Icon={Trash}
              className='w-full'
            >
              {t("delete")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
