import Link from 'next/link';
import { ArrowRight, ScrollText, Shield, Trophy } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { tournamentRounds } from '@/lib/data';

export default function BiztigationPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#020616] py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(201,161,74,.22),transparent_38%)]" />
        <div className="section-shell text-center">
          <Reveal>
            <p className="mx-auto mb-5 inline-flex rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
              Inter-University Business Case Competition
            </p>
            <h1 className="font-display text-6xl font-bold leading-none text-white md:text-8xl">Biztigation 2.0</h1>
            <div className="gold-line mx-auto my-8 max-w-xl" />
            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/68">
              Enter the arena of strategy. Solve real business problems, defend your ideas, and compete before academic and corporate evaluators.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#register" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy shadow-glow transition hover:-translate-y-1 hover:bg-parchment">
                Register Your Team <ArrowRight size={18} />
              </a>
              <Link href="/#partner-with-us" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10">
                Partner With Biztigation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#070f22] py-20">
        <div className="section-shell">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Tournament Structure</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">Three rounds. One strategic finale.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {tournamentRounds.map((round, index) => (
              <Reveal key={round.title} delay={index * 0.08}>
                <div className="parchment-card h-full rounded-3xl p-7 shadow-2xl transition hover:-translate-y-2">
                  <p className="font-display text-5xl font-bold text-navy/20">{round.step}</p>
                  <h3 className="mt-4 font-display text-3xl font-bold text-navy">{round.title}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.22em] text-finantBlue">{round.subtitle}</p>
                  <p className="mt-5 leading-7 text-slate-700">{round.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#020616] py-20">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {[
            { icon: Trophy, title: 'Rewards of the Arena', text: 'Prize pool, finalist recognition, and high-visibility competitive achievement.' },
            { icon: Shield, title: 'Council of Evaluators', text: 'Evaluation by academic mentors, industry professionals, and business leaders.' },
            { icon: ScrollText, title: 'Code of Competition', text: 'Fair evaluation, clear instructions, structured case submission, and disciplined communication.' }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="card-border h-full rounded-3xl p-7">
                  <Icon className="text-gold" size={34} />
                  <h3 className="mt-5 font-display text-3xl font-bold text-white">{item.title}</h3>
                  <p className="mt-4 leading-7 text-white/62">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="register" className="bg-[#071122] py-20">
        <div className="section-shell rounded-[2rem] border border-gold/20 bg-gold/10 p-8 text-center md:p-12">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Team Entry</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">Registration form will be embedded here.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/65">We will connect the final Tally form after you create the registration system.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
