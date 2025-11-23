"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/shared/Container";
import { withRole } from "@/lib/withRole";
import { Roles } from "@/enums/Roles";

function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main className='flex-1'>
        <Container>{children}</Container>
      </main>

      <Footer />
    </>
  );
}

export default withRole(CustomerLayout, Roles.CLIENT);
