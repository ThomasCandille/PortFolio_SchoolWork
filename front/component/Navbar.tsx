import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full bg-gradient-to-r from-pink-50 to-pink-200 shadow-lg px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-semibold text-pink-800 tracking-tight">
                    Portfolio
                </Link>
                <div className="flex space-x-10">
                    <Link href="/projets" className="font-medium text-pink-700 hover:text-pink-900 hover:underline transition-all">
                        Projets
                    </Link>
                    <Link href="/admissions" className="font-medium text-pink-700 hover:text-pink-900 hover:underline transition-all">
                        Admissions
                    </Link>
                    <Link href="/admin" className="font-medium text-pink-700 hover:text-pink-900 hover:underline transition-all">
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
}
