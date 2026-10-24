'use client';

import { useState } from 'react';
import { FaHeart, FaList, FaMusic } from 'react-icons/fa';
import SongCard from '@/src/components/SongCard';

const likedSongs = [
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80' },
];

const playlists = [
    { id: 1, title: 'Workout Mix', count: '12 songs', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80' },
    { id: 2, title: 'Chill Vibes', count: '8 songs', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80' },
];

export default function LibraryPage() {

    const [activeTab, setActiveTab] = useState<'liked' | 'playlists'>('liked');

    return (
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 m-4 text-white mt-16">
            {/* Header & Tabs */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-3">
                    <FaMusic className="text-purple-400" /> My Library
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('liked')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${activeTab === 'liked' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                    >
                        <FaHeart /> Liked Songs
                    </button>
                    <button
                        onClick={() => setActiveTab('playlists')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${activeTab === 'playlists' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                    >
                        <FaList /> Playlists
                    </button>
                </div>
            </div>

            {/* Content Section based on activeTab */}
            {activeTab === 'liked' ? (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">Liked Songs</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {likedSongs.map((song) => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">Your Playlists</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {playlists.map((playlist) => (
                            <div key={playlist.id} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition cursor-pointer">
                                <img src={playlist.cover} alt={playlist.title} className="w-full h-36 object-cover rounded-lg mb-3" />
                                <h4 className="font-semibold text-white">{playlist.title}</h4>
                                <p className="text-xs text-gray-400 mt-1">{playlist.count}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}