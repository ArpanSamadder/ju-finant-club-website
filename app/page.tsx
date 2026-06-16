import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { eventCards, partnerValues, pillars } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy via-blue-950 to-black pb-24 pt-20">
        <div className="absolute inset-0 -z-10 bg-radial-gold" />
        <div className="section-shell grid min-h-[72vh] items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <p className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
              Official Website · Jahangirnagar University FinAnt Club
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl">
              Building <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">Future-Ready</span> Professionals.
            </h1>
            <p className="mt-7 text-3xl font-bold leading-tight text-white md:text-4xl">
              Jahangirnagar University<br />
              <span className="text-blue-400">FinAnt Club</span>
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
              A student-led institution for business learning, leadership, and industry-connected experiences.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#what-finant-does" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-glow transition hover:-translate-y-1 hover:bg-blue-500">
                Explore FinAnt <ArrowRight size={18} />
              </Link>
              <Link href="/biztigation" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 px-6 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10">
                Biztigation 2.0 <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.18}>
            <div className="relative mx-auto h-96 w-96 max-w-full">
              <div className="absolute left-16 top-12 h-64 w-24 rounded-3xl bg-gradient-to-br from-cyan-200 via-blue-500 to-blue-950 shadow-2xl" />
              <div className="absolute right-14 top-28 h-52 w-24 rounded-3xl bg-gradient-to-br from-cyan-200 via-blue-500 to-blue-950 shadow-2xl" />
              <div className="absolute bottom-24 left-36 h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-950" />
              <div className="absolute bottom-8 left-1/2 h-20 w-72 -translate-x-1/2 rounded-full border border-cyan-300 shadow-glow" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="what-finant-does" className="bg-[#071122] py-20 scroll-mt-24">
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

      <section id="partner-with-us" className="bg-[#071122] py-20 scroll-mt-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <Reveal direction="left">
            <div className="rounded-[2rem] border border-gold/20 bg-gold/10 p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Partner With Us</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">Build brand equity through talent access and institutional collaboration.</h2>
              <p className="mt-5 leading-8 text-white/66">
                JU FinAnt Club creates sponsor-facing platforms through competitions, workshops, corporate sessions, roadshows, publications, and student engagement initiatives. Partnership is handled as a strategic relationship, not only logo placement.
              </p>
              <a href="mailto:ju.finantclub@gmail.com" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy shadow-glow transition hover:-translate-y-1 hover:bg-parchment">
                Contact Partnership Team <ArrowRight size={18} />
              </a>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {partnerValues.map((value, index) => (
              <Reveal key={value} direction="right" delay={index * 0.07}>
                <div className="card-border h-full rounded-3xl p-6 transition hover:-translate-y-2 hover:border-gold/40">
                  <p className="font-display text-4xl font-bold text-gold/35">0{index + 1}</p>
                  <p className="mt-4 leading-7 text-white/72">{value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
