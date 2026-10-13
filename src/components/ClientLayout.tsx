"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/src/components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {!isAuthPage && <Sidebar />}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}