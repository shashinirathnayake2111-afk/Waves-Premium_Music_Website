"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  const playSong = (song: any) => {
    setCurrentSong(song);
    setIsPlaying(true);
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