'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { FaPlay, FaEarlybirds, FaSpinner } from 'react-icons/fa';
import { useMusic } from '@/src/context/MusicContext';
import { useAsync } from '@/src/hooks/useAsync';
import { getPopularAlbums, getAlbumTracks } from '@/src/lib/jamendo';
import { CardSkeletons, ErrorBox } from '@/src/components/AsyncState';
import type { Album } from '@/src/types/music';

export default function TopAlbums() {
  const { playSong } = useMusic();
  const { data: albums, loading, error, reload } = useAsync(() => getPopularAlbums(10));

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [playError, setPlayError] = useState<string | null>(null);

  const handlePlayAlbum = async (album: Album) => {
    setPlayError(null);
    setLoadingId(album.id);
    try {
      const tracks = await getAlbumTracks(album.id);
      if (tracks.length === 0) {
        setPlayError(`No songs found in ${album.title}.`);
      } else {
        playSong(tracks[0], tracks);
      }
    } catch (err) {
      setPlayError(err instanceof Error ? err.message : "Couldn't load this album.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaEarlybirds className="text-pink-500 text-xl" />
          <h2 className="text-xl font-bold text-white">Top albums</h2>
        </div>
        <Link href="/albums" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
          See all
        </Link>
      </div>

      {playError && <p role="alert" className="text-sm text-amber-300 mb-3">{playError}</p>}
      {loading && <CardSkeletons count={6} />}
      {error && <ErrorBox message={`Couldn't load albums. ${error}`} onRetry={reload} />}

      {albums && (
        <div className="flex items-center gap-8 overflow-x-auto pb-4 pt-1 [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {albums.map((album) => (
            <div key={album.id} onClick={() => handlePlayAlbum(album)}
              className="group relative bg-white/5 border border-white/5 hover:border-white/20 p-3 rounded-2xl transition-all duration-300 hover:bg-white/10 flex flex-col w-44 sm:w-48 shrink-0 cursor-pointer">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800">
                <img src={album.cover} alt="" loading="lazy"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />

                <button onClick={(e) => { e.stopPropagation(); handlePlayAlbum(album); }}
                  aria-label={`Play ${album.title}`}
                  className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-500 text-white p-3.5 rounded-full opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-300 shadow-xl z-10 cursor-pointer">
                  {loadingId === album.id ? <FaSpinner className="animate-spin text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-base truncate">{album.title}</h3>
                <p className="text-sm text-gray-400 truncate mt-0.5">{album.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}