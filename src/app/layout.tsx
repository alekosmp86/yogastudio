// app/layout.tsx
import { AppProviders } from "@/lib/contexts/ComposeProviders";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <html lang='en'>
        <body className='min-h-screen flex flex-col'>{children}</body>
      </html>
    </AppProviders>
  );
}
