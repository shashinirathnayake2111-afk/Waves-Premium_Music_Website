export interface CatalogSong {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

export const FOLDERS_KEY = 'user_song_folders';
export const FAVORITES = 'Favorites';

export const songCatalog: CatalogSong[] = [
  { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80' },
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80' },
  { id: 3, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80' },
  { id: 4, title: 'Levitating', artist: 'Dua Lipa', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80' },
  { id: 5, title: 'Peaches', artist: 'Justin Bieber', cover: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&q=80' },
  { id: 6, title: 'Good 4 U', artist: 'Olivia Rodrigo', cover: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&q=80' },
];

function readArray(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function readFolders(): string[] {
  const folders = readArray(FOLDERS_KEY);
  return folders.length > 0 ? folders : [FAVORITES];
}

export function readFolderSongs(folder: string): CatalogSong[] {
  return songCatalog.filter((song) => readArray(`song_fav_${song.id}`).includes(folder));
}

export function removeSongFromFolder(songId: number, folder: string) {
  const key = `song_fav_${songId}`;
  const updated = readArray(key).filter((f) => f !== folder);
  localStorage.setItem(key, JSON.stringify(updated));
}