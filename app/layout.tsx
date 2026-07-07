import type { Metadata } from "next";
import { EB_Garamond, Inter, Open_Sans } from "next/font/google";
import Navbar from "./components/Navbar/page";
import "./globals.css";
import Footer from "./components/Footer/page";
import { LanguageProvider } from "./context/LanguageContext";
import AboutInfo from "./components/AboutInfo/page";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Nepali Stamps",
  description: "Informational WebSite for Phiatic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-full bg-brand-bg">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
