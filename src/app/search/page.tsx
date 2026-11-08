'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { FaSearch, FaMicrophone, FaMusic, FaSpinner } from 'react-icons/fa';
import SongCard from '@/src/components/SongCard';
import ArtistImage from '@/src/components/ArtistImage';
import { ErrorBox } from '@/src/components/AsyncState';
import { useMusic } from '@/src/context/MusicContext';
import { searchTracks, searchArtists, getArtistTracks } from '@/src/lib/jamendo';
import type { Artist, Song } from '@/src/types/music';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = (searchParams.get('q') || '').trim();
    const router = useRouter();
    const { playSong } = useMusic();

    const [songs, setSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0);
    const [loadingArtistId, setLoadingArtistId] = useState<string | null>(null);

    useEffect(() => {
        if (!query) {
            router.push('/');
            return;
        }

        let cancelled = false;
        setLoading(true);
        setError(null);

        // Wait 400ms after the last keystroke so we don't call the API on every letter
        const timer = setTimeout(async () => {
            try {
                const [foundSongs, foundArtists] = await Promise.all([
                    searchTracks(query, 20),
                    searchArtists(query, 8),
                ]);
                if (cancelled) return;
                setSongs(foundSongs);
                setArtists(foundArtists);
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Something went wrong');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }, 400);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [query, router, attempt]);

    const handlePlayArtist = async (artist: Artist) => {
        setLoadingArtistId(artist.id);
        try {
            const tracks = await getArtistTracks(artist.id, 20);
            if (tracks.length > 0) playSong(tracks[0], tracks);
        } catch {
            setError("Couldn't load this artist's songs.");
        } finally {
            setLoadingArtistId(null);
        }
    };

    const hasResults = songs.length > 0 || artists.length > 0;

    return (
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 m-4 text-white mt-16">
            <h1 className="text-lg font-bold mb-6 flex items-center gap-3">
                <FaSearch className="text-purple-400" /> {query ? `Search results for "${query}"` : 'Search'}
            </h1>

            {loading && (
                <p role="status" className="flex items-center gap-2 text-gray-400 text-sm py-6">
                    <FaSpinner className="animate-spin" /> Searching...
                </p>
            )}

            {error && <ErrorBox message={error} onRetry={() => setAttempt((a) => a + 1)} />}

            {!loading && !error && !hasResults && query && (
                <div className="text-center py-20 text-gray-400">
                    No results found for &quot;{query}&quot;. Try a different name.
                </div>
            )}

            {!loading && hasResults && (
                <div className="space-y-10">
                    {artists.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-300">
                                <FaMicrophone /> Artists
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {artists.map((artist) => (
                                    <button key={artist.id} onClick={() => handlePlayArtist(artist)}
                                        aria-label={`Play songs by ${artist.name}`}
                                        className="flex flex-col items-center group cursor-pointer text-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition duration-300">
                                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-linear-to-tr from-purple-600 via-pink-500 to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                                            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900">
                                                <ArtistImage name={artist.name} image={artist.image} className="w-full h-full text-2xl" />
                                            </div>
                                            {loadingArtistId === artist.id && (
                                                <div className="absolute inset-0 grid place-items-center bg-black/50 rounded-full">
                                                    <FaSpinner className="animate-spin" />
                                                </div>
                                            )}
                                        </div>
                                        <span className="font-semibold text-white text-sm mt-3 truncate w-full group-hover:text-purple-400 transition-colors">
                                            {artist.name}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-0.5">Artist</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {songs.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-300">
                                <FaMusic /> Songs
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                                {songs.map((song) => (
                                    <SongCard key={song.id} song={song} queue={songs} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="text-white p-6 mt-16">Searching...</div>}>
            <SearchResults />
        </Suspense>
    );
}