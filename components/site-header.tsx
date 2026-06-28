import Link from 'next/link';
import { navItems } from '@/lib/data';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-400/10 bg-[#020817]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-[min(1528px,calc(100%-40px))] items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="JU FinAnt Club home">
          <img
            src="/images/brand/finant-mark.png"
            alt="JU FinAnt Club"
            className="h-14 w-auto object-contain md:h-16"
          />
        </Link>
        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-lg font-bold text-white/90 hover:text-cyan-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/#partner-with-us" className="hidden rounded-2xl bg-blue-600 px-7 py-4 text-lg font-bold text-white md:block">Partner With Us</Link>
      </div>
    </header>
  );
}
