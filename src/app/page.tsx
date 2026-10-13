"use client";

import Navbar from "@/src/components/Navbar";
import MainContent from "@/src/components/MainContent";


export default function Home() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="flex-1 flex">

          <MainContent />
        </div>
      </main>
    </div>
  );
}