import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/app/globals.css";
import { ModalProvider } from '@/src/context/ModalContext';
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import { MusicProvider } from '@/src/context/MusicContext';
import ClientLayout from "@/src/components/ClientLayout";

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
      <body className="antialiased bg-[#1e2639] flex h-screen overflow-hidden relative">
        <ModalProvider>
          <MusicProvider>
            <CreatePlaylistModal />
            <ClientLayout>
                {children}
              </ClientLayout>
          </MusicProvider>
        </ModalProvider>
      </body>
    </html>
  );
}