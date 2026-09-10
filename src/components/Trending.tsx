'use client'

import React from 'react'
import Link from 'next/link'
import { FaPlay, FaFire } from 'react-icons/fa'

export default function Trending() {

  const trendingSongs = [
  { 
    id: 1, 
    title: 'Shape of You', 
    artist: 'Ed Sheeran', 
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80' 
  },
  { 
    id: 2, 
    title: 'Blinding Lights', 
    artist: 'The Weeknd', 
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80' 
  },
  { 
    id: 3, 
    title: 'Stay', 
    artist: 'The Kid LAROI, Justin Bieber', 
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80' 
  },
  { 
    id: 4, 
    title: 'Levitating', 
    artist: 'Dua Lipa', 
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80' 
  },
  {
    id: 5,
    title: 'Peaches',
    artist: 'Justin Bieber',
    cover: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&q=80'
  },
  {
    id: 6,
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    cover: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&q=80'
  }
]

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaFire className="text-orange-500 text-xl" />
          <h2 className="text-xl font-bold text-white">Trending Now</h2>
        </div>

        <Link 
          href="/trending" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
            All Songs
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {trendingSongs.map((song) => (
          <div key={song.id} className="group relative bg-white/5 border border-white/5 hover:border-white/20 p-3 rounded-xl transition-all hover:bg-white/10">

            <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-3 bg-slate-800">
              <img src={song.cover} alt={song.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"/>
              <button className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg transform translate-y-2 group-hover:translate-y-0">
                <FaPlay className="text-xs ml-0.5" />
              </button>
            </div>

            <h3 className="font-semibold text-white text-base truncate">{song.title}</h3>
            <p className="text-sm text-gray-400 truncate mt-1">{song.artist}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
