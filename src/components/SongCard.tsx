'use client'

import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaDownload, FaFileAlt, FaTimes, FaHeart, FaPlus, FaCheck, FaFolder, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/context/ModalContext';

export interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  rank?: number;
  lyrics?: string;
}

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  const router = useRouter();
  const { openCreateModal } = useModal();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(false);

  const [folders, setFolders] = useState<string[]>(['Favorites']);
  const [savedInFolders, setSavedInFolders] = useState<string[]>([]);

  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState<string>('');

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedFolders = localStorage.getItem('user_song_folders');
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    } else {
      localStorage.setItem('user_song_folders', JSON.stringify(['Favorites']));
    }

    const storedSongFavs = localStorage.getItem(`song_fav_${song.id}`);
    if (storedSongFavs) {
      setSavedInFolders(JSON.parse(storedSongFavs));
    }
  }, [song.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${song.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMenuOpen(false);
  };

  const toggleFolder = (folderName: string) => {
    let updated: string[];
    if (savedInFolders.includes(folderName)) {
      updated = savedInFolders.filter((f) => f !== folderName);
    } else {
      updated = [...savedInFolders, folderName];
    }
    setSavedInFolders(updated);
    localStorage.setItem(`song_fav_${song.id}`, JSON.stringify(updated));
  };

  const isFavorited = savedInFolders.length > 0;

  const handleDeleteFolder = (folderNameToDelete: string) => {
    const updatedFolders = folders.filter(f => f !== folderNameToDelete);
    setFolders(updatedFolders);
    localStorage.setItem('user_song_folders', JSON.stringify(updatedFolders));

    if (savedInFolders.includes(folderNameToDelete)) {
      const updatedSaved = savedInFolders.filter(f => f !== folderNameToDelete);
      setSavedInFolders(updatedSaved);
      localStorage.setItem(`song_fav_${song.id}`, JSON.stringify(updatedSaved));
    }
  };

  const startRename = (folderName: string) => {
    setEditingFolder(folderName);
    setRenameInput(folderName);
  };

  const saveRename = (oldName: string) => {
    if (renameInput.trim() !== '' && renameInput !== oldName) {
      const updatedFolders = folders.map(f => f === oldName ? renameInput.trim() : f);
      setFolders(updatedFolders);
      localStorage.setItem('user_song_folders', JSON.stringify(updatedFolders));

      if (savedInFolders.includes(oldName)) {
        const updatedSaved = savedInFolders.map(f => f === oldName ? renameInput.trim() : f);
        setSavedInFolders(updatedSaved);
        localStorage.setItem(`song_fav_${song.id}`, JSON.stringify(updatedSaved));
      }
    }
    setEditingFolder(null);
  };

  return (
    <>
      <div className="group relative bg-white/5 border border-white/5 hover:border-white/20 p-3 rounded-2xl transition-all duration-300 hover:bg-white/10 flex flex-col w-full max-w-55 mx-auto">

        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800">
          {song.rank && (
            <span className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">
              #{song.rank}
            </span>
          )}

          <button onClick={(e) => { e.stopPropagation(); setShowRightDrawer(true); }}
            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10 transition duration-200 cursor-pointer" 
            title="Save to Playlist">
            <FaHeart className={`text-xs ${isFavorited ? 'text-red-500' : 'text-white/70 hover:text-white'}`} />
          </button>

          <img src={song.cover} alt={song.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
          <button className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-500 text-white p-3.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl transform translate-y-3 group-hover:translate-y-0 z-10 cursor-pointer">
            <FaPlay className="text-xs ml-0.5" />
          </button>
        </div>

        <div className="flex justify-between items-start gap-2 relative">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-base truncate">{song.title}</h3>
            <p className="text-sm text-gray-400 truncate mt-0.5">{song.artist}</p>
          </div>

          <div className="relative" ref={menuRef}>
            <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer">
              <BsThreeDotsVertical />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 bottom-full mb-2 bg-[#1e263c] border border-white/10 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 w-32 text-xs backdrop-blur-md">
                <button onClick={(e) => { e.stopPropagation(); handleDownload(); }} 
                   className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg text-left text-white transition whitespace-nowrap cursor-pointer">
                  <FaDownload className="text-purple-400 text-sm" /> Download
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowLyrics(true); setIsMenuOpen(false); }}
                  className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg text-left text-white transition whitespace-nowrap cursor-pointer">
                  <FaFileAlt className="text-blue-400 text-sm" /> Lyrics
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showRightDrawer && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowRightDrawer(false)} />

          <div className="fixed w-full max-w-xs bg-[#182030] border-l border-white/10 mt-16 h-[calc(100vh-2rem)] -top-6 p-5 shadow-2xl flex flex-col justify-between z-10 text-white overflow-hidden">

            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="relative flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 mb-4">
                <img src={song.cover} alt={song.title} className="w-11 h-11 rounded-lg object-cover" />
                <div className="min-w-0 pr-6">
                  <p className="font-semibold text-base truncate">{song.title}</p>
                  <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                </div>
                <button onClick={() => setShowRightDrawer(false)}
                  className="absolute top-2.5 right-2.5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer">
                  <FaTimes className="text-sm" />
                </button>
              </div>

              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Your Folders & Playlists</p>

              <div className="space-y-2 overflow-y-auto flex-1 pr-1 [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {folders.map((folder) => {
                  const isChecked = savedInFolders.includes(folder);
                  const isEditing = editingFolder === folder;

                  return (
                    <div key={folder}
                      className={`group flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        isChecked
                          ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 shadow-md'
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15 text-gray-300'
                      }`}>
                      {isEditing ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input type="text" value={renameInput} onChange={(e) => setRenameInput(e.target.value)}
                            className="bg-black/30 text-white px-2 py-1 rounded-md text-sm border border-purple-500/50 outline-none w-full"
                            autoFocus onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRename(folder);
                              if (e.key === 'Escape') setEditingFolder(null);
                            }}/>
                          <button onClick={() => saveRename(folder)}
                            className="p-1 text-purple-400 hover:text-purple-300 cursor-pointer">
                            <FaCheck className="text-sm" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => toggleFolder(folder)}
                            className="flex items-center gap-2.5 flex-1 text-left truncate cursor-pointer">
                            <FaFolder className={isChecked ? 'text-purple-400' : 'text-gray-400'} />
                            <span className="truncate">{folder}</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            {folder !== 'Favorites' && (
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button onClick={(e) => { e.stopPropagation(); startRename(folder); }}
                                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                  title="Rename Folder" >
                                  <FaPencilAlt className="text-[15px]" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder); }}
                                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer" 
                                  title="Delete Folder" >
                                  <FaTrash className="text-[15px]" />
                                </button>
                              </div>
                            )}

                            {isChecked && (
                              <span className="bg-purple-500/20 p-1 rounded-md text-purple-400 ml-1">
                                <FaCheck className="text-[15px]" />
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Create Playlist Action */}
            <div className="pt-4 border-t border-white/10">
              <button onClick={() => openCreateModal()}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold text-xs shadow-lg hover:opacity-95 transition cursor-pointer">
                <span>Create Playlist</span>
                <FaPlus className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LYRICS MODAL */}
      {showLyrics && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#182030] border border-white/10 max-w-md w-full rounded-2xl p-6 relative shadow-2xl text-white">
            <button onClick={() => setShowLyrics(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 cursor-pointer">
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-1 text-purple-400">{song.title}</h3>
            <p className="text-xs text-gray-400 mb-4">{song.artist}</p>
            <div className="max-h-60 overflow-y-auto bg-white/5 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line border border-white/5 text-gray-200">
              {song.lyrics || 'Lyrics are not available for this song.'}
            </div>
          </div>
        </div>
      )}
    </>
  );
}