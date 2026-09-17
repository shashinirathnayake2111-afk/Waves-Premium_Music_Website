"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MusicContextType {
  currentSong: any;
  isPlaying: boolean;
  playSong: (song: any) => void;
  togglePlay: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // 1️⃣ Page එක මුලින්ම Load වෙද්දී LocalStorage එකෙන් Data ලබාගැනීම
  useEffect(() => {
    const savedSong = localStorage.getItem('currentSong');
    if (savedSong) {
      try {
        setCurrentSong(JSON.parse(savedSong));
      } catch (error) {
        console.error("Error parsing saved song:", error);
      }
    }
  }, []);

  // 2️⃣ සින්දුවක් Select කළ විට LocalStorage එකේ Save කිරීම
  const playSong = (song: any) => {
    setCurrentSong(song);
    setIsPlaying(true);
    localStorage.setItem('currentSong', JSON.stringify(song)); // 💾 Save to localStorage
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, playSong, togglePlay }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};