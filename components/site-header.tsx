'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/data';

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-400/10 bg-[#020817]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-[min(1528px,calc(100%-40px))] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-4" aria-label="JU FinAnt Club home">
          <img
            src="/images/brand/finant-mark.png"
            alt="JU FinAnt Club"
            className="h-14 w-auto object-contain md:h-16"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-serif text-[1.72rem] font-medium tracking-[0.02em] text-white drop-shadow-[0_8px_20px_rgba(0,0,0,.55)]">
              JU FinAnt Club
            </span>
            <span className="mt-2 font-body text-[0.78rem] font-semibold uppercase tracking-[0.42em] text-[#1597ff] drop-shadow-[0_6px_18px_rgba(0,118,255,.35)]">
              INDUSTRY · INTEGRITY · LEGACY
            </span>
          </span>
        </Link>

        <nav className="hidden h-full items-center gap-10 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex h-full items-center whitespace-nowrap text-lg font-bold transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-[#1597ff] after:shadow-[0_0_14px_rgba(21,151,255,.72)] after:transition-transform after:duration-300 ${
                  active
                    ? 'text-[#53d6ff] after:scale-x-100'
                    : 'text-white/90 hover:text-cyan-300 after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/#partner-with-us" className="hidden rounded-2xl bg-blue-600 px-7 py-4 text-lg font-bold text-white md:block">Partner With Us</Link>
      </div>
    </header>
  );
}
