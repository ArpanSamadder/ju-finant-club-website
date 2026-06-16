import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { exactHeroBackground } from '@/lib/exact-hero-background';

export default function HomePage() {
  return (
    <main className="bg-[#071122] text-white">
      <section className="relative min-h-[calc(100svh-96px)] overflow-hidden bg-[#020817]">
        <img src={exactHeroBackground} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/92 via-[#020817]/54 to-[#020817]/8" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#071122] to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100svh-96px)] w-[min(1528px,calc(100%-40px))] items-center py-20">
          <div className="max-w-[760px] translate-y-6">
            <h1 className="font-body text-[clamp(3rem,5.15vw,5.9rem)] font-black leading-[1.08] tracking-[-0.06em] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,.55)]">
              Building <span className="bg-gradient-to-r from-[#38c6ff] via-[#1684ff] to-[#0b59ed] bg-clip-text text-transparent">Future-Ready</span><br />Professionals.
            </h1>
            <p className="mt-9 text-[clamp(1.45rem,2.5vw,2.75rem)] font-extrabold leading-tight tracking-[-0.035em] text-white">
              Jahangirnagar University<br />
              <span className="bg-gradient-to-r from-[#4cc9ff] to-[#1f65ff] bg-clip-text text-transparent">FinAnt Club</span>
            </p>
            <p className="mt-6 max-w-[560px] text-[clamp(1rem,1.25vw,1.25rem)] leading-8 text-white/84">
              A student-led institution for business learning, leadership, and industry-connected experiences.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="#what-finant-does" className="inline-flex min-w-56 items-center justify-center gap-5 rounded-xl border border-cyan-200/25 bg-gradient-to-r from-[#0062d8] to-[#1a7dff] px-8 py-5 text-lg font-bold text-white shadow-[0_22px_55px_rgba(0,105,255,.35)] transition hover:-translate-y-1">
                Explore FinAnt <ArrowRight size={24} strokeWidth={2.5} />
              </Link>
              <Link href="/biztigation" className="inline-flex min-w-56 items-center justify-center gap-5 rounded-xl border border-white/65 bg-[#050b1f]/35 px-8 py-5 text-lg font-bold text-white backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300">
                Biztigation 2.0 <ArrowRight size={24} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="what-finant-does" className="py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">What FinAnt Does</p>
        <h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold md:text-5xl">A platform for capability, leadership, and corporate readiness.</h2>
      </section>
    </main>
  );
}
