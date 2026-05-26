import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: 'noindex',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-[#9370DB]">404</h1>
        <p className="text-xl text-gray-300 mb-8">
          That page doesn't exist (or never did).
        </p>
        <Link
          href="/home"
          className="inline-block px-6 py-3 border-2 border-[#9370DB] rounded-lg text-white hover:bg-[#9370DB] transition-colors"
        >
          ← Return home
        </Link>
      </div>
    </main>
  );
}
