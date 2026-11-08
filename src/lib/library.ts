import type { Song } from '@/src/types/music';

export const FOLDERS_KEY = 'user_song_folders';
export const FAVORITES = 'Favorites';

const FAV_PREFIX = 'song_fav_';
const DATA_PREFIX = 'song_data_';
const CHANGE_EVENT = 'waves:library-changed';

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return (JSON.parse(raw) as T) ?? fallback;
  } catch {
    return fallback;
  }
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Call this in useEffect to refresh UI when the library changes (same tab or other tabs)
export function onLibraryChange(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

// ---------- Folders ----------
export function readFolders(): string[] {
  const stored = readJSON<unknown>(FOLDERS_KEY, []);
  const folders = Array.isArray(stored) ? stored.filter((f): f is string => typeof f === 'string') : [];
  return folders.length > 0 ? folders : [FAVORITES];
}

function writeFolders(folders: string[]) {
  localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
}

function allSongIds(): string[] {
  const ids: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(FAV_PREFIX)) ids.push(key.slice(FAV_PREFIX.length));
  }
  return ids;
}

export function createFolder(name: string): boolean {
  const trimmed = name.trim();
  if (!trimmed) return false;
  const folders = readFolders();
  if (!folders.includes(trimmed)) {
    writeFolders([...folders, trimmed]);
  }
  notify();
  return true;
}

export function renameFolder(oldName: string, newName: string) {
  const trimmed = newName.trim();
  if (!trimmed || trimmed === oldName || oldName === FAVORITES) return;

  writeFolders(readFolders().map((f) => (f === oldName ? trimmed : f)));
  allSongIds().forEach((id) => {
    const folders = readSongFolders(id);
    if (folders.includes(oldName)) {
      localStorage.setItem(FAV_PREFIX + id, JSON.stringify(folders.map((f) => (f === oldName ? trimmed : f))));
    }
  });
  notify();
}

export function deleteFolder(name: string) {
  if (name === FAVORITES) return;

  writeFolders(readFolders().filter((f) => f !== name));
  allSongIds().forEach((id) => {
    const folders = readSongFolders(id);
    if (folders.includes(name)) setSongFolderIds(id, folders.filter((f) => f !== name));
  });
  notify();
}

// ---------- Songs inside folders ----------
export function readSongFolders(songId: string): string[] {
  const stored = readJSON<unknown>(FAV_PREFIX + songId, []);
  return Array.isArray(stored) ? stored.filter((f): f is string => typeof f === 'string') : [];
}

function setSongFolderIds(songId: string, folders: string[]) {
  if (folders.length === 0) {
    localStorage.removeItem(FAV_PREFIX + songId);
    localStorage.removeItem(DATA_PREFIX + songId);
  } else {
    localStorage.setItem(FAV_PREFIX + songId, JSON.stringify(folders));
  }
}

export function writeSongFolders(song: Song, folders: string[]) {
  if (folders.length > 0) {
    localStorage.setItem(DATA_PREFIX + song.id, JSON.stringify(song));
  }
  setSongFolderIds(song.id, folders);
  notify();
}

export function removeSongFromFolder(songId: string, folder: string) {
  setSongFolderIds(songId, readSongFolders(songId).filter((f) => f !== folder));
  notify();
}

export function readFolderSongs(folder: string): Song[] {
  const songs: Song[] = [];
  allSongIds().forEach((id) => {
    if (!readSongFolders(id).includes(folder)) return;
    const song = readJSON<Song | null>(DATA_PREFIX + id, null);
    if (song && song.id) songs.push(song);
  });
  return songs;
}