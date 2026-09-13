'use client'

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaFire, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SongCard from '@/src/components/SongCard' ;
const trendingSongs = [
    { id: 1, rank: 1, title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80', lyrics: "The club isn't the best place to find a lover\nSo the bar is where I go..." },
    { id: 2, rank: 2, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80', lyrics: "I've been tryin' to call\nI've been on my own for long enough..." },
    { id: 3, rank: 3, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80', lyrics: "I do the same thing I told you that I never would..." },
    { id: 4, rank: 4, title: 'Levitating', artist: 'Dua Lipa', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80', lyrics: "If you wanna run away with me, I know a galaxy..." },
    { id: 5, rank: 5, title: 'Bad Habits', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80', lyrics: "Every time you come around, you know I can't say no..." },
    { id: 6, rank: 6, title: 'Save Your Tears', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80', lyrics: "I saw you dancing in a crowded room..." },
    { id: 7, rank: 7, title: 'Peaches', artist: 'Justin Bieber', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80', lyrics: "I got my peaches out in Georgia..." },
    { id: 8, rank: 8, title: 'Industry Baby', artist: 'Lil Nas X', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80', lyrics: "Baby welcome to the circus, like I'm Ringling..." },
]

function TrendingContent() {
    const [sortBy, setSortBy] = useState<'rank' | 'title' | 'artist'>('rank');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const filteredSongs = trendingSongs.filter((song) => {
        const query = searchQuery.toLowerCase();
        return (
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
        );
    });

    const sortedSongs = [...filteredSongs].sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
        if (sortBy === 'artist') {
            return a.artist.localeCompare(b.artist);
        }
        return a.rank - b.rank;
    });

    return (
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 m-4 text-white justify-between">
            <div className="w-full px-3 pt-10 pb-8 text-white">

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <FaFire className="text-orange-500 text-xl" />
                        <h2 className="text-2xl font-bold text-white">Trending Songs</h2>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <label htmlFor="sort" className="hidden sm:inline text-gray-400">Sort by:</label>
                        <div className="relative text-xs sm:text-sm" ref={dropdownRef}>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="bg-[#1e263c] border border-white/10 text-white rounded-lg px-3 py-1.5 flex items-center gap-3 hover:border-white/20 transition cursor-pointer">
                                <span>
                                    {sortBy === 'rank' && 'Trending Rank'}
                                    {sortBy === 'title' && 'Song Title (A-Z)'}
                                    {sortBy === 'artist' && 'Artist Name (A-Z)'}
                                </span>

                                {isDropdownOpen ? (
                                    <FaChevronUp className="text-xs text-purple-400" />
                                ) : (
                                    <FaChevronDown className="text-xs text-gray-400" />
                                )}
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#1e263c] border border-white/10 rounded-xl shadow-2xl py-1 z-50 backdrop-blur-md">
                                    <button onClick={() => { setSortBy('rank'); setIsDropdownOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-white/10 transition ${sortBy === 'rank' ? 'text-purple-400 font-semibold bg-white/5' : 'text-gray-300'}`}>
                                        Trending Rank (#1)
                                    </button>
                                    <button onClick={() => { setSortBy('title'); setIsDropdownOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-white/10 transition ${sortBy === 'title' ? 'text-purple-400 font-semibold bg-white/5' : 'text-gray-300'}`}>
                                        Song Title (A-Z)
                                    </button>
                                    <button onClick={() => { setSortBy('artist'); setIsDropdownOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-white/10 transition ${sortBy === 'artist' ? 'text-purple-400 font-semibold bg-white/5' : 'text-gray-300'}`}>
                                        Artist Name (A-Z)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {sortedSongs.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        No songs found matching "{searchQuery}" 🔍
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {sortedSongs.map((song) => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function TrendingPage() {
    return (
        <Suspense fallback={<div className="text-white p-6">Loading Trending Songs...</div>}>
            <TrendingContent />
        </Suspense>
    )
}