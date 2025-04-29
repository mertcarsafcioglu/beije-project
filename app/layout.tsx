import "../styles/globals.css";
import Providers from "../pages/providers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavbarCart from "@/components/NavbarCart";

export const metadata = {
  title: "Beije Login",
  description: "Login page recreated with Next.js, MUI, Redux, TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <Navbar>
            <NavbarCart />
          </Navbar>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
