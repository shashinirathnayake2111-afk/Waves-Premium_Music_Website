'use client';
import React, { useState, useEffect } from 'react';
import SongCard, { Song } from '@/src/components/SongCard';
import { allSongs } from '@/src/data/songs';
import { FaHeart, FaListUl, FaBook } from 'react-icons/fa';

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<'liked' | 'playlists'>('liked');
    const [likedSongs, setLikedSongs] = useState<Song[]>([]);
    const [userFolders, setUserFolders] = useState<string[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<string>('Favourites');
    const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);

    useEffect(() => {
        const filteredLiked = allSongs.filter((song) => {
            const saved = localStorage.getItem(`song_fav_${song.id}`);
            if (saved) {
                const folders: string[] = JSON.parse(saved);
                return folders.includes('Favourites');
            }
            return false;
        });
        setLikedSongs(filteredLiked);

        const savedFolders = localStorage.getItem('user_song_folders');
        if (savedFolders) {
            setUserFolders(JSON.parse(savedFolders));
        }
    }, []);

    useEffect(() => {
        const filteredPlaylist = allSongs.filter((song) => {
            const saved = localStorage.getItem(`song_fav_${song.id}`);
            if (saved) {
                const folders: string[] = JSON.parse(saved);
                return folders.includes(selectedFolder);
            }
            return false;
        });
        setPlaylistSongs(filteredPlaylist);
    }, [selectedFolder]);

    return (
        <div className="flex-1 w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 m-4 text-white">
            <div className="w-full px-3 pt-4 pb-8">

                <div className="flex items-center justify-between mb-8 w-full flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2">
                        <FaBook className="text-purple-500 text-xl" />
                        <h2 className="text-xl font-bold text-white">My Library</h2>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('liked')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                                activeTab === 'liked' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}>
                            <span><FaHeart /></span> Favourites
                        </button>
                        <button
                            onClick={() => setActiveTab('playlists')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                                activeTab === 'playlists' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}>
                            <span><FaListUl /></span> Playlists & Folders
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                {activeTab === 'liked' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {likedSongs.length > 0 ? (
                            likedSongs.map((song) => (
                                <SongCard key={song.id} song={song} />
                            ))
                        ) : (
                            <p className="text-gray-400 col-span-full">No favourite songs found. Add some from the home page!</p>
                        )}
                    </div>
                )}

                {activeTab === 'playlists' && (
                    <div>
                        <div className="flex gap-3 mb-6 flex-wrap">
                            {userFolders.map((folder, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedFolder(folder)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                        selectedFolder === folder ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                    }`}>
                                    {folder}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                            {playlistSongs.length > 0 ? (
                                playlistSongs.map((song) => (
                                    <SongCard key={song.id} song={song} />
                                ))
                            ) : (
                                <p className="text-gray-400 col-span-full">No songs in this folder yet.</p>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}