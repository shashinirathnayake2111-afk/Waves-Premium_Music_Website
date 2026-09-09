"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'

export default function SignupPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Hurry! You created a waves account:', formData);
    };

    return (
        <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
            <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-1 bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Join with Waves.lk</h1>
                    <p className="text-gray-400">Signup to enjoy unlimited music </p>
                </div>

                <form className="space-y-4" noValidate onSubmit={handleSubmit}>
                    {/* User Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">User Name</label>
                        <div className="relative flex items-center">
                            <FaUser className="absolute left-3 text-gray-400 text-sm" />
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Kashmira Rathnayake"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-all placeholder-gray-600" />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <div className="relative flex items-center">
                            <FaEnvelope className="absolute left-3 text-gray-400 text-sm" />
                            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="kashmirar@gmail.com"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-all placeholder-gray-600"/>
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative flex items-center mb-8">
                            <FaLock className="absolute left-3 text-gray-400 text-sm" />
                            <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-all placeholder-gray-600"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400 hover:text-white transition-colors">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center w-full mt-6">
                        <button type="submit" className="w-full py-2 px-4 rounded-lg bg-linear-to-r from-indigo-600 to-pink-600 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-purple-900/30">
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-300">
                    Already have an account?
                    <Link href="/login" className="text-purple-500 font-medium hover:underline ml-1">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    )
}