'use client'

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaMicrophone } from 'react-icons/fa';

interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  category: 'Sinhala' | 'Tamil' | 'International';
}

const allArtists: Artist[] = [
  { id: '1', name: 'Yohani', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300', genre: 'Sinhala Pop', category: 'Sinhala' },
  { id: '2', name: 'A.R. Rahman', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300', genre: 'Tamil Film', category: 'Tamil' },
  { id: '3', name: 'Bathiya & Santhush', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300', genre: 'Sinhala Pop', category: 'Sinhala' },
  { id: '4', name: 'Anirudh Ravichander', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300', genre: 'Tamil Rock', category: 'Tamil' },
  { id: '5', name: 'Sanuka Wickramasinghe', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=300', genre: 'Sinhala', category: 'Sinhala' },
  { id: '6', name: 'Sid Sriram', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300', genre: 'Tamil Melody', category: 'Tamil' },
  { id: '7', name: 'Ed Sheeran', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300', genre: 'Pop', category: 'International' },
  { id: '8', name: 'The Weeknd', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300', genre: 'R&B / Pop', category: 'International' },
];

function ArtistsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Sinhala', 'Tamil', 'International'];

  // Filtering using Navbar Search Query and Category Buttons
  const filteredArtists = allArtists.filter((artist) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = artist.name.toLowerCase().includes(query) ||
                          artist.genre.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'All' || artist.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 min-h-[calc(100vh-5rem)] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 m-4 text-white mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <FaMicrophone className="text-purple-500 text-xl" />
          <h1 className="text-2xl font-bold text-white">Top Artists</h1>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-[#1e263c] hover:bg-white/10 text-gray-300 border border-white/10'
              }`} >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Artists Grid */}
      {filteredArtists.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          No artists found matching "{searchQuery}" 🔍
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredArtists.map((artist) => (
            <div key={artist.id}
              className="flex flex-col items-center group cursor-pointer text-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition duration-300">
              <div className="relative w-28 h-28 rounded-full overflow-hidden p-1 bg-linear-to-tr from-purple-600 via-pink-500 to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900">
                  <img src={artist.image} alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                </div>
              </div>

              <h3 className="font-semibold text-white text-sm mt-3 truncate w-full group-hover:text-purple-400 transition-colors">
                {artist.name}
              </h3>
              <p className="text-xs text-gray-400 truncate w-full mt-0.5">
                {artist.genre}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArtistsPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading Artists...</div>}>
      <ArtistsContent />
    </Suspense>
  );
}