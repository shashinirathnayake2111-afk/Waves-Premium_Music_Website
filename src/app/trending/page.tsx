'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { FaFire, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SongCard from '@/src/components/SongCard';
import { CardSkeletons, ErrorBox } from '@/src/components/AsyncState';
import { useAsync } from '@/src/hooks/useAsync';
import { getTrendingTracks } from '@/src/lib/jamendo';

type SortKey = 'rank' | 'title' | 'artist';

const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'rank', label: 'Trending rank' },
    { key: 'title', label: 'Song title (A-Z)' },
    { key: 'artist', label: 'Artist name (A-Z)' },
];

export default function TrendingPage() {
    const { data: songs, loading, error, reload } = useAsync(() => getTrendingTracks(40));

    const [sortBy, setSortBy] = useState<SortKey>('rank');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Rank = position in Jamendo's popularity order. Sorting never changes a song's rank.
    const sortedSongs = useMemo(() => {
        const ranked = (songs ?? []).map((song, i) => ({ song, rank: i + 1 }));
        if (sortBy === 'title') return [...ranked].sort((a, b) => a.song.title.localeCompare(b.song.title));
        if (sortBy === 'artist') return [...ranked].sort((a, b) => a.song.artist.localeCompare(b.song.artist));
        return ranked;
    }, [songs, sortBy]);

    const queue = sortedSongs.map((item) => item.song);
    const currentLabel = sortOptions.find((o) => o.key === sortBy)?.label;

    return (
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 m-4 mt-16 text-white">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FaFire className="text-orange-500 text-xl" />
                    <h1 className="text-2xl font-bold">Trending songs</h1>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="hidden sm:inline text-gray-400">Sort by:</span>
                    <div className="relative text-xs sm:text-sm" ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-haspopup="listbox" aria-expanded={isDropdownOpen}
                            className="bg-[#1e263c] border border-white/10 text-white rounded-lg px-3 py-1.5 flex items-center gap-3 hover:border-white/20 transition cursor-pointer">
                            <span>{currentLabel}</span>
                            {isDropdownOpen ? <FaChevronUp className="text-xs text-purple-400" /> : <FaChevronDown className="text-xs text-gray-400" />}
                        </button>

                        {isDropdownOpen && (
                            <div role="listbox" className="absolute right-0 mt-2 w-48 bg-[#1e263c] border border-white/10 rounded-xl shadow-2xl py-1 z-50 backdrop-blur-md">
                                {sortOptions.map((option) => (
                                    <button key={option.key} role="option" aria-selected={sortBy === option.key}
                                        onClick={() => { setSortBy(option.key); setIsDropdownOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-white/10 transition cursor-pointer ${sortBy === option.key ? 'text-purple-400 font-semibold bg-white/5' : 'text-gray-300'}`}>
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {loading && <CardSkeletons count={8} />}
            {error && <ErrorBox message={`Couldn't load trending songs. ${error}`} onRetry={reload} />}

            {songs && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {sortedSongs.map(({ song, rank }) => (
                        <SongCard key={song.id} song={song} queue={queue} rank={rank} />
                    ))}
                </div>
            )}
        </div>
    );
}