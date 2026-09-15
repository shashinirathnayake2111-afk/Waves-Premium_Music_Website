'use client'

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { FaPlay, FaFire, FaSearch, FaMicrophone, FaMusic } from 'react-icons/fa';
import SongCard from '@/src/components/SongCard';


const allSongs = [
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80' },
    { id: 3, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80' },
    { id: 4, title: 'Levitating', artist: 'Dua Lipa', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80' },
    { id: 5, title: 'Bad Habits', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80' },
    { id: 6, title: 'Good 4 U', artist: 'Olivia Rodrigo', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80' },
];

const allArtists = [
    { id: '1', name: 'Yohani', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300', genre: 'Sinhala Pop' },
    { id: '2', name: 'A.R. Rahman', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300', genre: 'Tamil Film' },
    { id: '3', name: 'Bathiya & Santhush', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300', genre: 'Sinhala Pop' },
    { id: '4', name: 'Anirudh Ravichander', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300', genre: 'Tamil Rock' },
    { id: '5', name: 'Sanuka Wickramasinghe', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=300', genre: 'Sinhala' },
    { id: '6', name: 'Sid Sriram', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300', genre: 'Tamil Melody' },
    { id: '7', name: 'Ed Sheeran', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300', genre: 'Pop' },
    { id: '8', name: 'The Weeknd', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300', genre: 'R&B / Pop' },
];

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [activeTab, setActiveTab] = useState<'all' | 'songs' | 'artists'>('all');

    const filteredSongs = allSongs.filter(
        (song) =>
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
    );

        const filteredArtists = allArtists.filter(
        (artist) =>
            artist.name.toLowerCase().includes(query.toLowerCase()) ||
            artist.genre.toLowerCase().includes(query.toLowerCase())
    );

    const hasResults = filteredSongs.length > 0 || filteredArtists.length > 0;



    return (
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 m-4 text-white mt-15">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <FaSearch className="text-purple-400" /> {query ? `Search Results for "${query}"` : 'Explore Songs & Artists'}
            </h2>

            {!hasResults && query ? (
                    <div className="text-center py-20 text-gray-400 my-auto">
                        No results found matching "{query}" 🔍
                    </div>
                ) : (
                    <div className="space-y-10">
                        {/* Artists Section */}
                        {(activeTab === 'all' || activeTab === 'artists') && filteredArtists.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-300">
                                    <FaMicrophone /> Artists
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {filteredArtists.map((artist) => (
                                        <div
                                            key={artist.id}
                                            className="flex flex-col items-center group cursor-pointer text-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition duration-300"
                                        >
                                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-linear-to-tr from-purple-600 via-pink-500 to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                                                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900">
                                                    <img
                                                        src={artist.image}
                                                        alt={artist.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                            </div>
                                            <h4 className="font-semibold text-white text-sm mt-3 truncate w-full group-hover:text-purple-400 transition-colors">
                                                {artist.name}
                                            </h4>
                                            <p className="text-xs text-gray-400 truncate w-full mt-0.5">
                                                {artist.genre}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Songs Section */}
                        {(activeTab === 'all' || activeTab === 'songs') && filteredSongs.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-300">
                                    <FaMusic /> Songs
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                                    {filteredSongs.map((song) => (
                                        <SongCard key={song.id} song={song} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
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