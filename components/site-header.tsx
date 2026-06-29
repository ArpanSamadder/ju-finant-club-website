'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navItems } from '@/lib/data';

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const iconFor = (label: string) => {
    const base = 'h-8 w-8 text-[#1597ff] drop-shadow-[0_0_14px_rgba(21,151,255,.45)]';

    if (label === 'Home') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={base}>
          <path d="M3 10.7 12 3l9 7.7" />
          <path d="M5.6 9.2v10.1h4.6v-5.7h3.6v5.7h4.6V9.2" />
        </svg>
      );
    }

    if (label === 'Biztigation 2.0') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={base}>
          <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
          <path d="M8 6H5.5a2.5 2.5 0 0 0 0 5H8" />
          <path d="M16 6h2.5a2.5 2.5 0 0 1 0 5H16" />
          <path d="M12 11v5" />
          <path d="M8.5 20h7" />
          <path d="M10 16h4" />
        </svg>
      );
    }

    if (label === 'Initiatives') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={base}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="m15 9 4-4" />
          <path d="M19 5v4h-4" />
        </svg>
      );
    }

    if (label === 'People') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={base}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M15.5 14.2A5 5 0 0 1 21 19" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={base}>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
        <path d="M18 8v7" />
        <path d="M14.5 11.5h7" />
      </svg>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-400/10 bg-[#020817]/90 backdrop-blur-xl max-lg:bg-[#020817]/96">
      <div className="mx-auto flex h-20 w-[min(1528px,calc(100%-40px))] items-center justify-between gap-6 max-lg:h-[8.6rem] max-lg:w-full max-lg:px-[6vw] max-sm:h-[7.6rem]">
        <Link href="/" className="flex items-center gap-4 max-lg:gap-5 max-sm:gap-3" aria-label="JU FinAnt Club home">
          <img
            src="/images/brand/finant-mark.png"
            alt="JU FinAnt Club"
            className="h-14 w-auto object-contain md:h-16 max-lg:h-[4.75rem] max-sm:h-[3.85rem]"
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[1.72rem] font-medium tracking-[0.02em] text-white drop-shadow-[0_8px_20px_rgba(0,0,0,.55)] max-lg:text-[2.05rem] max-sm:text-[1.5rem]">
              JU FinAnt Club
            </span>
            <span className="mt-2 font-body text-[0.78rem] font-semibold uppercase tracking-[0.42em] text-[#1597ff] drop-shadow-[0_6px_18px_rgba(0,118,255,.35)] max-lg:text-[0.8rem] max-lg:tracking-[0.44em] max-sm:text-[0.58rem] max-sm:tracking-[0.34em]">
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

        <Link href="/#partner-with-us" className="hidden rounded-2xl bg-blue-600 px-7 py-4 text-lg font-bold text-white lg:block">Partner With Us</Link>

        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setMobileMenuOpen(true)}
          className="hidden h-[5rem] w-[5rem] shrink-0 items-center justify-center rounded-2xl border border-[#115FEB] bg-[#030817]/76 shadow-[0_0_34px_rgba(17,95,235,.22),inset_0_0_26px_rgba(17,95,235,.10)] lg:hidden max-sm:h-[3.9rem] max-sm:w-[3.9rem]"
        >
          <span className="flex flex-col gap-[0.48rem] max-sm:gap-[0.35rem]">
            <span className="h-[3px] w-10 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,.55)] max-sm:w-8" />
            <span className="h-[3px] w-10 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,.55)] max-sm:w-8" />
            <span className="h-[3px] w-10 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,.55)] max-sm:w-8" />
          </span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation backdrop"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-[#020817]/18"
          />

          <aside className="absolute right-4 top-6 w-[min(78vw,410px)] rounded-[2.1rem] border border-[#115FEB]/85 bg-[linear-gradient(145deg,rgba(5,16,42,.98),rgba(1,7,22,.98))] px-8 pb-8 pt-8 shadow-[0_0_0_1px_rgba(0,217,255,.20),-18px_0_70px_rgba(17,95,235,.28),inset_0_0_42px_rgba(17,95,235,.18)] max-sm:right-3 max-sm:top-4 max-sm:w-[82vw] max-sm:rounded-[1.6rem] max-sm:px-6">
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
              className="ml-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#115FEB]/85 text-white shadow-[0_0_28px_rgba(17,95,235,.22)] max-sm:h-12 max-sm:w-12"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-8 w-8 max-sm:h-6 max-sm:w-6">
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>

            <nav className="mt-9 space-y-0 max-sm:mt-7">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-7 border-b border-white/10 py-7 text-[1.55rem] font-bold tracking-[-0.035em] transition max-sm:gap-5 max-sm:py-5 max-sm:text-[1.22rem] ${
                      active ? 'text-white' : 'text-white/92 hover:text-[#53d6ff]'
                    }`}
                  >
                    {iconFor(item.label)}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/#partner-with-us"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-9 flex h-20 items-center justify-center rounded-2xl border border-cyan-200/30 bg-[#115FEB] text-center text-[1.65rem] font-bold tracking-[-0.035em] text-white shadow-[0_0_34px_rgba(17,95,235,.42)] max-sm:mt-7 max-sm:h-16 max-sm:text-[1.25rem]"
            >
              Partner With Us
            </Link>
          </aside>
        </div>
      )}
    </header>
  );
}
