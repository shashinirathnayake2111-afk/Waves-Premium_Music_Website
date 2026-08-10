"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quicksand } from 'next/font/google';
import { MdHomeFilled } from "react-icons/md";
import { GoSearch } from "react-icons/go";

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['600', '700'],
});

interface Song {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string;
}

const MOCK_SONGS: Song[] = [
  {
    id: "1",
    title: "Acoustic Breeze",
    artist: "Benjamin Tissot",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverUrl: "https://picsum.photos/id/10/200/200",
  },
  {
    id: "2",
    title: "Urban Pulse",
    artist: "Creative Sounds",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverUrl: "https://picsum.photos/id/20/200/200",
  },
  {
    id: "3",
    title: "Electronic Vibe",
    artist: "Synth Master",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverUrl: "https://picsum.photos/id/30/200/200",
  },
];

export default function Home() {
  const [songs] = useState<Song[]>(MOCK_SONGS);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleDownload = async (audioUrl: string, title: string) => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen">

      <nav className="h-15 flex justify-between items-center px-6 fixed top-0 left-0 w-full bg-[#1e2639] border-b border-slate-800 z-100">
        <div className="flex gap-6 items-center">
          <Image src="/images/logo.png" alt="logo" width={80} height={80} className="w-13 h-10 rounded-full" />
          <span className={`-ml-5 text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent uppercase ${quicksand.className}`}>Waves</span>
        </div>

        <div className="bg-slate-800/60 flex items-center w-90 h-10 px-3 gap-3 text-white text-base rounded-full border border-slate-700/50 mr-auto ml-16 transition-all duration-200">
          <GoSearch className="text-white shrink-0"/>
          <input className="h-full w-full outline-none placeholder:text-slate-400 bg-transparent" type="text" placeholder="What do you want to play?"/> 
        </div>

        <div className="flex gap-4 items-center">
          <Link href="/" className="bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white w-10 h-10 grid place-items-center text-2xl rounded-full border border-slate-700/50 transition-all duration-200" title="Home">
          <MdHomeFilled/>
          </Link>
        </div>
      </nav>

      {/*<main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-12 bg-[#0b0f19] text-slate-100 pb-36">
      {/* Dynamic Header with Gradient Accent 🌈 */}
      {/*<header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-indigo-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
          🎙️ Sonora Waves
        </h1>
        <p className="text-slate-400 font-medium">Your Premium AI & Global Music Hub</p>
      </header>

      {/* Main Songs Container with Card Styling 🎧 */}
      {/*<div className="w-full max-w-3xl bg-[#161e2e] p-6 rounded-2xl shadow-2xl border border-slate-800/80">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
          <h2 className="text-2xl font-bold tracking-wide text-indigo-300 flex items-center gap-2">
            Trending Tracks 🎶
          </h2>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 font-semibold">
            {songs.length} Available
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {songs.map((song) => {
            const isSelected = currentSong?.id === song.id;
            return (
              <div
                key={song.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? "neon-glow bg-[#1f2a3f]"
                    : "bg-[#1f2a3f]/40 hover:bg-[#1f2a3f] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-14 h-14 rounded-lg object-cover shadow-md"
                    />
                    {isSelected && isPlaying && (
                      <div className="absolute inset-0 bg-indigo-600/40 rounded-lg flex items-center justify-center">
                        <span className="animate-pulse text-xl">🎵</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-lg ${isSelected ? "text-cyan-400" : "text-white"}`}>
                      {song.title}
                    </h3>
                    <p className="text-sm text-slate-400">{song.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlaySong(song)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md flex items-center gap-2 ${
                      isSelected && isPlaying
                        ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white animate-pulse"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {isSelected && isPlaying ? "Playing 🔊" : "Play ▶️"}
                  </button>

                  <button
                    onClick={() => handleDownload(song.audioUrl, song.title)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2.5 rounded-full transition border border-slate-700"
                    title="Download Song"
                  >
                    📥
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Glassmorphism Player Bar 🔮 */}
      {/*{currentSong && (
        <div className="fixed bottom-0 left-0 right-0 glass-player p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between px-8 gap-4 z-50">
          <audio
            ref={audioRef}
            src={currentSong.audioUrl}
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleNext}
          />

          {/* Song Details */}
          {/*<div className="flex items-center gap-4 w-full md:w-1/3">
            <img
              src={currentSong.coverUrl}
              alt={currentSong.title}
              className="w-14 h-14 rounded-xl object-cover border border-slate-600 shadow-md"
            />
            <div>
              <h4 className="font-bold text-indigo-300 text-base">{currentSong.title}</h4>
              <p className="text-xs text-slate-400 font-medium">{currentSong.artist}</p>
            </div>
          </div>

          {/* Player Controls */}
          {/*<div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              className="text-slate-400 hover:text-white text-2xl transition transform active:scale-95"
            >
              ⏮️
            </button>
            <button
              onClick={togglePlayPause}
              className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white p-3.5 rounded-full text-xl transition shadow-lg transform active:scale-95"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button
              onClick={handleNext}
              className="text-slate-400 hover:text-white text-2xl transition transform active:scale-95"
            >
              ⏭️
            </button>
          </div>

          {/* Download Action */}
          {/*<div className="w-full md:w-1/3 flex justify-end">
            <button
              onClick={() => handleDownload(currentSong.audioUrl, currentSong.title)}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition border border-slate-700 flex items-center gap-2 shadow-sm"
            >
              <span>Download</span> 📥
            </button>
          </div>
        </div>
      )}
    </main>*/}
    </div>
  );
}