import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { eventCards, metrics, pillars } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy pb-24 pt-20">
        <div className="absolute inset-0 -z-10 bg-radial-gold" />
        <div className="section-shell grid min-h-[72vh] items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <p className="mb-5 inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold">
              Official Website · Jahangirnagar University FinAnt Club
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl">
              Building AI-Native Professionals for Bangladesh’s Business Future.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
              JU FinAnt Club is a student-led institution focused on professional development, finance and business learning, leadership growth, AI-powered productivity, and corporate-ready execution.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/biztigation" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy shadow-glow transition hover:-translate-y-1 hover:bg-parchment">
                Explore Biztigation 2.0 <ArrowRight size={18} />
              </Link>
              <Link href="/join" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10">
                Join JU FinAnt Club
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.18}>
            <div className="relative rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-[1.5rem] border border-gold/20 bg-[#071633]/80 p-7">
                <div className="grid gap-4">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <span className="text-sm text-white/58">{metric.label}</span>
                      <span className="font-display text-3xl font-bold text-gold">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#071122] py-20">
        <div className="section-shell">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">What FinAnt Does</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">A platform for capability, leadership, and corporate readiness.</h2>
              <p className="mt-5 text-white/64">Every workshop, event, competition, partnership, and system is designed to create capable people who can lead, communicate, build, and execute.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={index * 0.07}>
                  <div className="card-border h-full rounded-3xl p-6 transition hover:-translate-y-2 hover:border-gold/40">
                    <Icon className="text-gold" size={34} />
                    <h3 className="mt-5 font-display text-2xl font-bold text-white">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/60">{pillar.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-navy py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal direction="left">
            <div className="sticky top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Featured Initiative</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">Biztigation 2.0</h2>
              <p className="mt-5 text-white/64">A premium inter-university business case competition built around real-world corporate challenges.</p>
              <Link href="/biztigation" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-navy transition hover:bg-gold">
                Visit Event Page <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-5">
            {eventCards.map((event, index) => (
              <Reveal key={event.title} direction="right" delay={index * 0.08}>
                <Link href={event.href} className="block rounded-3xl border border-white/10 bg-white/[0.055] p-7 transition hover:-translate-x-2 hover:border-gold/40 hover:bg-white/[0.08]">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{event.category}</p>
                  <h3 className="mt-3 font-display text-3xl font-bold text-white">{event.title}</h3>
                  <p className="mt-3 text-white/62">{event.description}</p>
                  <p className="mt-5 text-sm text-white/45">{event.stats}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
