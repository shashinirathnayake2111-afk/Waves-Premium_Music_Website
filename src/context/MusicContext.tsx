"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverImage: string;
  audioUrl?: string;
  duration?: string;    
  currentTime?: string;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

useEffect(() => {
    const savedSong = sessionStorage.getItem('currentSong');
    if (savedSong) {
      try {
        setCurrentSong(JSON.parse(savedSong));
      } catch (error) {
        console.error("Error loading saved song:", error);
      }
    }
  }, []);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    sessionStorage.setItem('currentSong', JSON.stringify(song));
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