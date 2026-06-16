'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { finantLogo } from '@/lib/brand-assets';
import { navItems } from '@/lib/data';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-400/10 bg-[#020915]/70 shadow-2xl backdrop-blur-xl">
      <div className="mx-auto flex h-24 w-[min(1460px,calc(100%-40px))] items-center justify-between gap-6 lg:h-28">
        <Link href="/" className="group flex items-center gap-5" onClick={() => setIsOpen(false)}>
          <img src={finantLogo} alt="JU FinAnt Club" className="h-14 w-14 object-contain md:h-16 md:w-16" />
          <div>
            <p className="font-display text-2xl font-semibold leading-none tracking-wide text-white md:text-3xl">JU FinAnt Club</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.55em] text-cyan-300/95 md:text-xs">Industry · Integrity · Legacy</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-12 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative px-1 py-4 text-xl font-semibold text-white/86 transition hover:text-cyan-300">
              {item.label}
              {item.href === '/' ? <span className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" /> : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/#partner-with-us" className="rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-4 text-lg font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-cyan-500">
            Partner With Us
          </Link>
        </div>

        <button type="button" aria-label="Toggle navigation menu" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)} className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-white/8 text-white transition hover:border-cyan-300/45 hover:text-cyan-300 lg:hidden">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-cyan-300/10 bg-[#020915]/96 px-5 pb-6 pt-3 shadow-2xl lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-semibold text-white/82 transition hover:border-cyan-300/35 hover:bg-cyan-400/10 hover:text-cyan-200">
                {item.label}
              </Link>
            ))}
            <Link href="/#partner-with-us" onClick={() => setIsOpen(false)} className="mt-2 rounded-2xl border border-cyan-300/30 bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-glow">
              Partner With Us
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
