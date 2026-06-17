import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="bg-[#071122] text-white">
      <section className="relative min-h-[calc(100svh-78px)] overflow-hidden bg-[#020817]">
        <img
          src="/images/hero/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/18 via-[#020817]/8 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_52%,rgba(2,8,23,0.28),transparent_36%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071122] to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100svh-78px)] w-[min(1560px,calc(100%-128px))] items-center py-16 max-lg:w-[min(100%-40px,900px)] max-lg:items-start max-lg:pt-28">
          <div className="max-w-[730px] translate-y-2 max-lg:translate-y-0">
            <h1 className="font-body text-[clamp(4rem,5.3vw,6.35rem)] font-black leading-[1.05] tracking-[-0.065em] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,.62)] max-lg:text-[clamp(3.1rem,12vw,5.4rem)]">
              Building <span className="bg-gradient-to-r from-[#39c7ff] via-[#1687ff] to-[#075ef5] bg-clip-text text-transparent">Future-Ready</span><br />Professionals.
            </h1>
            <p className="mt-9 text-[clamp(1.45rem,2.15vw,2.5rem)] font-extrabold leading-tight tracking-[-0.035em] text-white drop-shadow-[0_12px_28px_rgba(0,0,0,.45)]">
              Jahangirnagar University<br />
              <span className="bg-gradient-to-r from-[#4cc9ff] to-[#1f65ff] bg-clip-text text-transparent">FinAnt Club</span>
            </p>
            <p className="mt-6 max-w-[555px] text-[clamp(1rem,1.1vw,1.18rem)] leading-8 text-white/92 drop-shadow-[0_10px_22px_rgba(0,0,0,.45)]">
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
