import Link from 'next/link';
import { navItems } from '@/lib/data';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/82 backdrop-blur-2xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
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

        <Link
          href="/partners"
          className="hidden rounded-full border border-gold/45 bg-gold px-5 py-2.5 text-sm font-semibold text-navy shadow-glow transition hover:-translate-y-0.5 hover:bg-parchment md:inline-flex"
        >
          Partner With Us
        </Link>
      </div>
    </header>
  );
}
