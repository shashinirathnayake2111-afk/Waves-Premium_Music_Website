'use client'

import React, { useState } from 'react';
import { useModal } from '@/src/context/ModalContext';
import { createFolder } from '@/src/lib/library';
import { FaTimes } from 'react-icons/fa';

export default function CreatePlaylistModal() {
  const { isCreateModalOpen, closeCreateModal } = useModal();
  const [playlistName, setPlaylistName] = useState('');

  if (!isCreateModalOpen) return null;

  const handleCreate = () => {
    if (!createFolder(playlistName)) return;
    setPlaylistName('');
    closeCreateModal();
    // No page reload needed: Sidebar and Library update themselves
  };

  const handleClose = () => {
    setPlaylistName('');
    closeCreateModal();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-9999 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="create-playlist-title">
      <div className="bg-[#182030] border border-white/10 w-full max-w-md rounded-2xl p-6 relative shadow-2xl text-white">

        <button onClick={handleClose} aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition cursor-pointer">
          <FaTimes />
        </button>

        <h3 id="create-playlist-title" className="text-lg font-bold mb-4">Create new playlist</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="playlist-name" className="text-sm text-gray-400 block mb-1">Playlist name</label>
            <input id="playlist-name" type="text" placeholder="My playlist..." value={playlistName} autoFocus
              onChange={(e) => setPlaylistName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') handleClose(); }}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={handleClose} className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition cursor-pointer">
              Cancel
            </button>
            <button onClick={handleCreate} className="px-5 py-2 text-sm font-semibold bg-linear-to-r from-purple-600 to-pink-600 hover:opacity-90 rounded-xl text-white transition shadow-lg cursor-pointer">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}