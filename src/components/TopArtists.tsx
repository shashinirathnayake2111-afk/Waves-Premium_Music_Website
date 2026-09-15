'use client'

import React from 'react';
import Link from 'next/link';
import { FaMicrophone, FaPlay } from 'react-icons/fa';

export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
}

const dummyArtists: Artist[] = [
  { id: '1', name: 'Yohani', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300', genre: 'Sinhala Pop' },
  { id: '2', name: 'A.R. Rahman', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300', genre: 'Tamil Film' },
  { id: '3', name: 'Bathiya & Santhush', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300', genre: 'Sinhala Pop' },
  { id: '4', name: 'Anirudh Ravichander', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300', genre: 'Tamil Rock' },
  { id: '5', name: 'Sanuka Wickramasinghe', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=300', genre: 'Sinhala' },
  { id: '6', name: 'Sid Sriram', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300', genre: 'Tamil Melody' },
  { id: '7', name: 'Ed Sheeran', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300', genre: 'Pop' },
];

export default function TopArtists() {
  const handlePlayArtist = (artist: Artist) => {
    alert(`Playing top songs for ${artist.name} 🎵`);
  };

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaMicrophone className="text-purple-500 text-xl" />
          <h2 className="text-xl font-bold text-white">Top Artists</h2>
        </div>
        <Link href="/artists" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
          See All
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:gap-10 overflow-x-auto pb-4 pt-1 [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {dummyArtists.map((artist) => (
          <div key={artist.id}
            className="flex flex-col items-center group text-center cursor-pointer p-2 transition duration-300 shrink-0">

            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-linear-to-tr from-indigo-600 via-pink-500 to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-xl">
 
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900">
                <img src={artist.image} alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div onClick={() => handlePlayArtist(artist)}
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              </div>

              {/* Floating Play Button - Outside overflow-hidden */}
              <button onClick={(e) => {
                  e.stopPropagation();
                  handlePlayArtist(artist);}}
                className="absolute bottom-1 right-1 w-9 h-9 bg-purple-600 hover:bg-purple-500 text-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 z-10 cursor-pointer"
                title={`Play ${artist.name}`} >
                <FaPlay className="ml-0.5 text-sm text-white" />
              </button>
            </div>

            {/* Artist Name & Genre */}
            <h4 className="font-semibold text-white text-base mt-3 truncate w-32 sm:w-36 group-hover:text-purple-400 transition-colors">
              {artist.name}
            </h4>
            <p className="text-sm text-gray-400 truncate w-32 sm:w-36 mt-0.5">
              {artist.genre}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}