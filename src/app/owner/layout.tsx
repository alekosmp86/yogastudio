"use client";

import OwnerHomePage from "@/components/owner/homepage/OwnerHomePage";

function OwnerLayout({ children }: { children: React.ReactNode }) {
  return <OwnerHomePage>{children}</OwnerHomePage>;
}

export default OwnerLayout;
