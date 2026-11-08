'use client'

import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaFileAlt, FaTimes, FaHeart, FaPlus, FaCheck, FaFolder, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { createPortal } from 'react-dom';
import { useMusic } from '@/src/context/MusicContext';
import type { Song } from '@/src/types/music';
import {
  createFolder, deleteFolder, renameFolder, readFolders, readSongFolders,
  writeSongFolders, onLibraryChange,
} from '@/src/lib/library';

interface SongCardProps {
  song: Song;
  queue?: Song[]; // the list this card belongs to, so next/previous work
  rank?: number;
}

export default function SongCard({ song, queue, rank }: SongCardProps) {
  const { playSong, togglePlay, currentSong, isPlaying } = useMusic();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(false);

  const [folders, setFolders] = useState<string[]>([]);
  const [savedInFolders, setSavedInFolders] = useState<string[]>([]);

  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState<string>('');

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);

  const isCurrent = currentSong?.id === song.id;
  const showPause = isCurrent && isPlaying;

  // Load folders + this song's saved folders, and stay in sync with changes
  useEffect(() => {
    const load = () => {
      setFolders(readFolders());
      setSavedInFolders(readSongFolders(song.id));
    };
    load();
    return onLibraryChange(load);
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

  const handlePlay = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, queue);
    }
  };

  const toggleFolder = (folderName: string) => {
    const updated = savedInFolders.includes(folderName)
      ? savedInFolders.filter((f) => f !== folderName)
      : [...savedInFolders, folderName];
    writeSongFolders(song, updated);
  };

  const isFavorited = savedInFolders.length > 0;

  const saveRename = (oldName: string) => {
    renameFolder(oldName, renameInput);
    setEditingFolder(null);
  };

  const handleCreateAndSelectFolder = () => {
    const trimmed = newFolderName.trim();
    if (!trimmed) return;
    createFolder(trimmed);
    if (!savedInFolders.includes(trimmed)) {
      writeSongFolders(song, [...savedInFolders, trimmed]);
    }
    setNewFolderName('');
    setIsCreatingNew(false);
  };

  return (
    <>
      <div className="group relative bg-white/5 border border-white/5 hover:border-white/20 p-3 rounded-2xl transition-all duration-300 hover:bg-white/10 flex flex-col w-full max-w-55 mx-auto">

        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800">
          {rank && (
            <span className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">
              #{rank}
            </span>
          )}

          <button onClick={(e) => { e.stopPropagation(); setShowRightDrawer(true); }}
            aria-label={`Save ${song.title} to a playlist`}
            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10 transition duration-200 cursor-pointer"
            title="Save to playlist">
            <FaHeart className={`text-xs ${isFavorited ? 'text-red-500' : 'text-white/70 hover:text-white'}`} />
          </button>

          <img src={song.coverImage} alt="" loading="lazy" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />

          <button onClick={handlePlay}
            aria-label={showPause ? `Pause ${song.title}` : `Play ${song.title}`}
            className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-500 text-white p-3.5 rounded-full opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-300 shadow-xl z-10 cursor-pointer">
            {showPause ? <FaPause className="text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
          </button>
        </div>

        <div className="flex justify-between items-start gap-2 relative">
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-base truncate ${isCurrent ? 'text-purple-300' : 'text-white'}`}>{song.title}</h3>
            <p className="text-sm text-gray-400 truncate mt-0.5">{song.artist}</p>
          </div>

          <div className="relative" ref={menuRef}>
            <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
              aria-label="More options" aria-expanded={isMenuOpen}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer">
              <BsThreeDotsVertical />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 bottom-full mb-2 bg-[#1e263c] border border-white/10 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 w-32 text-xs backdrop-blur-md">
                <button onClick={(e) => { e.stopPropagation(); setShowLyrics(true); setIsMenuOpen(false); }}
                  className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg text-left text-white transition whitespace-nowrap cursor-pointer">
                  <FaFileAlt className="text-blue-400 text-sm" /> Lyrics
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showRightDrawer && createPortal(
        <div className="fixed inset-0 z-60 flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowRightDrawer(false)} />

          <div className="fixed w-full max-w-sm bg-[#182030] border-l border-white/10 mt-16 h-[calc(97vh-1rem)] -top-5 p-5 shadow-2xl flex flex-col justify-between z-100 text-white overflow-hidden">

            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="relative flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 mb-6 mt-6">
                <img src={song.coverImage} alt="" className="w-11 h-11 rounded-lg object-cover" />
                <div className="min-w-0 pr-6">
                  <p className="font-semibold text-base truncate">{song.title}</p>
                  <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                </div>
                <button onClick={() => setShowRightDrawer(false)} aria-label="Close"
                  className="absolute top-2.5 right-2.5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer">
                  <FaTimes className="text-sm" />
                </button>
              </div>

              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Your folders & playlists</p>

              <div className="space-y-2 overflow-y-auto flex-1 pr-1 [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {folders.map((folder) => {
                  const isChecked = savedInFolders.includes(folder);
                  const isEditing = editingFolder === folder;

                  return (
                    <div key={folder}
                      className={`group flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${isChecked
                        ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 shadow-md'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15 text-gray-300'}`}>
                      {isEditing ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input type="text" value={renameInput} onChange={(e) => setRenameInput(e.target.value)}
                            aria-label="Rename folder"
                            className="bg-black/30 text-white px-2 py-1 rounded-md text-sm border border-purple-500/50 outline-none w-full"
                            autoFocus onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRename(folder);
                              if (e.key === 'Escape') setEditingFolder(null);
                            }} />
                          <button onClick={() => saveRename(folder)} aria-label="Save name"
                            className="p-1 text-purple-400 hover:text-purple-300 cursor-pointer">
                            <FaCheck className="text-sm" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => toggleFolder(folder)} aria-pressed={isChecked}
                            className="flex items-center gap-2.5 flex-1 text-left truncate cursor-pointer">
                            <FaFolder className={isChecked ? 'text-purple-400' : 'text-gray-400'} />
                            <span className="truncate">{folder}</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            {folder !== 'Favorites' && (
                              <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                                <button onClick={(e) => { e.stopPropagation(); setEditingFolder(folder); setRenameInput(folder); }}
                                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                  title="Rename folder" aria-label={`Rename ${folder}`}>
                                  <FaPencilAlt className="text-[15px]" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); deleteFolder(folder); }}
                                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                  title="Delete folder" aria-label={`Delete ${folder}`}>
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

            <div className="pt-4 border-t border-white/10">
              {isCreatingNew ? (
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Folder name..." value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)}
                    aria-label="New folder name"
                    className="bg-black/30 text-white px-3 py-2 rounded-xl text-xs border border-purple-500/50 outline-none w-full"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateAndSelectFolder();
                      if (e.key === 'Escape') setIsCreatingNew(false);
                    }} />
                  <button onClick={handleCreateAndSelectFolder} aria-label="Create folder"
                    className="bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition">
                    <FaCheck />
                  </button>
                  <button onClick={() => setIsCreatingNew(false)} aria-label="Cancel"
                    className="bg-white/10 hover:bg-white/20 text-gray-300 p-2.5 rounded-xl text-xs cursor-pointer transition">
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsCreatingNew(true)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-pink-600 text-white font-semibold text-sm shadow-lg hover:opacity-90 transition cursor-pointer">
                  <span>Create folder</span>
                  <FaPlus className="text-sm" />
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {showLyrics && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-[#182030] border border-white/10 max-w-md w-full rounded-2xl p-6 relative shadow-2xl text-white">
            <button onClick={() => setShowLyrics(false)} aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 cursor-pointer">
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-1 text-purple-400">{song.title}</h3>
            <p className="text-xs text-gray-400 mb-4">{song.artist}</p>
            <div className="max-h-60 overflow-y-auto bg-white/5 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line border border-white/5 text-gray-200">
              Lyrics are not available for this song.
            </div>
          </div>
        </div>
      )}
    </>
  );
}