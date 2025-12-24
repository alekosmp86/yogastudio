import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/customer/Footer";
import Container from "@/components/shared/Container";
import CustomerClientWrapper from "@/components/customer/CustomerClientWrapper";
import ToastContainer from "@/components/shared/ToastContainer";
import { AppPreferencesProvider } from "@/lib/contexts/AppPreferencesContext";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppPreferencesProvider>
      <Navbar />
      <main className='flex-1 bg-theme-bodybg'>
        <Container>
          <CustomerClientWrapper>
            {children}
            <ToastContainer />
          </CustomerClientWrapper>
        </Container>
      </main>
      <Footer />
    </AppPreferencesProvider>
  );
}
