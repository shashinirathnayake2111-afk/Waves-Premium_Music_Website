'use client'

import React from 'react';
import Link from 'next/link';
import { FaMicrophone, FaPlay } from 'react-icons/fa';
import { useMusic } from '@/src/context/MusicContext';

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  songs: Song[];
}

const dummyArtists: Artist[] = [
  {
    id: '1',
    name: 'Yohani',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300',
    songs: [
      { id: 'y1', title: 'Manike Mage Hithe', artist: 'Yohani', coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300' },
      { id: 'y2', title: 'Moving On', artist: 'Yohani', coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300' },
    ],
  },
  {
    id: '2',
    name: 'A.R. Rahman',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300',
    songs: [
      { id: 'ar1', title: 'Jai Ho', artist: 'A.R. Rahman', coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300' },
      { id: 'ar2', title: 'Tere Bina', artist: 'A.R. Rahman', coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300' },
    ],
  },
  {
    id: '3',
    name: 'Bathiya & Santhush',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300',
    songs: [
      { id: 'bs1', title: 'Neththara', artist: 'Bathiya & Santhush', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300' },
      { id: 'bs2', title: 'Unmadini', artist: 'Bathiya & Santhush', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300' },
    ],
  },
  {
    id: '4',
    name: 'Anirudh Ravichander',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300',
    songs: [
      { id: 'an1', title: 'Halamithi Habibo', artist: 'Anirudh Ravichander', coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300' },
      { id: 'an2', title: 'Naa Ready', artist: 'Anirudh Ravichander', coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300' },
    ],
  },
  {
    id: '5',
    name: 'Sanuka Wickramasinghe',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=300',
    songs: [
      { id: 'sn1', title: 'Saragaye', artist: 'Sanuka Wickramasinghe', coverImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=300' },
      { id: 'sn2', title: 'Perawadanak', artist: 'Sanuka Wickramasinghe', coverImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=300' },
    ],
  },
  {
    id: '6',
    name: 'Sid Sriram',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300',
    songs: [
      { id: 'ss1', title: 'Srivalli', artist: 'Sid Sriram', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300' },
      { id: 'ss2', title: 'Inkem Inkem', artist: 'Sid Sriram', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300' },
    ],
  },
  {
    id: '7',
    name: 'Ed Sheeran',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300',
    songs: [
      { id: 'es1', title: 'Shape of You', artist: 'Ed Sheeran', coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300' },
      { id: 'es2', title: 'Perfect', artist: 'Ed Sheeran', coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300' },
    ],
  },
];

export default function TopArtists() {
  const { playSong } = useMusic();

  const handlePlayArtist = (artist: Artist) => {
    if (artist.songs && artist.songs.length > 0) {
      playSong(artist.songs[0], artist.songs );
    }
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
          <div key={artist.id} onClick={() => handlePlayArtist(artist)}
            className="flex flex-col items-center group text-center cursor-pointer p-2 transition duration-300 shrink-0">

            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-linear-to-tr from-indigo-600 via-pink-500 to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-xl">

              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900">
                <img src={artist.image} alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              </div>

              {/* Floating Play Button */}
              <button onClick={(e) => {
                  e.stopPropagation();
                  handlePlayArtist(artist);
                }}
                className="absolute bottom-1 right-1 w-9 h-9 bg-purple-600 hover:bg-purple-500 text-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 z-10 cursor-pointer"
                title={`Play ${artist.name}`} >
                <FaPlay className="ml-0.5 text-sm text-white" />
              </button>
            </div>

            {/* Artist Name & "Artist" Text */}
            <h4 className="font-semibold text-white text-base mt-3 truncate w-32 sm:w-36 group-hover:text-purple-400 transition-colors">
              {artist.name}
            </h4>
            <p className="text-sm text-gray-400 truncate w-32 sm:w-36 mt-0.5">
              Artist
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}