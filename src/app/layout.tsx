import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Container from "./components/shared/Container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Container>{children}</Container>
        </main>

        <Footer />
      </body>
    </html>
  );
}
