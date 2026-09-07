import Link from "next/link";
import react, { useEffect, useState } from "react";
import { FaBroadcastTower, FaPlay, FaSmile, FaCloudRain, FaCoffee, FaSpa } from "react-icons/fa";

export default function Sidebar() {

  const vibeCards = [
    {
      question: "Studying today?",
      description: "Find the best music for your study and focus on your work.",
      buttonText: "Start Vibe",
      styles: {
        gradient: "from-purple-900/40 to-indigo-900/40 border-purple-500/30",
        buttonBg: "bg-purple-600 hover:bg-purple-700",
        shadow: "shadow-purple-900/40"
      }
    },
    {
      question: "Hitting the Gym?",
      description: "High-tempo beats to push your limits and keep moving.",
      buttonText: "Get Hyped",
      styles: {
        gradient: "from-pink-900/40 to-fuchsia-900/40 border-pink-500/30",
        buttonBg: "bg-pink-600 hover:bg-pink-700",
        shadow: "shadow-pink-900/40"
      }
    },
    {
      question: "Time to Relax?",
      description: "Soothing soundscapes and lofi tracks to help you de-stress.",
      buttonText: "Relax Now",
      styles: {
        gradient: "from-blue-900/40 to-cyan-900/40 border-blue-500/30",
        buttonBg: "bg-blue-600 hover:bg-blue-700",
        shadow: "shadow-blue-900/40"
      }
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % vibeCards.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const feelingOptions = [
    { name: "Happy", icon: FaSmile, color: "hover:border-pink-500/50 hover:bg-pink-500/10" },
    { name: "Sad", icon: FaCloudRain, color: "hover:border-blue-500/50 hover:bg-blue-500/10" },
    { name: "Chill", icon: FaCoffee, color: "hover:border-emerald-500/50 hover:bg-emerald-500/10" },
    { name: "Stressed", icon: FaSpa, color: "hover:border-purple-500/50 hover:bg-purple-500/10" },
  ];


  return (
    <div>
      <aside className="fixed left-2 top-15 bg-white/5 backdrop-blur-xl border border-[#091227]/10 w-90 h-[90vh] rounded-lg p-4 overflow-y-auto">

        <h2 className="font-semibold uppercase text-sm text-gray-300 tracking-wider mb-6 mt-4 px-3">
          Your Music Store
        </h2>

        <ul className="space-y-2 w-full">

          <div className={`bg-linear-to-r ${vibeCards[currentIndex].styles.gradient} w-full mb-8 border border-white/10 p-3.5 rounded-xl hover:from-indigo-700/30 hover:to-pink-700/30 transition px-4 py-3`}>
            <div className="flex flex-col gap-4 mb-2">
              <span className="text-purple-200 text-xs font-semibold uppercase tracking-wide">
                {vibeCards[currentIndex].question}
              </span>

              {/* Subtitle */}
              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                {vibeCards[currentIndex].description}
              </p>

              {/* Button */}
              <button className={`flex items-center justify-center gap-2 ${vibeCards[currentIndex].styles.buttonBg} ${vibeCards[currentIndex].styles.shadow} text-white text-xs font-medium px-3 py-2 rounded-lg transition shadow-md w-full`}>
                <FaPlay className="text-[10px]" />
                <span>{vibeCards[currentIndex].buttonText}</span>
              </button>
            </div>
          </div>

          {/* Mood Selector Section */}
          <div className="mt-6 mb-6">
            <h3 className="font-semibold uppercase text-xs text-gray-400 tracking-wider mb-3 px-3">
              How are you feeling?
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {feelingOptions.map((feeling, index) => {
                const IconComponent = feeling.icon;
                return (
                  <button
                    key={index}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-gray-300 transition-all ${feeling.color}`}
                  >
                    <IconComponent className="text-sm" />
                    <span>{feeling.name}</span>
                  </button>
                );
              })}
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