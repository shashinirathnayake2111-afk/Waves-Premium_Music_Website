'use client'

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { FaPlay, FaFire, FaSearch } from 'react-icons/fa';
import SongCard from '@/src/components/SongCard';


const allSongs = [
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80' },
    { id: 3, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80' },
    { id: 4, title: 'Levitating', artist: 'Dua Lipa', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80' },
    { id: 5, title: 'Bad Habits', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80' },
    { id: 6, title: 'Good 4 U', artist: 'Olivia Rodrigo', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80' },
];

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const filteredSongs = allSongs.filter(
        (song) =>
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    return (
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 m-4 text-white mt-15">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <FaSearch className="text-purple-400" /> Search Results for "{query}"
            </h2>

            {filteredSongs.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    No results found matching "{query}" 🔍
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {filteredSongs.map((song) => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>
            )}

        </div >
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="text-white p-6">Searching...</div>}>
            <SearchResults />
        </Suspense>
    );
}