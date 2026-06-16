import Link from 'next/link';
import { navItems } from '@/lib/data';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#030713] py-14">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.3fr_.7fr_.7fr]">
        <div>
          <p className="font-display text-3xl font-bold text-white">JU FinAnt Club</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/62">
            A student-led institution of Jahangirnagar University focused on AI-native capability, finance and business learning, leadership, and corporate readiness.
          </p>
          <div className="mt-6 h-px w-56 bg-gradient-to-r from-gold to-transparent" />
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-gold">Navigate</p>
          <div className="grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/62 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-gold">Contact</p>
          <div className="grid gap-3 text-sm text-white/62">
            <p>Jahangirnagar University</p>
            <p>Department of Finance and Banking</p>
            <p>ju.finantclub@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
