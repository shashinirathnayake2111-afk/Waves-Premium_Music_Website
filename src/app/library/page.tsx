'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaHeart, FaList, FaMusic, FaPause, FaPlay, FaPlus, FaTimes } from 'react-icons/fa';
import { useModal } from '@/src/context/ModalContext';
import { useMusic, Song } from '@/src/context/MusicContext';
import {
    CatalogSong,
    FAVORITES,
    readFolders,
    readFolderSongs,
    removeSongFromFolder,
} from '@/src/lib/library';

interface Playlist {
    name: string;
    songs: CatalogSong[];
}

const toPlayerSong = (s: CatalogSong): Song => ({
    id: String(s.id),
    title: s.title,
    artist: s.artist,
    coverImage: s.cover,
});

function SongRow({ song, isCurrent, isPlaying, onPlay, onRemove, removeLabel }: {
    song: CatalogSong;
    isCurrent: boolean;
    isPlaying: boolean;
    onPlay: () => void;
    onRemove: () => void;
    removeLabel: string;
}) {
    const showPause = isCurrent && isPlaying;

    return (
        <li className={`flex items-center gap-3 p-2 pr-3 rounded-xl transition ${isCurrent ? 'bg-purple-600/15' : 'hover:bg-white/10'}`}>
            <img src={song.cover} alt="" className="shrink-0 w-14 h-14 rounded-lg object-cover bg-slate-800" />

            <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${isCurrent ? 'text-purple-300' : 'text-white'}`}>{song.title}</p>
                <p className="text-sm text-gray-400 truncate">{song.artist}</p>
            </div>

            <button onClick={onPlay}
                aria-label={showPause ? `Pause ${song.title}` : `Play ${song.title} by ${song.artist}`}
                className="shrink-0 w-10 h-10 grid place-items-center rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 hover:scale-105 active:scale-95 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-purple-300">
                {showPause ? <FaPause className="text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
            </button>

            <button onClick={onRemove} aria-label={removeLabel} title={removeLabel}
                className="shrink-0 w-9 h-9 grid place-items-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-purple-400">
                <FaTimes className="text-sm" />
            </button>
        </li>
    );
}

function EmptyState({ icon, title, hint, action }: {
    icon: React.ReactNode;
    title: string;
    hint: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center text-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 grid place-items-center text-2xl text-purple-400 mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-xs">{hint}</p>
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}

function LibraryContent() {
    const searchParams = useSearchParams();
    const { openCreateModal } = useModal();
    const { playSong, togglePlay, currentSong, isPlaying } = useMusic();

    const [loaded, setLoaded] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const load = () => {
        setPlaylists(readFolders().map((name) => ({ name, songs: readFolderSongs(name) })));
        setLoaded(true);
    };

    useEffect(() => {
        load();
    }, []);

    const selectedName = searchParams.get('playlist');
    const tab = searchParams.get('tab') === 'playlists' ? 'playlists' : 'liked';

    const liked = playlists.find((p) => p.name === FAVORITES)?.songs ?? [];
    const custom = playlists.filter((p) => p.name !== FAVORITES);
    const selected = selectedName ? playlists.find((p) => p.name === selectedName) : undefined;

    const playAll = (songs: CatalogSong[]) => {
        if (songs.length === 0) return;
        const queue = songs.map(toPlayerSong);
        playSong(queue[0], queue);
    };

    const playOne = (songs: CatalogSong[], index: number) => {
        const song = songs[index];
        if (currentSong?.id === String(song.id)) {
            togglePlay();
            return;
        }
        const queue = songs.map(toPlayerSong);
        playSong(queue[index], queue);
    };

    const remove = (songId: number, folder: string) => {
        removeSongFromFolder(songId, folder);
        load();
    };

    const tabClass = (active: boolean) =>
        `px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-purple-400 ${active ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`;

    const renderSongList = (name: string, songs: CatalogSong[]) => (
        <ul className="space-y-1">
            {songs.map((song, i) => (
                <SongRow key={song.id} song={song}
                    isCurrent={currentSong?.id === String(song.id)}
                    isPlaying={isPlaying}
                    onPlay={() => playOne(songs, i)}
                    onRemove={() => remove(song.id, name)}
                    removeLabel={name === FAVORITES ? `Remove ${song.title} from liked songs` : `Remove ${song.title} from ${name}`} />
            ))}
        </ul>
    );

    const createButton = (
        <button onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-indigo-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-900/30 hover:opacity-90 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-purple-300">
            <FaPlus className="text-xs" /> Create playlist
        </button>
    );

    /* ---------- Playlist / liked detail view ---------- */
    if (selectedName) {
        const isLikedView = selectedName === FAVORITES;
        const title = isLikedView ? 'Liked songs' : selectedName;
        const songs = selected?.songs ?? [];

        return (
            <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 m-4 text-white mt-16">
                <Link href={isLikedView ? '/library' : '/library?tab=playlists'}
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-5 focus-visible:outline-2 focus-visible:outline-purple-400 rounded">
                    <FaArrowLeft className="text-xs" /> Back to library
                </Link>

                {loaded && !selected ? (
                    <EmptyState icon={<FaList />} title="Playlist not found"
                        hint="It may have been renamed or deleted."
                        action={<Link href="/library?tab=playlists" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">See all playlists</Link>} />
                ) : (
                    <>
                        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">{title}</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    {songs.length} {songs.length === 1 ? 'song' : 'songs'}
                                </p>
                            </div>
                            <button onClick={() => playAll(songs)} disabled={songs.length === 0}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition cursor-pointer focus-visible:outline-2 focus-visible:outline-purple-300">
                                <FaPlay className="text-xs" /> Play all
                            </button>
                        </div>

                        {songs.length === 0 ? (
                            <EmptyState icon={<FaMusic />} title="No songs here yet"
                                hint="Tap the heart on any song and pick this playlist to add it." />
                        ) : renderSongList(selectedName, songs)}
                    </>
                )}
            </div>
        );
    }

    /* ---------- Main library view ---------- */
    return (
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 m-4 text-white mt-16">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold flex items-center gap-3">
                    <FaMusic className="text-purple-400" /> Your library
                </h2>

                <nav className="flex gap-2" aria-label="Library sections">
                    <Link href="/library" aria-current={tab === 'liked' ? 'page' : undefined} className={tabClass(tab === 'liked')}>
                        <FaHeart /> Liked songs
                    </Link>
                    <Link href="/library?tab=playlists" aria-current={tab === 'playlists' ? 'page' : undefined} className={tabClass(tab === 'playlists')}>
                        <FaList /> Playlists
                    </Link>
                </nav>
            </div>

            {!loaded ? (
                <p className="text-gray-400 text-sm py-10 text-center">Loading your library...</p>
            ) : tab === 'liked' ? (
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-purple-300">
                            Liked songs <span className="text-sm font-normal text-gray-400">({liked.length})</span>
                        </h3>
                        {liked.length > 0 && (
                            <button onClick={() => playAll(liked)}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition cursor-pointer focus-visible:outline-2 focus-visible:outline-purple-300">
                                <FaPlay className="text-[10px]" /> Play all
                            </button>
                        )}
                    </div>

                    {liked.length === 0 ? (
                        <EmptyState icon={<FaHeart />} title="No liked songs yet"
                            hint="Tap the heart on a song and save it to Favorites. It will show up here."
                            action={<Link href="/" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">Browse trending songs</Link>} />
                    ) : renderSongList(FAVORITES, liked)}
                </section>
            ) : (
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-purple-300">
                            Your playlists <span className="text-sm font-normal text-gray-400">({custom.length})</span>
                        </h3>
                        {custom.length > 0 && createButton}
                    </div>

                    {custom.length === 0 ? (
                        <EmptyState icon={<FaList />} title="No playlists yet"
                            hint="Group songs by mood, workout or trip. Start with your first playlist."
                            action={createButton} />
                    ) : (
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                            {custom.map((playlist) => (
                                <li key={playlist.name}>
                                    <Link href={`/library?playlist=${encodeURIComponent(playlist.name)}`}
                                        className="block bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition focus-visible:outline-2 focus-visible:outline-purple-400">
                                        <div className="w-full h-36 rounded-lg mb-3 overflow-hidden bg-linear-to-br from-indigo-600/40 to-pink-600/40 grid place-items-center">
                                            {playlist.songs[0] ? (
                                                <img src={playlist.songs[0].cover} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <FaMusic className="text-3xl text-white/60" />
                                            )}
                                        </div>
                                        <h4 className="font-semibold text-white truncate">{playlist.name}</h4>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}
        </div>
    );
}

export default function LibraryPage() {
    return (
        <Suspense fallback={<div className="text-white p-6 mt-16">Loading your library...</div>}>
            <LibraryContent />
        </Suspense>
    );
}