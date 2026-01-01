import ToastContainer from "../../shared/ToastContainer";
import { AppProviders } from "@/lib/contexts/ComposeProviders";
import OwnerHomePageHeader from "./OwnerHomePageHeader";
import Container from "@/components/shared/Container";

export default function OwnerHomePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <div className="min-h-screen bg-custom-100 text-custom-400">
        <Container className="flex flex-col min-h-screen">
          <OwnerHomePageHeader />

          {/* CONTENT */} 
          <main className="relative z-10 -mt-6 flex-1 bg-custom-50 px-4 pb-10 pt-6 bg-gradient-to-b from-custom-200 to-custom-400">
            {children}
          </main>

          <ToastContainer />
        </Container>
      </div>
    </AppProviders>
  );
}
