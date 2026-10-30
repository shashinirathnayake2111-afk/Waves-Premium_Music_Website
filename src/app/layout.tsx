import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/src/app/globals.css";
import { ModalProvider } from "@/src/context/ModalContext";
import { MusicProvider } from "@/src/context/MusicContext";
import CreatePlaylistModal from "@/src/components/CreatePlaylistModal";
import ClientLayout from "@/src/components/ClientLayout";

export const metadata: Metadata = {
  title: "Waves - Premiere Music Website",
  description: "Music Website with AI & Global Music Hub",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased bg-[#1e2639]">
        <ModalProvider>
          <MusicProvider>
            <CreatePlaylistModal />
            <ClientLayout>{children}</ClientLayout>
          </MusicProvider>
        </ModalProvider>
      </body>
    </html>
  );
}