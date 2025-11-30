"use client";

import DashboardCard from "@/components/owner/dashboard/DashboardCard";
import { Calendar, Users, PlusCircle } from "lucide-react";

export default function OwnerDashboard() {
  return (
    <>
      <p className='text-brand-600 text-xl m-6'>
        Welcome! Choose an action to manage your yoga studio.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <DashboardCard
          title='Manage classes'
          description='Add, edit, or delete classes.'
          href='/owner/classes'
          icon={<PlusCircle size={40} />}
        />

        <DashboardCard
          title='Manage schedule'
          description='Manage recurring weekly classes.'
          href='/owner/schedule'
          icon={<Calendar size={40} />}
        />

        <DashboardCard
          title='Manage users'
          description='View and manage your users list.'
          href='/owner/users'
          icon={<Users size={40} />}
        />
      </div>
    </>
  );
}
