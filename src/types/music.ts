export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  album?: string;
  albumId?: string;
  coverImage: string;
  audioUrl?: string; 
  duration?: number; 
}

export interface Artist {
  id: string;
  name: string;
  image: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  cover: string;
}