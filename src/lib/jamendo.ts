import type { Album, Artist, Song } from '@/src/types/music';

const BASE_URL = 'https://api.jamendo.com/v3.0';
const CLIENT_ID = process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID;

// ---- Raw Jamendo shapes (only the fields we use) ----
interface JamendoTrack {
  id: string;
  name: string;
  duration: number;
  artist_id: string;
  artist_name: string;
  album_id: string;
  album_name: string;
  album_image: string;
  image: string;
  audio: string;
}

interface JamendoArtist {
  id: string;
  name: string;
  image: string;
}

interface JamendoAlbum {
  id: string;
  name: string;
  artist_id: string;
  artist_name: string;
  image: string;
}

interface JamendoResponse<T> {
  headers: { status: string; code: number; error_message: string };
  results: T[];
}

type Params = Record<string, string | number>;

async function request<T>(path: string, params: Params = {}): Promise<T[]> {
  if (!CLIENT_ID) {
    throw new Error('Missing NEXT_PUBLIC_JAMENDO_CLIENT_ID. Add it to .env.local and restart the dev server.');
  }

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('client_id', CLIENT_ID);
  url.searchParams.set('format', 'json');
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Jamendo request failed (${res.status})`);

  const data = (await res.json()) as JamendoResponse<T>;
  if (data.headers?.status === 'failed') {
    throw new Error(data.headers.error_message || 'Jamendo returned an error');
  }
  return data.results ?? [];
}

// ---- Mappers: Jamendo -> our shared types ----
const mapTrack = (t: JamendoTrack): Song => ({
  id: t.id,
  title: t.name,
  artist: t.artist_name,
  artistId: t.artist_id,
  album: t.album_name,
  albumId: t.album_id,
  coverImage: t.image || t.album_image,
  audioUrl: t.audio,
  duration: t.duration,
});

const mapArtist = (a: JamendoArtist): Artist => ({
  id: a.id,
  name: a.name,
  image: a.image,
});

const mapAlbum = (a: JamendoAlbum): Album => ({
  id: a.id,
  title: a.name,
  artist: a.artist_name,
  artistId: a.artist_id,
  cover: a.image,
});

// mp31 = 96 kbps MP3: small data usage, good enough for phones
const TRACK_PARAMS: Params = { audioformat: 'mp31', imagesize: 300 };

// ---- Public API ----
export async function getTrendingTracks(limit = 12): Promise<Song[]> {
  const tracks = await request<JamendoTrack>('/tracks/', {
    ...TRACK_PARAMS,
    order: 'popularity_week',
    limit,
  });
  return tracks.map(mapTrack);
}

export async function searchTracks(query: string, limit = 20): Promise<Song[]> {
  const tracks = await request<JamendoTrack>('/tracks/', {
    ...TRACK_PARAMS,
    search: query,
    limit,
  });
  return tracks.map(mapTrack);
}

export async function getPopularArtists(limit = 10): Promise<Artist[]> {
  const artists = await request<JamendoArtist>('/artists/', {
    order: 'popularity_week',
    limit,
  });
  return artists.map(mapArtist);
}

export async function getPopularAlbums(limit = 10): Promise<Album[]> {
  const albums = await request<JamendoAlbum>('/albums/', {
    order: 'popularity_week',
    imagesize: 300,
    limit,
  });
  return albums.map(mapAlbum);
}