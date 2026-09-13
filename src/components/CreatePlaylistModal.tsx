'use client'

import React, { useState } from 'react';
import { useModal } from '@/src/context/ModalContext'; 
import { FaTimes } from 'react-icons/fa';

export default function CreatePlaylistModal() {
  const { isCreateModalOpen, closeCreateModal } = useModal();
  const [playlistName, setPlaylistName] = useState('');

  if (!isCreateModalOpen) return null;

  const handleCreate = () => {
    if (!playlistName.trim()) return;

    const storedFolders = localStorage.getItem('user_song_folders');
    const folders = storedFolders ? JSON.parse(storedFolders) : ['Favorites'];

    if (!folders.includes(playlistName)) {
      folders.push(playlistName);
      localStorage.setItem('user_song_folders', JSON.stringify(folders));
    }

    setPlaylistName('');
    closeCreateModal();

    window.location.reload(); 
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-9999 flex items-center justify-center p-4">
      <div className="bg-[#182030] border border-white/10 w-full max-w-md rounded-2xl p-6 relative shadow-2xl text-white">

        <button onClick={closeCreateModal}className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition">
          <FaTimes />
        </button>

        <h3 className="text-lg font-bold mb-4">Create New Playlist</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Playlist Name</label>
            <input type="text" placeholder="My Playlist..." value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={closeCreateModal} className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition" >
              Cancel
            </button>
            <button onClick={handleCreate} className="px-5 py-2 text-sm font-semibold bg-linear-to-r from-purple-600 to-pink-600 hover:opacity-90 rounded-xl text-white transition shadow-lg">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
