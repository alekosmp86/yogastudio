"use client";

import { Roles } from "@/enums/Roles";
import { withRole } from "@/lib/withRole";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { AppProviders } from "@/lib/contexts/AppProviders";

function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <div className='min-h-screen px-6 py-10 bg-brand-800'>
        <h1 className='text-3xl font-bold text-brand-500 mb-6'>
          Owner Dashboard
        </h1>
        <Breadcrumbs />
        {children}
      </div>
    </AppProviders>
  );
}

export default withRole(OwnerLayout, Roles.OWNER);
