import type { Metadata, Viewport } from "next";
import { Comic_Neue, Pixelify_Sans, VT323 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const pixelify = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s :: Saurav Rijal's Home Page",
    default: "★ Welcome to Saurav Rijal's Home Page! ★",
  },
  description: "Portfolio of Saurav Rijal, a software engineer specializing in scalable APIs, microservices, web applications, and cloud infrastructure.",
  openGraph: {
    title: "Saurav Rijal — Software Engineer",
    description: "Portfolio of Saurav Rijal, a software engineer specializing in scalable APIs, microservices, web applications, and cloud infrastructure.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#008080" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth" className={`${pixelify.variable} ${comicNeue.variable} ${vt323.variable}`}>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="page">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
