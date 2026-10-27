"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Song } from '@/src/types/music';

// Re-export so older files that import { Song } from MusicContext keep working
export type { Song };

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number; // 0 to 1
  isMuted: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  error: string | null;
  playSong: (song: Song, playlist?: Song[]) => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  seek: (seconds: number) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Refs hold values the audio event handlers need (avoids stale closures)
  const queueRef = useRef<Song[]>([]);
  const indexRef = useRef(0);
  const currentIdRef = useRef<string | null>(null);
  const autoPlayRef = useRef(false);
  const shuffleRef = useRef(false);
  const repeatRef = useRef(false);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore the last song (loaded, but NOT auto-played)
  useEffect(() => {
    const saved = sessionStorage.getItem('currentSong');
    if (!saved) return;
    try {
      const song: Song = JSON.parse(saved);
      queueRef.current = [song];
      indexRef.current = 0;
      currentIdRef.current = song.id;
      setCurrentSong(song);
    } catch (err) {
      console.error('Error loading saved song from sessionStorage:', err);
    }
  }, []);

  // Load the audio whenever the current song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    setError(null);
    setCurrentTime(0);
    setDuration(currentSong.duration ?? 0);

    if (!currentSong.audioUrl) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      autoPlayRef.current = false;
      setError('No audio for this song yet');
      return;
    }

    audio.src = currentSong.audioUrl;
    if (autoPlayRef.current) {
      autoPlayRef.current = false;
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentSong]);

  // Keep volume / mute in sync with the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // Start a song (or restart it if it is already the current one)
  const startSong = (song: Song) => {
    const audio = audioRef.current;
    sessionStorage.setItem('currentSong', JSON.stringify(song));

    if (audio && currentIdRef.current === song.id && audio.getAttribute('src')) {
      audio.currentTime = 0;
      audio.play().catch(() => setIsPlaying(false));
      return;
    }

    currentIdRef.current = song.id;
    autoPlayRef.current = true;
    setCurrentSong(song);
  };

  const pickNextIndex = (): number => {
    const queue = queueRef.current;
    const i = indexRef.current;
    if (queue.length === 0) return -1;

    if (shuffleRef.current && queue.length > 1) {
      let random = i;
      while (random === i) random = Math.floor(Math.random() * queue.length);
      return random;
    }
    if (i < queue.length - 1) return i + 1;
    return repeatRef.current ? 0 : -1;
  };

  const playSong = (song: Song, playlist?: Song[]) => {
    const index = playlist ? playlist.findIndex((s) => s.id === song.id) : -1;
    if (playlist && index !== -1) {
      queueRef.current = playlist;
      indexRef.current = index;
    } else {
      queueRef.current = [song];
      indexRef.current = 0;
    }
    startSong(song);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !audio.getAttribute('src')) return;
    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  };

  const nextSong = () => {
    const next = pickNextIndex();
    if (next === -1) return;
    indexRef.current = next;
    startSong(queueRef.current[next]);
  };

  const previousSong = () => {
    const audio = audioRef.current;
    // Past 3 seconds: restart the song. Otherwise go to the previous one.
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    const i = indexRef.current;
    if (i > 0) {
      indexRef.current = i - 1;
      startSong(queueRef.current[i - 1]);
    } else if (audio) {
      audio.currentTime = 0;
    }
  };

  const seek = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setCurrentTime(seconds);
  };

  const setVolume = (value: number) => {
    setVolumeState(value);
    setIsMuted(false);
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const toggleShuffle = () => {
    const next = !shuffleRef.current;
    shuffleRef.current = next;
    setIsShuffle(next);
  };

  const toggleRepeat = () => {
    const next = !repeatRef.current;
    repeatRef.current = next;
    setIsRepeat(next);
  };

  const handleEnded = () => {
    const next = pickNextIndex();
    if (next === -1) {
      setIsPlaying(false);
      return;
    }
    indexRef.current = next;
    startSong(queueRef.current[next]);
  };

  // Lock-screen / headset controls on phones and browsers
  useEffect(() => {
    if (!currentSong || !('mediaSession' in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.title,
      artist: currentSong.artist,
      album: currentSong.album ?? '',
      artwork: [{ src: currentSong.coverImage, sizes: '300x300' }],
    });
    navigator.mediaSession.setActionHandler('play', () => audioRef.current?.play());
    navigator.mediaSession.setActionHandler('pause', () => audioRef.current?.pause());
    navigator.mediaSession.setActionHandler('previoustrack', previousSong);
    navigator.mediaSession.setActionHandler('nexttrack', nextSong);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  return (
    <MusicContext.Provider value={{
      currentSong, isPlaying, currentTime, duration, volume, isMuted, isShuffle, isRepeat, error,
      playSong, togglePlay, nextSong, previousSong, seek, setVolume, toggleMute, toggleShuffle, toggleRepeat,
    }}>
      {children}

      {/* The one real audio element for the whole app */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d)) setDuration(d);
        }}
        onError={(e) => {
          if (e.currentTarget.getAttribute('src')) {
            setError("Couldn't load this song");
            setIsPlaying(false);
          }
        }}
      />
    </MusicContext.Provider>
  );
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};