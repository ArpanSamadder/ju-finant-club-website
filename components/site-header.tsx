'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '@/lib/data';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/82 backdrop-blur-2xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-gold/40 bg-white/5 shadow-glow">
            <span className="font-display text-2xl font-bold text-gold">F</span>
          </div>
          <div>
            <p className="font-display text-xl font-bold leading-none tracking-wide text-white">JU FinAnt Club</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-gold/80">Industry · Integrity · Legacy</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/72 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/partners"
            className="rounded-full border border-gold/45 bg-gold px-5 py-2.5 text-sm font-semibold text-navy shadow-glow transition hover:-translate-y-0.5 hover:bg-parchment"
          >
            Partner With Us
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/6 text-white transition hover:border-gold/45 hover:text-gold lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-navy/96 px-5 pb-6 pt-3 shadow-2xl lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-semibold text-white/82 transition hover:border-gold/35 hover:bg-gold/10 hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/partners"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-2xl border border-gold/45 bg-gold px-4 py-3 text-center text-sm font-bold text-navy shadow-glow transition hover:bg-parchment"
            >
              Partner With Us
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
