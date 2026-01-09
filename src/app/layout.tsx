import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { APPCONFIG } from "./config";
import { ToastProvider } from "@/lib/contexts/ToastContext";
import I18nProvider from "@/components/shared/I18nProvider";
import { ModuleUIBootstrap } from "@/modules/[core]/bootstrap/ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <ToastProvider>
        <Analytics />
        <html lang='en'>
          <title>{APPCONFIG.BUSINESS.name}</title>
          <body className='h-full min-h-screen flex flex-col'>
            <ModuleUIBootstrap>{children}</ModuleUIBootstrap>
          </body>
        </html>
      </ToastProvider>
    </I18nProvider>
  );
}
