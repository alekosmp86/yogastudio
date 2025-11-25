"use client";

import DashboardCard from "@/components/owner/dashboard/DashboardCard";
import { Calendar, Users, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { GymClass } from "@/types/classes/GymClass";
import { useClasses } from "@/lib/contexts/ClassesContext";

export default function OwnerDashboard() {
  const { addClasses } = useClasses();
  useEffect(() => {
    const fetchClasses = async () => {
      const data: GymClass[] = await http.get(
        "/owner/classes",
        ApiType.FRONTEND
      );
      addClasses(data);
    };
    fetchClasses();
  }, [addClasses]);
  
  return (
    <>
      <p className='text-[#2A7A9D] mb-10'>
        Welcome! Choose an action to manage your yoga studio.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <DashboardCard
          title='Create Class'
          description='Add a new class template.'
          href='/owner/classes'
          icon={<PlusCircle size={40} />}
        />

        <DashboardCard
          title='Weekly Schedule'
          description='Manage recurring weekly classes.'
          href='/owner/schedule'
          icon={<Calendar size={40} />}
        />

        <DashboardCard
          title='Customers'
          description='View and manage your customer list.'
          href='/owner/customers'
          icon={<Users size={40} />}
        />
      </div>
    </>
  );
}
