// app/layout.tsx
import { ToastProvider } from "@/components/shared/Toast";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <html lang='en'>
        <body className='min-h-screen flex flex-col'>{children}</body>
      </html>
    </ToastProvider>
  );
}
