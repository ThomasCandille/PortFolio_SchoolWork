import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full bg-pink-200 shadow-md px-4 py-3">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-pink-800">
                    Portfolio
                </Link>
                <div className="flex space-x-4">
                    <Link href="/admin" className="text-pink-700 hover:text-pink-900 transition-colors">
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
}
