import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const legacyCards = [
  {
    title: 'Biztigation 2024',
    subtitle: 'Business Case Competition',
    image: '/images/brand/biztigation-logo-dark.png',
  },
  {
    title: 'Crackademy 2025',
    subtitle: 'Case Solving Bootcamp',
    image: '/images/brand/finant-logo-dark.png',
  },
  {
    title: 'Job Fair',
    subtitle: 'Industry & Career Engagement',
    image: '/images/brand/department-logo.jpg',
  },
  {
    title: 'Panel Discussion',
    subtitle: 'Leadership from Industry Voices',
    image: '/images/brand/finant-logo.png',
  },
  {
    title: 'Finance Fest',
    subtitle: 'Departmental Legacy Platform',
    image: '/images/brand/ju-logo.png',
  },
  {
    title: 'Publications',
    subtitle: 'Institutional Memory & Thought Leadership',
    image: '/images/brand/finant-logo.png',
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#020817] text-white">
      <section className="relative min-h-[calc(100svh-80px)] overflow-hidden bg-[#020817]">
        <img
          src="/images/hero/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,#020817_0%,rgba(2,8,23,.94)_18%,rgba(2,8,23,.72)_43%,rgba(2,8,23,.18)_72%,rgba(2,8,23,.1)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(0,132,255,.18),transparent_30%),radial-gradient(circle_at_20%_46%,rgba(0,0,0,.42),transparent_42%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020817] via-[#020817]/80 to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100svh-80px)] w-[min(1440px,calc(100%-72px))] items-center pt-8 max-lg:w-[min(100%-32px,900px)] max-lg:items-start max-lg:pt-24">
          <div className="max-w-[660px] pb-14 pt-10 max-lg:max-w-[95%]">
            <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.34em] text-cyan-200/85 shadow-[0_0_35px_rgba(21,171,255,.12)]">
              Jahangirnagar University
            </p>

            <h1 className="font-body text-[clamp(3.65rem,5.35vw,6rem)] font-black leading-[0.96] tracking-[-0.07em] text-white drop-shadow-[0_18px_50px_rgba(0,0,0,.72)] max-md:text-[clamp(3.2rem,14vw,4.8rem)]">
              Building<br />
              <span className="bg-gradient-to-r from-[#43d4ff] via-[#138cff] to-[#075ef5] bg-clip-text text-transparent">Future-Ready</span><br />
              Professionals.
            </h1>

            <p className="mt-7 max-w-[530px] text-[clamp(1rem,1.02vw,1.12rem)] font-medium leading-7 text-white/88 drop-shadow-[0_10px_24px_rgba(0,0,0,.55)]">
              JU FinAnt Club is a student-led institution for business learning, leadership, and industry-connected experiences.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="#legacy-foundation" className="inline-flex min-w-44 items-center justify-center gap-3 rounded-lg border border-cyan-200/25 bg-gradient-to-r from-[#0065e8] to-[#1a8cff] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(0,105,255,.34)] transition hover:-translate-y-1">
                Explore FinAnt <ArrowRight size={19} strokeWidth={2.6} />
              </Link>
              <Link href="/biztigation" className="inline-flex min-w-44 items-center justify-center gap-3 rounded-lg border border-white/30 bg-[#030817]/45 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300">
                Biztigation 2.0 <ArrowRight size={19} strokeWidth={2.6} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="legacy-foundation" className="relative overflow-hidden border-t border-cyan-300/10 bg-[#020817] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(21,171,255,.09),transparent_28%),linear-gradient(180deg,rgba(3,10,28,.35),rgba(2,8,23,1))]" />
        <div className="relative mx-auto w-[min(1440px,calc(100%-72px))] max-lg:w-[min(100%-32px,900px)]">
          <p className="text-xs font-black uppercase tracking-[0.38em] text-cyan-300/80">Legacy Foundation</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,4vw,4.5rem)] font-black leading-[1.02] tracking-[-0.055em] text-white">
            The Departmental Legacy<br className="hidden md:block" /> We Carry Forward
          </h2>

          <div className="mt-10 flex gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {legacyCards.map((card) => (
              <article key={card.title} className="group relative h-[260px] min-w-[310px] overflow-hidden rounded-2xl border border-cyan-300/12 bg-white/[0.035] shadow-[0_20px_70px_rgba(0,0,0,.35)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:shadow-[0_24px_85px_rgba(0,122,255,.22)] md:min-w-[330px]">
                <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-45" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/58 to-transparent" />
                <div className="absolute right-4 top-4 h-8 w-8 rounded-full border border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_35px_rgba(21,171,255,.25)]" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-black tracking-[-0.025em] text-white">{card.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-cyan-100/70">{card.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
