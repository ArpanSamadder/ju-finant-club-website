import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { heroBackground } from '@/lib/brand-assets';
import { eventCards, partnerValues, pillars } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <section
        className="relative isolate -mt-px min-h-[calc(100svh-6rem)] overflow-hidden bg-[#020915] pb-20 pt-16 md:pt-24 lg:pb-28"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(2, 9, 21, 0.82) 0%, rgba(2, 9, 21, 0.66) 34%, rgba(2, 9, 21, 0.08) 62%, rgba(2, 9, 21, 0.06) 100%), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_73%,rgba(56,189,248,0.22),transparent_26%),linear-gradient(180deg,rgba(1,8,24,0)_64%,#071122_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020915]/55 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#071122] to-transparent" />

        <div className="mx-auto flex min-h-[calc(100svh-12rem)] w-[min(1460px,calc(100%-40px))] items-center">
          <Reveal>
            <div className="max-w-[760px] pt-10 md:pt-16">
              <h1 className="max-w-4xl text-[clamp(3.4rem,7vw,7.6rem)] font-black leading-[0.95] tracking-[-0.06em] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,0.55)]">
                Building <span className="bg-gradient-to-r from-[#23b6ff] via-[#1777ff] to-[#0b55df] bg-clip-text text-transparent">Future-Ready</span>
                <br />
                Professionals.
              </h1>

              <p className="mt-9 text-[clamp(1.85rem,3.1vw,3rem)] font-bold leading-tight tracking-[-0.035em] text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
                Jahangirnagar University
                <br />
                <span className="bg-gradient-to-r from-[#4cc9ff] to-[#1f65ff] bg-clip-text text-transparent">FinAnt Club</span>
              </p>

              <p className="mt-7 max-w-xl text-[clamp(1.05rem,1.6vw,1.42rem)] leading-8 text-white/82">
                A student-led institution for business learning, leadership, and industry-connected experiences.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="#what-finant-does" className="inline-flex min-w-56 items-center justify-center gap-5 rounded-xl border border-cyan-200/25 bg-gradient-to-r from-[#0062d8] to-[#1a7dff] px-8 py-5 text-lg font-bold text-white shadow-[0_22px_55px_rgba(0,105,255,0.35)] transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,105,255,0.48)]">
                  Explore FinAnt <ArrowRight size={24} strokeWidth={2.5} />
                </Link>
                <Link href="/biztigation" className="inline-flex min-w-56 items-center justify-center gap-5 rounded-xl border border-white/65 bg-[#050b1f]/35 px-8 py-5 text-lg font-bold text-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-300/10">
                  Biztigation 2.0 <ArrowRight size={24} strokeWidth={2.5} />
                </Link>
              </div>
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
