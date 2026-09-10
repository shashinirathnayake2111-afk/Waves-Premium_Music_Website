"use client";

import { useState, useRef } from "react";
import Navbar from "@/src/components/Navbar";
import Sidebar from "@/src/components/Sidebar";
import MainContent from "@/src/components/MainContent";


export default function Home() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="flex-1 flex">
          <Sidebar />
          <MainContent />
        </div>
      </main>
    </div>
  );
}