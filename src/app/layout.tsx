import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/app/globals.css";
import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waves - Premiere Music Website",
  description: "Music Website with AI & Global Music Hub By Shasihini Rathnayake",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1e2639] flex h-screen overflow-hidden`}>
        <Sidebar />

        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}