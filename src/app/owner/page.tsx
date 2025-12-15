"use client";

import DashboardCard from "@/components/owner/dashboard/DashboardCard";
import { DashboardItems } from "@/components/owner/dashboard/DashboardItems";

export default function OwnerDashboard() {
  return (
    <>
      <p className='text-white text-xl mt-6 mb-6'>
        Welcome! Choose an action to manage your studio.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
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
    </>
  );
}
