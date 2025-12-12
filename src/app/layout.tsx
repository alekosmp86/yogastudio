import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Analytics />
      <html lang='en'>
        <body className='min-h-screen flex flex-col'>{children}</body>
      </html>
    </>
  );
}
