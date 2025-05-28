import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="flex items-center space-x-4">
        <Link href="/" className="logo">
          <span>CLB</span>Consultancy
        </Link>
        <div className="hidden md:block text-sm italic text-molten/80 font-light">
          "The advancement of the arts is directly related to the advancement of society"
        </div>
      </div>
    </header>
  );
}