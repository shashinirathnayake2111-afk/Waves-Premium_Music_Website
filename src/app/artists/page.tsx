'use client'

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaMicrophone, FaPlay } from 'react-icons/fa';

interface Artist {
    id: string;
    name: string;
    image: string;
    genre: string;
    category: 'Sinhala' | 'Tamil' | 'International';
}

interface Song {
    id: number;
    title: string;
    artist: string;
    cover: string;
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

const allSongs: Song[] = [
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80' },
    { id: 3, title: 'Manike Mage Hithe', artist: 'Yohani', cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300' },
    { id: 4, title: 'Bad Habits', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80' },
];

function ArtistsContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || searchParams.get('q') || '';

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const categories = ['All', 'Sinhala', 'Tamil', 'International'];

    const filteredArtists = allArtists.filter((artist) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = artist.name.toLowerCase().includes(query) ||
            artist.genre.toLowerCase().includes(query);
        const matchesCategory = selectedCategory === 'All' || artist.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handlePlayArtist = (artist: Artist) => {
        const artistSongs = allSongs.filter(
            (song) => song.artist.toLowerCase() === artist.name.toLowerCase()
        );

        if (artistSongs.length > 0) {
            alert(`Playing top song for ${artist.name}: "${artistSongs[0].title}" 🎵`);
        } else {
            alert(`No playable songs found for ${artist.name} 😢`);
        }
    };

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
                            className={`px-4 py-1.5 rounded-xl text-sm font-semibold cursor-pointer transition ${selectedCategory === cat
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                                : 'bg-[#1e263c] hover:bg-white/10 text-gray-300 border border-white/10'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {filteredArtists.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    No artists found matching "{searchQuery}" 🔍
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredArtists.map((artist) => (
                        <div key={artist.id}
                            className="flex flex-col items-center group text-center cursor-pointer p-2 transition duration-300">

                            {/* Circle Image Container */}
                            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-linear-to-tr from-indigo-600 via-pink-500 to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-xl">

                                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900">
                                    <img src={artist.image} alt={artist.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div onClick={() => handlePlayArtist(artist)}
                                        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <button onClick={() => handlePlayArtist(artist)}
                                    className="absolute bottom-1 right-1 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-purple-500 z-10 cursor-pointer"
                                    title={`Play ${artist.name}`}>
                                    <FaPlay className="ml-0.5 text-xs text-white" />
                                </button>
                            </div>

                            <h4 className="font-semibold text-white text-base mt-3 truncate w-full group-hover:text-purple-400 transition-colors">
                                {artist.name}
                            </h4>
                            <p className="text-sm text-gray-400 truncate w-full mt-0.5">
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