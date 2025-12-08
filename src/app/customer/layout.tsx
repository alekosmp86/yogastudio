"use client";

import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/customer/Footer";
import Container from "@/components/shared/Container";

function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main className='flex-1 bg-theme-bodybg'>
        <Container>{children}</Container>
      </main>

      <Footer />
    </>
  );
}

export default CustomerLayout;
