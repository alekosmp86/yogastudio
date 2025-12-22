import ToastContainer from "../shared/ToastContainer";
import Breadcrumbs from "../shared/Breadcrumbs";
import { AppProviders } from "@/lib/contexts/ComposeProviders";
import Button from "../shared/Button";
import { useRouter } from "next/navigation";
import { removeSession } from "@/lib/utils/utils";
import LogoutButton from "../shared/LogoutButton";
import Container from "../shared/Container";

export default function OwnerHomePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await removeSession();
    router.push("/login");
  };

  return (
    <AppProviders>
      <div className='bg-theme-headings min-h-screen px-6 py-6'>
        <div className='shadow-bottomonly shadow-white pb-1'>
          <Container>
            <h1 className='text-3xl font-bold text-white mb-6'>
              Owner Dashboard
            </h1>
            <div className='flex justify-between items-center'>
              <Breadcrumbs />
              <Button
                variant='ghost'
                className='underline hover:scale-110 transition-transform text-white'
                onClick={handleLogout}
              >
                <LogoutButton className='w-5 h-5 mr-1' /> Logout
              </Button>
            </div>
          </Container>
        </div>
        <Container>{children}</Container>
        <ToastContainer />
      </div>
    </AppProviders>
  );
}
