"use client";

import { Roles } from "@/enums/Roles";
import { withRole } from "@/lib/withRole";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { AppProviders } from "@/lib/contexts/ComposeProviders";
import ToastContainer from "@/components/shared/ToastContainer";

function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <div className='bg-theme-bg-3 min-h-screen px-6 py-6'>
        <div className='shadow-bottomonly pb-1'>
          <h1 className='text-3xl font-bold text-brand-500 mb-6'>
            Owner Dashboard
          </h1>
          <Breadcrumbs />
        </div>
        {children}
        <ToastContainer />
      </div>
    </AppProviders>
  );
}

export default withRole(OwnerLayout, Roles.OWNER);
