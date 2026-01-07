import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { APPCONFIG } from "./config";
import { ToastProvider } from "@/lib/contexts/ToastContext";
import I18nProvider from "@/components/shared/I18nProvider";
import { bootstrapUI } from "@/modules/[core]/bootstrap/ui";
import { bootstrapPages } from "@/modules/[core]/bootstrap/pages";

bootstrapUI();
bootstrapPages();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <ToastProvider>
        <Analytics />
        <html lang="en">
          <title>{APPCONFIG.BUSINESS.name}</title>
          <body className="min-h-screen flex flex-col">{children}</body>
        </html>
      </ToastProvider>
    </I18nProvider>
  );
}
