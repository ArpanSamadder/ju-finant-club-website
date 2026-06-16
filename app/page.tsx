import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="bg-[#071122] text-white">
      <section className="relative min-h-[calc(100svh-96px)] overflow-hidden bg-[#020817]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_55%,rgba(0,116,255,.42),transparent_30%),linear-gradient(120deg,#020817_0%,#07183a_50%,#020817_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(rgba(31,120,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(31,120,255,.14)_1px,transparent_1px)] bg-[size:64px_64px] opacity-70" />
        <div className="absolute right-[-5vw] top-[14%] hidden w-[58vw] max-w-[820px] lg:block">
          <div className="absolute left-[18%] top-[70%] h-24 w-[78%] rounded-[50%] border-2 border-cyan-300/55 shadow-[0_0_55px_rgba(34,211,238,.52)]" />
          <img src="/finant-logo.svg" alt="FinAnt" className="relative z-10 w-full drop-shadow-[0_0_80px_rgba(0,132,255,.72)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/82 to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100svh-96px)] w-[min(1528px,calc(100%-40px))] items-center py-20">
          <div className="max-w-[850px]">
            <h1 className="font-body text-[clamp(3.2rem,5.7vw,6.3rem)] font-black leading-[1.04] tracking-[-0.065em] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,.55)]">
              Building <span className="bg-gradient-to-r from-[#2cc8ff] via-[#1684ff] to-[#0b59ed] bg-clip-text text-transparent">Future-Ready</span><br />Professionals.
            </h1>
            <p className="mt-9 text-[clamp(1.55rem,2.7vw,3rem)] font-extrabold leading-tight tracking-[-0.035em] text-white">
              Jahangirnagar University<br />
              <span className="bg-gradient-to-r from-[#4cc9ff] to-[#1f65ff] bg-clip-text text-transparent">FinAnt Club</span>
            </p>
            <p className="mt-6 max-w-[560px] text-[clamp(1rem,1.35vw,1.32rem)] leading-8 text-white/82">
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
