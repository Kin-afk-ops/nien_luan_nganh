"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./grid.css";

import "../icon/fontawesome/css/all.min.css";
import { Providers } from "@/lib/Providers";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import HeaderWrapper from "@/components/header/wrapHeader";
import Header from "@/components/header/Header";
import HeaderLogged from "@/components/header/HeaderLogged";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Lấy pathname thay vì useRouter
  const isAdminPage = pathname?.startsWith("/admin");
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {!isAdminPage && <HeaderWrapper />}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
            }}
          />
          {children}
          {!isAdminPage && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
