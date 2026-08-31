import Image from "next/image";
import Link from "next/link";
import { MdHomeFilled, MdLibraryMusic } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['600', '700'],
});

export default function Navbar() {
    return (
        <nav className="h-15 flex justify-between items-center px-6 fixed top-0 left-0 w-full bg-[#1e2639] border-b border-slate-800 z-100">
            <div className="flex gap-6 items-center">
                <Image src="/images/logo.png" alt="logo" width={80} height={80} className="w-13 h-10 rounded-full" />
                <span className={`-ml-5 text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent uppercase ${quicksand.className}`}>Waves</span>
            </div>

            <div className="flex items-center gap-3">
                <div className="bg-slate-800/60 hidden lg:flex items-center w-90 h-10 px-3 gap-3 text-white text-base rounded-full border border-slate-700/50 mr-auto ml-8 transition-all duration-200">
                    <GoSearch className="text-white shrink-0" />
                    <input className="h-full w-full outline-none placeholder:text-slate-400 bg-transparent" type="text" placeholder="What do you want to play?" />
                </div>

                <div className="hidden lg:flex gap-4 items-center">
                    <Link href="/" className="bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white w-10 h-10 grid place-items-center text-2xl rounded-full border border-slate-700/50 transition-all duration-200" title="Home">
                        <MdHomeFilled />
                    </Link>
                    <Link href="/library" className="bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white w-10 h-10 grid place-items-center text-2xl rounded-full border border-slate-700/50 transition-all duration-200" title="Library">
                        <MdLibraryMusic />
                    </Link>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <Link href="/Signup" className="text-slate-300 hover:text-white px-4 py-2 rounded-full text-base font-semibold shadow-md transition-all duration-200">
                    Sign up
                </Link>
                <Link href="/login" className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white px-4 py-2 rounded-full text-base font-semibold shadow-md transition-all duration-200">
                    Log in
                </Link>
            </div>
        </nav>
    )
}