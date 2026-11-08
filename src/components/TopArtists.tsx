'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FaMicrophone, FaPlay, FaSpinner } from 'react-icons/fa';
import { useMusic } from '@/src/context/MusicContext';
import { useAsync } from '@/src/hooks/useAsync';
import { getPopularArtists, getArtistTracks } from '@/src/lib/jamendo';
import ArtistImage from '@/src/components/ArtistImage';
import { CardSkeletons, ErrorBox } from '@/src/components/AsyncState';
import type { Artist } from '@/src/types/music';

export default function TopArtists() {
  const { playSong } = useMusic();
  const { data: artists, loading, error, reload } = useAsync(() => getPopularArtists(10));

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [playError, setPlayError] = useState<string | null>(null);

  const handlePlayArtist = async (artist: Artist) => {
    setPlayError(null);
    setLoadingId(artist.id);
    try {
      const tracks = await getArtistTracks(artist.id, 20);
      if (tracks.length === 0) {
        setPlayError(`No songs found for ${artist.name}.`);
      } else {
        playSong(tracks[0], tracks);
      }
    } catch (err) {
      setPlayError(err instanceof Error ? err.message : "Couldn't load this artist's songs.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="mt-2">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaMicrophone className="text-purple-500 text-xl" />
          <h2 className="text-xl font-bold text-white">Top artists</h2>
        </div>
        <Link href="/artists" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
          See all
        </Link>
      </div>

      {playError && <p role="alert" className="text-sm text-amber-300 mb-3">{playError}</p>}
      {loading && <CardSkeletons count={7} round />}
      {error && <ErrorBox message={`Couldn't load artists. ${error}`} onRetry={reload} />}

      {artists && (
        <div className="flex items-center gap-8 sm:gap-12 overflow-x-auto pb-4 pt-1 [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {artists.map((artist) => (
            <div key={artist.id} onClick={() => handlePlayArtist(artist)}
              className="flex flex-col items-center group text-center cursor-pointer p-2 transition duration-300 shrink-0">

              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-linear-to-tr from-indigo-600 via-pink-500 to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-xl">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900">
                  <ArtistImage name={artist.name} image={artist.image} className="w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <button onClick={(e) => { e.stopPropagation(); handlePlayArtist(artist); }}
                  aria-label={`Play ${artist.name}`}
                  className="absolute bottom-1 right-1 w-9 h-9 bg-purple-600 hover:bg-purple-500 text-white rounded-full flex items-center justify-center shadow-xl opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-300 hover:scale-110 z-10 cursor-pointer">
                  {loadingId === artist.id ? <FaSpinner className="animate-spin text-sm" /> : <FaPlay className="ml-0.5 text-sm" />}
                </button>
              </div>

              <h4 className="font-semibold text-white text-base mt-3 truncate w-32 sm:w-36 group-hover:text-purple-400 transition-colors">
                {artist.name}
              </h4>
              <p className="text-sm text-gray-400 truncate w-32 sm:w-36 mt-0.5">Artist</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}