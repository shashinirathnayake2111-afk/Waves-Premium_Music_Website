'use client'

import Link from 'next/link';
import React from 'react';
import { FaPlay, FaEarlybirds } from 'react-icons/fa';

// Albums data වැඩි කර සකස් කරන ලදී
export const albumsData = [
  {
    id: 1,
    title: "Manike Mage Hithe",
    artist: "Yohani",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300",
    songs: [
      { id: 101, title: "Manike Mage Hithe", artist: "Yohani", duration: "3:15", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300" }
    ]
  },
  {
    id: 2,
    title: "After Hours",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300",
    songs: [
      { id: 201, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300" }
    ]
  },
  {
    id: 3,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300",
    songs: [
      { id: 301, title: "Levitating", artist: "Dua Lipa", duration: "3:23", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300" }
    ]
  },
  {
    id: 4,
    title: "Justice",
    artist: "Justin Bieber",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300",
    songs: [
      { id: 401, title: "Peaches", artist: "Justin Bieber", duration: "3:18", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300" }
    ]
  },
  {
    id: 5,
    title: "Born Pink",
    artist: "BLACKPINK",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300",
    songs: [
      { id: 501, title: "Shut Down", artist: "BLACKPINK", duration: "2:55", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300" }
    ]
  },
  {
    id: 6,
    title: "Un Verano Sin Ti",
    artist: "Bad Bunny",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300",
    songs: [
      { id: 601, title: "Me Porto Bonito", artist: "Bad Bunny", duration: "2:58", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300" }
    ]
  }
];

interface TopAlbumsProps {
  onSelectAlbum?: (album: typeof albumsData[0]) => void;
}

export default function TopAlbums({ onSelectAlbum }: TopAlbumsProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaEarlybirds className="text-pink-500 text-xl" />
          <h2 className="text-xl font-bold text-white">Top Albums</h2>
        </div>
        <Link href="/albums" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
          See All
        </Link>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {albumsData.map((album) => (
          <div key={album.id} onClick={() => onSelectAlbum && onSelectAlbum(album)}
            className="group relative bg-white/5 border border-white/5 hover:border-white/20 p-3 rounded-2xl transition-all duration-300 hover:bg-white/10 flex flex-col w-44 sm:w-48 shrink-0 cursor-pointer" >

            <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800">
              <img src={album.cover} alt={album.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"/>

              <button onClick={(e) => {
                  e.stopPropagation();
                  onSelectAlbum && onSelectAlbum(album);
                }}
                className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-500 text-white p-3.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl transform translate-y-3 group-hover:translate-y-0 z-10 cursor-pointer"
                title={`Play ${album.title}`} >
                <FaPlay className="text-xs ml-0.5 text-white" />
              </button>
            </div>

            {/* Album & Artist Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-base truncate transition-colors">
                {album.title}
              </h3>
              <p className="text-sm text-gray-400 truncate mt-0.5">
                {album.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}