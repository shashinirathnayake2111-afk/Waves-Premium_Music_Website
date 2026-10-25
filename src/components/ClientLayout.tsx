"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";
import MusicPlayer from "@/src/components/MusicPlayer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      {!isAuthPage && <Navbar />}

      <div className="flex flex-1 min-h-0">
        {!isAuthPage && <Sidebar />}

        <main className="flex-1 min-w-0 overflow-y-auto pb-28 [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </main>
      </div>

      <MusicPlayer />
    </div>
  );
}