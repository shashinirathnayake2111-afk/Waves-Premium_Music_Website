'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FaPlay, FaDownload, FaFileAlt, FaTimes } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'

// 🎵 Song එකක Type එක
export interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  lyrics?: string;
}

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menu එකෙන් එළිය Click කරද්දී auto close වීම
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${song.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="group relative bg-white/5 border border-white/5 hover:border-white/20 p-3.5 rounded-2xl transition-all duration-300 hover:bg-white/10 flex flex-col justify-between w-full">
        {/* Cover Image & Play Button */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800">
          <img 
            src={song.cover} 
            alt={song.title} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
          />
          <button className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-500 text-white p-3.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl transform translate-y-3 group-hover:translate-y-0 z-10">
            <FaPlay className="text-xs ml-1" />
          </button>
        </div>

        {/* Title, Artist & 3-Dots Dropdown */}
        <div className="flex justify-between items-start gap-2 relative">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-base truncate">{song.title}</h3>
            <p className="text-sm text-gray-400 truncate mt-0.5">{song.artist}</p>
          </div>

          <div className="relative" ref={menuRef}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            >
              <BsThreeDotsVertical />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 bottom-full mb-2 bg-[#1e263c] border border-white/10 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 w-32 text-xs backdrop-blur-md">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg text-left text-white transition whitespace-nowrap"
                >
                  <FaDownload className="text-purple-400 text-sm" /> Download
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLyrics(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg text-left text-white transition whitespace-nowrap"
                >
                  <FaFileAlt className="text-blue-400 text-sm" /> Lyrics
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lyrics Modal */}
      {showLyrics && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#182030] border border-white/10 max-w-md w-full rounded-2xl p-6 relative shadow-2xl text-white">
            <button 
              onClick={() => setShowLyrics(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-1 text-purple-400">{song.title}</h3>
            <p className="text-xs text-gray-400 mb-4">{song.artist}</p>
            <div className="max-h-60 overflow-y-auto bg-white/5 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line border border-white/5 text-gray-200">
              {song.lyrics || 'Lyrics are not available for this song.'}
            </div>
          </div>
        </div>
      )}
    </>
  )
}