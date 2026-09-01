import react from "react";

export default function Sidebar() {
  return (
    <div>
        <aside className= "fixed left-2 top-15 bg-white/5 backdrop-blur-xl border border-[#091227]/10 w-90 h-[90vh] rounded-lg p-2 overflow-y-auto">
        <div className="flex justify-between text-white items-centre p-2 mb-4"></div>
        </aside>
    </div>
  );
}