'use client'

import React, { useState } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute, FaHeart, FaRegHeart, FaChevronUp, FaChevronDown, FaRandom, FaRedo } from 'react-icons/fa';
import { useMusic } from '@/src/context/MusicContext';

interface MusicPlayerProps {
  currentSong: {
    title: string;
    artist: string;
    cover: string;
    duration: string;
    currentTime: string;
  };
}

export default function MusicPlayer() {
  const { currentSong, isPlaying, togglePlay } = useMusic();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(70);
  const [progress, setProgress] = useState<number>(35);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  if (!currentSong) return null;

  return (
    <div className={`fixed bottom-5 left-4 right-4 md:left-72 max-w-5xl mx-auto 
        bg-slate-900/40 backdrop-blur-2xl border border-white/20 
        rounded-3xl p-3 sm:px-6 z-50 text-white 
        shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out ${isExpanded ? 'h-36 flex-col justify-between' : 'h-20 flex items-center justify-between'
      }`}>

      <div className="flex items-center justify-between w-full gap-4">

        <div className="flex items-center gap-3 w-1/3 min-w-45px">
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            <button onClick={() => setIsExpanded(!isExpanded)}
              className="w-3 h-3 bg-emerald-500/80 hover:bg-emerald-500 rounded-full cursor-pointer shadow-inner transition flex items-center justify-center"
              title="Toggle View" />
          </div>

          <div className="relative group shrink-0">
            <img src={currentSong.coverImage} alt={currentSong.title}
              className="w-12 h-12 rounded-2xl object-cover border border-white/20 shadow-lg group-hover:scale-105 transition duration-300" />
            <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition" />
          </div>

          <div className="overflow-hidden">
            <h4 className="text-base font-semibold truncate hover:underline cursor-pointer text-white/90">
              {currentSong.title}
            </h4>
            <p className="text-sm text-white/60 truncate">
              {currentSong.artist}
            </p>
          </div>

          <button onClick={() => setIsLiked(!isLiked)}
            className="text-white/40 hover:text-pink-500 transition ml-1 cursor-pointer hidden md:block -mt-4" >
            {isLiked ? <FaHeart className="text-pink-500 text-sm" /> : <FaRegHeart className="text-sm" />}
          </button>
        </div>

        <div className="flex flex-col items-center gap-1.5 w-1/3 max-w-xs">
          <div className="flex items-center gap-3 sm:gap-5">

            <button onClick={() => setIsShuffle(!isShuffle)}
              className={`transition text-xs sm:text-sm cursor-pointer ${isShuffle ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : 'text-white/40 hover:text-white'
                }`}
              title="Shuffle" >
              <FaRandom />
            </button>

            <button className="text-white/60 hover:text-white transition text-xs sm:text-sm cursor-pointer">
              <FaStepBackward />
            </button>

            <button onClick={togglePlay}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition cursor-pointer" >
              {isPlaying ? <FaPause className="text-xs sm:text-sm" /> : <FaPlay className="ml-0.5 text-xs sm:text-sm" />}
            </button>

            <button className="text-white/60 hover:text-white transition text-xs sm:text-sm cursor-pointer">
              <FaStepForward />
            </button>

            <button onClick={() => setIsRepeat(!isRepeat)}
              className={`transition text-xs sm:text-sm cursor-pointer ${isRepeat ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : 'text-white/40 hover:text-white'
                }`}
              title="Repeat">
              <FaRedo />
            </button>

          </div>

          {!isExpanded && (
            <div className="w-full flex items-center gap-2 text-[10px] sm:text-xs text-white/50">
              <span>{currentSong.currentTime || "0:00"}</span>
              <div className="relative flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setProgress((clickX / rect.width) * 100);
                }}>
                <div className="h-full bg-linear-to-r from-purple-500 to-pink-500 group-hover:from-purple-400 group-hover:to-pink-400 transition-all rounded-full"
                  style={{ width: `${progress}%` }} />
              </div>
              <span>{currentSong.duration}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 w-1/3 min-w-30px">
          <button onClick={() => setIsMuted(!isMuted)}
            className="text-white/60 hover:text-white transition text-sm cursor-pointer">
            {isMuted || volume === 0 ? <FaVolumeMute className="text-red-400" /> : <FaVolumeUp />}
          </button>

          <input type="range" min="0" max="100" value={isMuted ? 0 : volume} onChange={(e) => {
            setVolume(Number(e.target.value));
            setIsMuted(false);
          }}
            className="w-16 sm:w-20 h-1 bg-white/20 accent-purple-400 rounded-lg cursor-pointer" />

          <button onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/40 hover:text-white transition ml-2 cursor-pointer hidden sm:block"
            title={isExpanded ? "Collapse View" : "Expand View"}>
            {isExpanded ? <FaChevronDown className="text-xs" /> : <FaChevronUp className="text-xs" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="w-full pt-3 border-t border-white/10 flex items-center gap-3 text-xs text-white/60 animate-fadeIn">
          <span>{currentSong.currentTime}</span>
          <div className="relative flex-1 h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress((clickX / rect.width) * 100);
            }}>
            <div className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all"
              style={{ width: `${progress}%` }} />
          </div>
          <span>{currentSong.duration}</span>
        </div>
      )}
    </div>
  );
}