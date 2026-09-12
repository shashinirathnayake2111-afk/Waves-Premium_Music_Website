'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaPlay, FaFire, FaFileAlt, FaDownload, FaTimes } from 'react-icons/fa'

export default function TrendingPage() {
    const router = useRouter()

    const trendingSongs = [
        { id: 1, rank: 1, title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80', lyrics: "The club isn't the best place to find a lover\nSo the bar is where I go..." },
        { id: 2, rank: 2, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80', lyrics: "I've been tryin' to call\nI've been on my own for long enough..." },
        { id: 3, rank: 3, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80', lyrics: "I do the same thing I told you that I never would..." },
        { id: 4, rank: 4, title: 'Levitating', artist: 'Dua Lipa', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80', lyrics: "If you wanna run away with me, I know a galaxy..." },
        { id: 5, rank: 5, title: 'Bad Habits', artist: 'Ed Sheeran', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80', lyrics: "Every time you come around, you know I can't say no..." },
        { id: 6, rank: 6, title: 'Save Your Tears', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80', lyrics: "I saw you dancing in a crowded room..." },
        { id: 7, rank: 7, title: 'Peaches', artist: 'Justin Bieber', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80', lyrics: "I got my peaches out in Georgia..." },
        { id: 8, rank: 8, title: 'Industry Baby', artist: 'Lil Nas X', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80', lyrics: "Baby welcome to the circus, like I'm Ringling..." },
    ]

    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const [activeLyrics, setActiveLyrics] = useState<{ title: string; artist: string; text: string } | null>(null);

    const handleDownload = (songTitle: string, audioUrl: string) => {
        const link = document.createElement('a');
        link.href = audioUrl || '#';
        link.download = `${songTitle}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setActiveMenuId(null);
    };

    const openLyricsModal = (song: typeof trendingSongs[0]) => {
        setActiveLyrics({
            title: song.title,
            artist: song.artist,
            text: song.lyrics || 'Lyrics are not available for this song.'
        });
        setActiveMenuId(null);
    };

    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 m-4 text-white">
            <div className="w-full px-3 pt-10 pb-8 text-white">

                <div className="flex items-center gap-2 mb-6">
                    <FaFire className="text-orange-500 text-xl" />
                    <h2 className="text-2xl font-bold text-white">Trending Songs</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {trendingSongs.map((song) => (
                        <div
                            key={song.id}
                            className="group relative bg-white/5 border border-white/5 hover:border-white/20 p-3.5 rounded-2xl transition-all duration-300 hover:bg-white/10 flex flex-col justify-between w-full"
                        >

                            <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800">
                                <span className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/10">
                                    #{song.rank}
                                </span>

                                <img
                                    src={song.cover}
                                    alt={song.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />

                                <button className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-500 text-white p-3.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl transform translate-y-3 group-hover:translate-y-0 z-10">
                                    <FaPlay className="text-xs ml-0.5" />
                                </button>
                            </div>

                            {/* Card Details & Menu Row */}
                            <div className="flex justify-between items-start gap-2 relative">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white text-base truncate">{song.title}</h3>
                                    <p className="text-sm text-gray-400 truncate mt-0.5">{song.artist}</p>
                                </div>

                                {/* 3-Dots Button & Popup Wrapper */}
                                <div className="relative" ref={activeMenuId === song.id ? menuRef : null}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenuId(activeMenuId === song.id ? null : song.id);
                                        }}
                                        className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
                                    >
                                        <BsThreeDotsVertical />
                                    </button>

                                    {/* Dropdown Menu - Card එකෙන් එළියට නොයන සේ z-index එකතු කර ඇත */}
                                    {activeMenuId === song.id && (
                                        <div className="absolute right-0 bottom-full mb-2 bg-[#1e263c] border border-white/10 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 w-32 text-xs backdrop-blur-md">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDownload(song.title, '');
                                                }}
                                                className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg text-left text-white transition whitespace-nowrap"
                                            >
                                                <FaDownload className="text-purple-400 text-sm" /> Download
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openLyricsModal(song);
                                                }}
                                                className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg text-left text-white transition whitespace-nowrap"
                                            >
                                                <FaFileAlt className="text-blue-400 text-sm" /> Lyrics
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* 📜 Lyrics Modal Popup */}
            {activeLyrics && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-[#182030] border border-white/10 max-w-md w-full rounded-2xl p-6 relative shadow-2xl text-white">
                        <button
                            onClick={() => setActiveLyrics(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10"
                        >
                            <FaTimes />
                        </button>

                        <h3 className="text-xl font-bold mb-1 text-purple-400">{activeLyrics.title}</h3>
                        <p className="text-xs text-gray-400 mb-4">{activeLyrics.artist}</p>

                        <div className="max-h-60 overflow-y-auto bg-white/5 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line border border-white/5 text-gray-200">
                            {activeLyrics.text}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}