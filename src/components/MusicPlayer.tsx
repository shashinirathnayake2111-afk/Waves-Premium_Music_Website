'use client'

import React, { useState } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute, FaHeart, FaRegHeart, FaChevronUp, FaChevronDown, FaRandom, FaRedo } from 'react-icons/fa';
import { useMusic } from '@/src/context/MusicContext';

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const {
    currentSong, isPlaying, currentTime, duration, volume, isMuted, isShuffle, isRepeat, error,
    togglePlay, nextSong, previousSong, seek, setVolume, toggleMute, toggleShuffle, toggleRepeat,
  } = useMusic();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!currentSong) return null;

  const safeDuration = duration > 0 ? duration : 0;

  const seekBar = (
    <div className="w-full flex items-center gap-2 text-[10px] sm:text-xs text-white/50">
      <span className="w-9 text-right tabular-nums">{formatTime(currentTime)}</span>
      <input type="range" min={0} max={safeDuration} step={1}
        value={Math.min(currentTime, safeDuration)}
        onChange={(e) => seek(Number(e.target.value))}
        disabled={safeDuration === 0}
        aria-label="Seek"
        className="flex-1 h-1.5 accent-purple-400 cursor-pointer disabled:opacity-40 disabled:cursor-default" />
      <span className="w-9 tabular-nums">{formatTime(safeDuration)}</span>
    </div>
  );

  return (
    <div className={`fixed bottom-5 left-4 right-4 lg:left-80 max-w-5xl mx-auto bg-slate-900/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-3 sm:px-6 z-50 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out ${
      isExpanded ? 'h-36 flex-col justify-between' : 'h-20 flex items-center justify-between'}`}>

      <div className="flex items-center justify-between w-full gap-4">

        {/* Song info */}
        <div className="flex items-center gap-3 w-1/3 min-w-0">
          <div className="relative group shrink-0">
            <img src={currentSong.coverImage} alt=""
              className="w-12 h-12 rounded-2xl object-cover border border-white/20 shadow-lg group-hover:scale-105 transition duration-300" />
          </div>

          <div className="overflow-hidden">
            <h4 className="text-base font-semibold truncate text-white/90">{currentSong.title}</h4>
            {error ? (
              <p role="status" className="text-sm text-amber-300 truncate">{error}</p>
            ) : (
              <p className="text-sm text-white/60 truncate">{currentSong.artist}</p>
            )}
          </div>

          <button onClick={() => setIsLiked(!isLiked)} aria-label={isLiked ? 'Unlike song' : 'Like song'} aria-pressed={isLiked}
            className="text-white/40 hover:text-pink-500 transition ml-1 cursor-pointer hidden md:block">
            {isLiked ? <FaHeart className="text-pink-500 text-sm" /> : <FaRegHeart className="text-sm" />}
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1.5 w-1/3 max-w-xs">
          <div className="flex items-center gap-3 sm:gap-5">
            <button onClick={toggleShuffle} aria-label="Shuffle" aria-pressed={isShuffle}
              className={`transition text-xs sm:text-sm cursor-pointer ${isShuffle ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : 'text-white/40 hover:text-white'}`}>
              <FaRandom />
            </button>

            <button onClick={previousSong} aria-label="Previous song" className="text-white/60 hover:text-white transition text-xs sm:text-sm cursor-pointer">
              <FaStepBackward />
            </button>

            <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition cursor-pointer">
              {isPlaying ? <FaPause className="text-xs sm:text-sm" /> : <FaPlay className="ml-0.5 text-xs sm:text-sm" />}
            </button>

            <button onClick={nextSong} aria-label="Next song" className="text-white/60 hover:text-white transition text-xs sm:text-sm cursor-pointer">
              <FaStepForward />
            </button>

            <button onClick={toggleRepeat} aria-label="Repeat" aria-pressed={isRepeat}
              className={`transition text-xs sm:text-sm cursor-pointer ${isRepeat ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : 'text-white/40 hover:text-white'}`}>
              <FaRedo />
            </button>
          </div>

          {!isExpanded && seekBar}
        </div>

        {/* Volume and expand */}
        <div className="flex items-center justify-end gap-3 w-1/3 min-w-0">
          <button onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="text-white/60 hover:text-white transition text-sm cursor-pointer">
            {isMuted || volume === 0 ? <FaVolumeMute className="text-red-400" /> : <FaVolumeUp />}
          </button>

          <input type="range" min={0} max={100}
            value={isMuted ? 0 : Math.round(volume * 100)}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            aria-label="Volume"
            className="w-16 sm:w-20 h-1 accent-purple-400 rounded-lg cursor-pointer" />

          <button onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
            className="text-white/40 hover:text-white transition ml-2 cursor-pointer hidden sm:block">
            {isExpanded ? <FaChevronDown className="text-xs" /> : <FaChevronUp className="text-xs" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="w-full pt-3 border-t border-white/10">
          {seekBar}
        </div>
      )}
    </div>
  );
}