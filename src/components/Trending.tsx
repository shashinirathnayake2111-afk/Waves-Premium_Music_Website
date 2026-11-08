'use client'

import Link from 'next/link';
import React from 'react';
import { FaFire } from 'react-icons/fa';
import SongCard from '@/src/components/SongCard';
import TopArtists from '@/src/components/TopArtists';
import TopAlbums from '@/src/components/TopAlbums';
import { CardSkeletons, ErrorBox } from '@/src/components/AsyncState';
import { useAsync } from '@/src/hooks/useAsync';
import { getTrendingTracks } from '@/src/lib/jamendo';

export default function Trending() {
  const { data: songs, loading, error, reload } = useAsync(() => getTrendingTracks(12));

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaFire className="text-orange-500 text-xl" />
          <h2 className="text-xl font-bold text-white">Trending now</h2>
        </div>

        <Link href="/trending" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
          All songs
        </Link>
      </div>

      {loading && <CardSkeletons count={6} />}
      {error && <ErrorBox message={`Couldn't load trending songs. ${error}`} onRetry={reload} />}

      {songs && (
        <div className="flex gap-8 overflow-x-auto pb-4 [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {songs.map((song) => (
            <div key={song.id} className="shrink-0 w-48">
              <SongCard song={song} queue={songs} />
            </div>
          ))}
        </div>
      )}

      <TopArtists />
      <TopAlbums />
    </section>
  );
}