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
  playSong: (song: Song, playlist?: Song[]) => void; 
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const savedSong = sessionStorage.getItem('currentSong');
    if (savedSong) {
      try {
        const song = JSON.parse(savedSong);
        setCurrentSong(song);
        setQueue([song]);
      } catch (error) {
        console.error("Error loading saved song:", error);
      }
    }
  }, []);

  const playSong = (song: Song, playlist?: Song[]) => {
    if (playlist && playlist.length > 0) {
      setQueue(playlist);
      const index = playlist.findIndex((s) => s.id === song.id);
      setCurrentIndex(index !== -1 ? index : 0);
    } else {
      setQueue([song]);
      setCurrentIndex(0);
    }

    setCurrentSong(song);
    setIsPlaying(true);
    sessionStorage.setItem('currentSong', JSON.stringify(song));
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const nextSong = () => {
    if (queue.length > 0 && currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentSong(queue[nextIndex]);
      setIsPlaying(true);
      sessionStorage.setItem('currentSong', JSON.stringify(queue[nextIndex]));
    }
  };

  const previousSong = () => {
    if (queue.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(queue[prevIndex]);
      setIsPlaying(true);
      sessionStorage.setItem('currentSong', JSON.stringify(queue[prevIndex]));
    }
  };

  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, playSong, togglePlay, nextSong, previousSong }}>
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