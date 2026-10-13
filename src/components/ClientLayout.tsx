"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";
import MusicPlayer from "@/src/components/MusicPlayer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    return (
        <div className="flex flex-1 h-full overflow-hidden">
            {!isAuthPage && <Sidebar />}

            <div className="flex-1 flex flex-col h-full $">
                {!isAuthPage && <Navbar />}

                <main className="flex-1 pb-24">
                    {children}
                </main>
            </div>
            
            {!isAuthPage && <MusicPlayer />}
        </div>
    );
}