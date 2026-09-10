import Link from "next/link";
import react, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaSmile, FaCloudRain, FaCoffee, FaSpa } from "react-icons/fa";
import { FaRadio, FaPlus, FaPodcast, FaUser } from "react-icons/fa6";

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

  const router = useRouter();
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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [myPlaylists, setMyPlaylists] = useState<string[]>([]);
  const [isGuest, setIsGuest] = useState(true);

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      setMyPlaylists((prev) => [...prev, playlistName.trim()]);
      console.log("New Playlist Created:", playlistName.trim());

      setPlaylistName("");
      setIsCreateModalOpen(false);
    }
  };

  return (
    <div>
      <aside className="relative left-2 top-15 w-90 h-[82vh] flex flex-col gap-3 flex-shrink-0">

        <div className=" bg-white/5 backdrop-blur-xl border border-[#091227]/10 rounded-lg p-4 overflow-y-auto flex-1 flex flex-col justify-between">

          <div>
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
                  <button className={`flex items-center justify-center gap-2 ${vibeCards[currentIndex].styles.buttonBg} ${vibeCards[currentIndex].styles.shadow} text-white text-sm font-medium px-3 py-2 rounded-lg transition shadow-md w-full`}>
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

              <li className="">
                <button
                  onClick={() => router.push('/radio')}
                  className="flex items-center justify-between gap-3 w-full p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  <span>Radio</span>
                  <FaRadio className="text-grey-400 text-sm" />
                </button>
              </li>

              <li className="">
                <button
                  onClick={() => router.push('/podcasts')}
                  className="flex items-center justify-between gap-3 w-full p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium mb-6"
                >
                  <span>Podcasts</span>
                  <FaPodcast className="text-grey-400 text-sm" />
                </button>
              </li>
            </ul>

            <div className="mt-auto pt-4 border-t border-white/10">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center justify-between gap-2 w-full p-3 mt-2 rounded-xl bg-linear-to-r from-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-900/30 active:scale-[0.98]"
              >
                <span>Create Playlist</span>
                <FaPlus className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </aside >

      <aside>
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 flex items-center justify-between fixed left-2 top-[92vh] w-90">
          {isGuest ? (
            <div className="flex items-center justify-between w-full px-2 py-1 text-xs text-gray-400">
              <span className="flex items-center gap-2">
                <FaUser className="text-purple-400 text-xs" /> Guest
              </span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                Limited
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-600 to-pink-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white">Navod</span>
                <span className="text-[10px] text-gray-400">Pro Listener</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Create New Playlist</h3>

            <div>
              <label className="text-xs text-gray-400 mb-3 block">Playlist Name</label>
              <input
                type="text"
                placeholder="My Awesome Playlist..."
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-all text-sm"
                autoFocus
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => {
                  setPlaylistName("");
                  setIsCreateModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleCreatePlaylist}
                className="px-5 py-2 rounded-xl text-sm bg-linear-to-r from-indigo-600 to-pink-600 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-purple-900/30"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}