import Link from 'next/link';
import { ArrowRight, Handshake } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { partnerValues } from '@/lib/data';

export default function PartnersPage() {
  return (
    <section className="bg-navy py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <Reveal direction="left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Partners</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white md:text-7xl">Partnerships built for brand equity and talent access.</h1>
          <p className="mt-6 text-white/64">This is the sponsor-facing side of JU FinAnt Club: sponsorship, corporate advisory, club collaboration, academic partnership, and long-term institutional relationship building.</p>
          <Link href="mailto:ju.finantclub@gmail.com" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy shadow-glow transition hover:-translate-y-1 hover:bg-parchment">
            Contact Partnership Team <ArrowRight size={18} />
          </Link>
        </Reveal>
        <div className="grid gap-5">
          {partnerValues.map((value, index) => (
            <Reveal key={value} direction="right" delay={index * 0.08}>
              <div className="card-border flex gap-5 rounded-3xl p-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold">
                  <Handshake size={24} />
                </div>
                <p className="leading-7 text-white/70">{value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
