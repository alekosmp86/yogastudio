"use client";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { AppProviders } from "@/lib/contexts/ComposeProviders";
import ToastContainer from "@/components/shared/ToastContainer";
import Button from "@/components/shared/Button";
import { Power } from "lucide-react";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { useRouter } from "next/navigation";

function OwnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await http.post("/auth/logout", ApiType.FRONTEND);
    router.push("/login");
  };

  return (
    <AppProviders>
      <div className='bg-theme-bg-3 min-h-screen px-6 py-6'>
        <div className='shadow-bottomonly pb-1'>
          <h1 className='text-3xl font-bold text-brand-500 mb-6'>
            Owner Dashboard
          </h1>
          <div className='flex justify-between items-center'>
            <Breadcrumbs />
            <Button
              variant='ghost'
              className='underline hover:scale-110 transition-transform'
              onClick={handleLogout}
            >
              <Power className='w-5 h-5 mr-1'/> Logout
            </Button>
          </div>
        </div>
        {children}
        <ToastContainer />
      </div>
    </AppProviders>
  );
}

export default OwnerLayout;
