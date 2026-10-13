"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";
import MusicPlayer from "@/src/components/MusicPlayer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isAuthPage
          ? "overflow-hidden [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          : "overflow-y-auto"
      }`}
    >
      {!isAuthPage && <Navbar />}

      <div className="flex flex-1 h-full overflow-hidden">
        {!isAuthPage && <Sidebar />}

        <main className="flex-1 pb-24 overflow-y-auto">
          {children}
        </main>
      </div>

      <MusicPlayer />
    </div>
  );
}