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
      </div>
    </header>
  );
}