"use client";

import { useTranslation } from "react-i18next";

type UserOverviewCardProps = {
  name?: string;
  email?: string;
  phone?: string;
  penalties?: number;
  cancelationsCount?: number;
};

export default function UserDetails({
  name = "User name",
  email = "user@email.com",
  phone = "+00 000 000 000",
  penalties = 0,
  cancelationsCount = 0,
}: UserOverviewCardProps) {
  const { t } = useTranslation();

  return (
    <>
      <section className='mt-6 space-y-6'>
        {/* HEADER */}
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-white'>{t("userDetails")}</h2>
        </div>
      </section>

      <div className='rounded-2xl bg-custom-50 p-5 mt-6 shadow-sm space-y-4'>
        <div className='flex items-center gap-4'>
          {/* Avatar placeholder */}
          <div className='h-12 w-12 rounded-full bg-custom-100 flex items-center justify-center text-custom-400 font-semibold'>
            {name.charAt(0)}
          </div>

          <div className='min-w-0'>
            <div className='text-base font-semibold text-custom-400 truncate'>
              {name}
            </div>
            <div className='text-xs text-custom-200 truncate'>{email}</div>
          </div>
        </div>

        {/* Contact */}
        <div className='rounded-xl bg-white/60 p-4 text-sm text-custom-400 space-y-1'>
          <div>
            <span className='opacity-60'>Phone</span>
            <div className='font-medium'>{phone}</div>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 gap-3'>
          <StatCard label='Cancelations' value={cancelationsCount} />
          <StatCard label='Penalties' value={penalties} />
        </div>

        {/* Future expansion hint */}
        <div className='text-xs text-custom-200 italic'>
          More activity insights coming soon
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className='rounded-xl bg-white p-3 text-center shadow-xs'>
      <div className='text-lg font-semibold text-custom-400'>{value}</div>
      <div className='text-xs text-custom-200'>{label}</div>
    </div>
  );
}
