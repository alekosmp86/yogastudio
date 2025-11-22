"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/shared/Container";
import { withLayoutAuth } from "@/lib/withLayoutAuth";
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

export default withLayoutAuth(CustomerLayout, Roles.CLIENT);
