import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saurav Rijal — Backend Developer",
  description: "Portfolio of Saurav Rijal — Backend Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>
          <Navbar />
          <main style={{ paddingTop: '6rem', flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingBottom: '4rem', minHeight: 'calc(100vh - 6rem)' }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
