import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { APPCONFIG } from "./config";
import { ToastProvider } from "@/lib/contexts/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastProvider>
        <Analytics />
        <html lang='en'>
          <title>{APPCONFIG.BUSINESS.name}</title>
          <body className='min-h-screen flex flex-col'>{children}</body>
        </html>
      </ToastProvider>
    </>
  );
}
