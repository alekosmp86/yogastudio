"use client";

import { Roles } from "@/enums/Roles";
import { withRole } from "@/lib/withRole";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { AppProviders } from "@/lib/contexts/ComposeProviders";

function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <div className='bg-surface-app min-h-screen px-6 py-10'>
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
