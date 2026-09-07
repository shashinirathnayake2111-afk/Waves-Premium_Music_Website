import Link from "next/link";
import react, { useState } from "react";
import { FaBroadcastTower, FaPlay } from "react-icons/fa";

export default function Sidebar() {

  return (
    <div>
      <aside className="fixed left-2 top-15 bg-white/5 backdrop-blur-xl border border-[#091227]/10 w-90 h-[90vh] rounded-lg p-4 overflow-y-auto">

        <h2 className="font-semibold uppercase text-sm text-gray-300 tracking-wider mb-6 mt-4 px-3">
          Your Music Store
        </h2>

        <ul className="space-y-2 w-full">

          <div className="bg-gradient-to-r from-indigo-600/10 to-pink-600/10 w-full mb-6 border border-white/10 p-3.5 rounded-xl hover:bg-white/10 transition px-3">
            <div className="flex flex-col gap-4 mb-2">
              <span className="text-purple-200 text-xs font-semibold uppercase tracking-wide">
                Studying today?
              </span>

              {/* Subtitle */}
              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                Find the best music for your study and focus on your work.
              </p>

              {/* Button */}
              <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition shadow-md shadow-purple-900/40">
                <FaPlay className="text-[10px]" />
                <span>Start Vibe</span>
              </button>
            </div>
          </div>

          <li>
            <button className="w-full flex items-center justify-between px-5 py-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition">
              <span className="text-medium font-medium">Radio</span>
              <FaBroadcastTower className="w-5 h-5 text-purple-400" />
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
}