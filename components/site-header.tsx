'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '@/lib/data';

function FinAntMark() {
  return (
    <div className="relative h-12 w-12" aria-hidden="true">
      <div className="absolute left-0 top-2 h-9 w-5 skew-x-[-18deg] rounded bg-gradient-to-br from-cyan-300 via-blue-500 to-blue-950" />
      <div className="absolute right-1 top-4 h-7 w-5 skew-x-[-18deg] rounded bg-gradient-to-br from-cyan-200 via-blue-500 to-blue-950" />
      <div className="absolute bottom-2 left-5 h-4 w-4 skew-x-[-18deg] rounded bg-gradient-to-br from-blue-400 to-blue-950" />
    </div>
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-400/10 bg-[#020915]/85 shadow-2xl backdrop-blur-2xl">
      <div className="section-shell flex h-24 items-center justify-between gap-6 lg:h-28">
        <Link href="/" className="group flex items-center gap-4" onClick={() => setIsOpen(false)}>
          <FinAntMark />
          <div>
            <p className="font-display text-xl font-semibold leading-none tracking-wide text-white md:text-2xl">JU FinAnt Club</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.44em] text-cyan-300/90 md:text-xs">Industry · Integrity · Legacy</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="px-1 py-3 text-base font-medium text-white/78 transition hover:text-cyan-300">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/#partner-with-us" className="rounded-2xl border border-cyan-300/20 bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-blue-500">
            Partner With Us
          </Link>
        </div>

        <button type="button" aria-label="Toggle navigation menu" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-white/6 text-white transition hover:border-cyan-300/45 hover:text-cyan-300 lg:hidden">
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
