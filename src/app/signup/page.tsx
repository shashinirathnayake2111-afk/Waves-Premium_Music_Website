"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'

export default function SignupPage() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.password) {
            setError("Oops, you haven't fill all the fields.");
            return;
        }

        // 2. Email format check 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("You enter a wrong email address.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Try to use a password with at least 6 characters.");
            return;
        }

        try {

            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Hurry, You registered successfully! Token:', data.token);
                router.push('/')

            } else {
                setError(data.message || 'Oops, Failed to signup. Please try again.');
                console.error('Oops, Failed to signup. Please try again.', data.message);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Oops, Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
            <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-1 bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Join with Waves.lk</h1>
                    <p className="text-gray-400">Signup to enjoy unlimited music </p>
                </div>

                {error && (
                    <div className="text-red-400 p-3 rounded-lg text-sm font-medium bg-red-400/10 text-center mb-4">
                        {error}
                    </div>
                )}

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
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-all placeholder-gray-600" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative flex items-center mb-8">
                            <FaLock className="absolute left-3 text-gray-400 text-sm" />
                            <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-all placeholder-gray-600" />
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