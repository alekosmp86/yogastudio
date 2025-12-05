"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/shared/Container";

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

export default CustomerLayout;
