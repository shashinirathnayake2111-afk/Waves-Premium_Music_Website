"use client";


import { useState, useRef } from "react";
import Navbar from "@/src/components/Navbar";
import Sidebar from "../components/Sidebar";


export default function Home() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Sidebar />
      </main>
    </div>
  );
}