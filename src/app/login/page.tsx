"use client";

import Link from 'next/link';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

export default function page() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        setGreeting(getGreeting());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Oops, you haven't fill all the fields.");
            return;
        }
        if (password.length < 6) {
            setError("Try to use a password with at least 6 characters.");
            return;
        }
        setError("");
        console.log("Hurry, you can continue enjoying:", { email, password });
    };

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) return "Ready for fresh beats?";
        if (hour >= 12 && hour < 18) return "Need a music break?";
        if (hour >= 18 && hour < 22) return "Time to unwind!";
        return "Late night vibes?";
    };

    return (
        <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
            <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-1 bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">{getGreeting()}</h1>
                    <p className="text-gray-400">Log in to continue listening </p>
                </div>

                {error && (
                    <div className="text-red-400 p-3 rounded-lg text-sm font-medium bg-red-400/10 text-center mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" noValidate onSubmit={handleSubmit} >
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <div className="relative flex items-center">
                            <FaEnvelope className="absolute left-3 text-gray-400 text-sm" />
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kashmirar@gmail.com" className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-all placeholder-gray-600" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative flex items-center mb-8">
                            <FaLock className="absolute left-3 text-gray-400 text-sm" />
                            <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-all placeholder-gray-600" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400 hover:text-white transition-colors">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-6">
                        <button type="submit" className="w-full py-2 px-4 rounded-lg bg-linear-to-r from-indigo-600 to-pink-600 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-purple-900/30">
                            Log In
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-grey-300">
                    Don't you have an account?{""}
                    <Link href="/signup" className="text-purple-500 font-medium hover:underline ml-1">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}