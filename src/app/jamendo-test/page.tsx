'use client';

import { useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { getTrendingTracks, searchTracks } from '@/src/lib/jamendo';
import { useMusic } from '@/src/context/MusicContext';
import type { Song } from '@/src/types/music';

export default function JamendoTestPage() {
    const { playSong, togglePlay, currentSong, isPlaying } = useMusic();

    const [songs, setSongs] = useState<Song[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = async (term: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = term.trim() ? await searchTracks(term.trim()) : await getTrendingTracks(20);
            setSongs(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load('');
    }, []);

    const handlePlay = (index: number) => {
        const song = songs[index];
        if (currentSong?.id === song.id) {
            togglePlay();
        } else {
            playSong(song, songs);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 sm:p-6 m-4 mt-15 text-white">
            <h2 className="text-xl font-bold mb-1">Jamendo test</h2>
            <p className="text-sm text-gray-400 mb-4">Temporary page. Checks real songs, real audio, next/previous and the seek bar.</p>

            <form onSubmit={(e) => { e.preventDefault(); load(query); }} className="flex gap-2 mb-6">
                <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search songs"
                    placeholder="Search songs (leave empty for trending)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500" />
                <button type="submit" className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-semibold cursor-pointer transition">
                    Search
                </button>
            </form>

            {loading && <p className="text-gray-400 text-sm">Loading songs...</p>}
            {error && <p role="alert" className="text-red-400 bg-red-400/10 rounded-lg p-3 text-sm">{error}</p>}
            {!loading && !error && songs.length === 0 && <p className="text-gray-400 text-sm">No songs found.</p>}

            <ul className="space-y-1">
                {songs.map((song, i) => {
                    const isCurrent = currentSong?.id === song.id;
                    return (
                        <li key={song.id} className={`flex items-center gap-3 p-2 rounded-xl transition ${isCurrent ? 'bg-purple-600/15' : 'hover:bg-white/10'}`}>
                            <img src={song.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className={`font-semibold truncate ${isCurrent ? 'text-purple-300' : ''}`}>{song.title}</p>
                                <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                            </div>
                            <button onClick={() => handlePlay(i)}
                                aria-label={isCurrent && isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
                                className="w-10 h-10 grid place-items-center rounded-full bg-purple-600 hover:bg-purple-500 transition cursor-pointer shrink-0">
                                {isCurrent && isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}