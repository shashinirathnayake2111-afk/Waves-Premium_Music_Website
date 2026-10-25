export interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

export const allSongs: Song[] = [
  {
    id: 1,
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80'
  },
  {
    id: 2,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80'
  },
  {
    id: 3,
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80'
  },
  {
    id: 4,
    title: 'Levitating',
    artist: 'Dua Lipa',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80'
  },
  {
    id: 5,
    title: 'Peaches',
    artist: 'Justin Bieber',
    cover: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&q=80'
  },
  {
    id: 6,
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    cover: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&q=80'
  }
];
