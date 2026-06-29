import Link from 'next/link';
import {client} from '@/sanity/lib/client';

export const revalidate = 60;

type LegacyCard = {
  _id?: string;
  title: string;
  year?: string;
  shortDescription?: string;
  mainImageUrl?: string;
  eventLogoUrl?: string;
  eventUrl?: string;
  badge?: string;
  accent?: string;
};

const fallbackLegacyCards: LegacyCard[] = [
  {
    title: 'Biztigation',
    badge: 'BIZ\nTIGATION',
    accent: 'from-[#06123d] via-[#071b58] to-[#020817]',
  },
  {
    title: 'Crackademy',
    badge: 'CRACK\nADEMY',
    accent: 'from-[#07152d] via-[#112033] to-[#020817]',
  },
  {
    title: 'Finance Fest',
    badge: 'FINANCE\nFEST',
    accent: 'from-[#071532] via-[#122a48] to-[#020817]',
  },
  {
    title: 'Job Fair',
    badge: 'JOB\nFAIR',
    accent: 'from-[#040b2a] via-[#07184a] to-[#020817]',
  },
];

const legacyAccentFallbacks = [
  'from-[#06123d] via-[#071b58] to-[#020817]',
  'from-[#07152d] via-[#112033] to-[#020817]',
  'from-[#071532] via-[#122a48] to-[#020817]',
  'from-[#040b2a] via-[#07184a] to-[#020817]',
];

function makeBadge(title: string) {
  const words = title.split(' ').filter(Boolean);
  return words.slice(0, 2).join('\n').toUpperCase();
}

async function getLegacyCards() {
  try {
    const cards = await client.fetch<LegacyCard[]>(
      `*[_type == "legacyEvent" && isActive == true] | order(displayOrder asc, _createdAt desc) {
        _id,
        title,
        year,
        shortDescription,
        eventUrl,
        "mainImageUrl": mainImage.asset->url,
        "eventLogoUrl": eventLogo.asset->url
      }`,
      {},
      {next: {revalidate: 60}}
    );

    const cmsCards = cards.map((card, index) => ({
      ...card,
      badge: makeBadge(card.title),
      accent: legacyAccentFallbacks[index % legacyAccentFallbacks.length],
    }));

    const fillers = fallbackLegacyCards.filter(
      (fallback) => !cmsCards.some((card) => card.title.toLowerCase().trim() === fallback.title.toLowerCase().trim())
    );

    return [...cmsCards, ...fillers].slice(0, 4);
  } catch {
    return fallbackLegacyCards;
  }
}

export default async function HomePage() {
  const legacyCards = await getLegacyCards();

  return (
    <div className="bg-[#020817] text-white">
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#020817]">
        <img
          src="/images/hero/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full select-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,.18)_0%,rgba(2,8,23,.08)_42%,rgba(2,8,23,.02)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#020817]/72 to-[#020817]" />

        <div className="absolute left-[6.6vw] top-[6.95vw] z-10 max-w-[760px] max-xl:left-[6.2vw] max-xl:top-[6.5vw] max-lg:left-8 max-lg:top-16">
          <h1 className="font-body font-bold tracking-[-0.052em] drop-shadow-[0_18px_58px_rgba(0,0,0,.74)]">
            <span className="block whitespace-nowrap text-[clamp(2.75rem,4.45vw,5.35rem)] leading-[1.02] max-xl:whitespace-normal max-md:text-[clamp(2.55rem,10.5vw,3.95rem)]">
              <span className="bg-gradient-to-b from-white via-white to-[#bbc2ce] bg-clip-text text-transparent">Building</span>{' '}
              <span className="text-[#115FEB]">Future-Ready</span>
            </span>
            <span className="mt-1 block text-[clamp(3.75rem,5.85vw,7.05rem)] leading-[0.95] tracking-[-0.058em] max-md:text-[clamp(3.15rem,13.5vw,5.15rem)]">
              <span className="bg-gradient-to-b from-white via-white to-[#bbc2ce] bg-clip-text text-transparent">Professionals.</span>
            </span>
          </h1>

          <div className="mt-[2.05vw] text-[clamp(1.62rem,2.46vw,2.94rem)] leading-[1.16] tracking-[-0.044em] drop-shadow-[0_12px_34px_rgba(0,0,0,.55)] max-lg:mt-7 max-md:text-[clamp(1.74rem,7.2vw,2.64rem)]">
            <p className="font-normal text-[#f7fbff]">Jahangirnagar University</p>
            <p className="mt-1 font-bold text-[#115FEB]">FinAnt Club</p>
          </div>

          <p className="mt-3 max-w-[565px] text-[clamp(1.14rem,1.26vw,1.3rem)] font-light leading-[1.42] tracking-[-0.006em] text-white/88 drop-shadow-[0_10px_26px_rgba(0,0,0,.5)]">
            A student-led institution for business learning,<br />
            leadership, and industry-connected experiences.
          </p>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row">
            <Link href="#legacy-foundation" className="group inline-flex min-w-[245px] items-center justify-center gap-12 rounded-md border border-cyan-200/25 bg-[#115FEB] px-8 py-4 text-[1.08rem] font-medium tracking-[-0.01em] text-white shadow-[0_20px_55px_rgba(17,95,235,.38)] transition hover:-translate-y-1 hover:bg-[#1a6bff] max-sm:min-w-0 max-sm:w-full">
              Explore FinAnt <span className="text-3xl font-light leading-none transition group-hover:translate-x-1">&gt;</span>
            </Link>
            <Link href="/biztigation" className="group inline-flex min-w-[245px] items-center justify-center gap-12 rounded-md border border-white/62 bg-[#030817]/32 px-8 py-4 text-[1.08rem] font-medium tracking-[-0.01em] text-white backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300 max-sm:min-w-0 max-sm:w-full">
              Biztigation 2.0 <span className="text-3xl font-light leading-none transition group-hover:translate-x-1">&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="legacy-foundation" className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#020817] px-6 py-[7vw]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(17,95,235,.16),transparent_31%),radial-gradient(circle_at_50%_84%,rgba(0,217,255,.08),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-gradient-to-b from-[#030817] via-[#020817]/45 to-transparent" />
        <svg aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-150px] z-0 h-[420px] w-[160vw] -translate-x-1/2 overflow-visible max-lg:top-[-125px] max-lg:h-[340px]" viewBox="0 0 1600 420" preserveAspectRatio="none">
          <defs>
            <filter id="legacyOrbitGlow" x="-12%" y="-80%" width="124%" height="240%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="legacyOrbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A4CE3" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#115FEB" stopOpacity="0.95" />
              <stop offset="65%" stopColor="#115FEB" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0A4CE3" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <path d="M -120 360 Q 800 40 1720 360" fill="none" stroke="rgba(17,95,235,.16)" strokeWidth="8" strokeLinecap="round" />
          <path d="M -120 360 Q 800 40 1720 360" fill="none" stroke="url(#legacyOrbitGradient)" strokeWidth="2" strokeLinecap="round" filter="url(#legacyOrbitGlow)" />
        </svg>
        <div className="pointer-events-none absolute right-0 top-0 h-[52rem] w-1/2 bg-[linear-gradient(128deg,transparent_0%,rgba(17,95,235,.16)_1px,transparent_2px),linear-gradient(142deg,transparent_0%,rgba(0,217,255,.10)_1px,transparent_2px)] bg-[length:95px_95px] opacity-45" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020817] to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1680px]">
          <div className="text-center">
            <p className="text-[clamp(.82rem,1.05vw,1.15rem)] font-semibold uppercase tracking-[0.72em] text-[#00F0FF] drop-shadow-[0_0_18px_rgba(0,217,255,.72)] max-md:tracking-[0.38em]">
              Legacy Foundation
            </p>
            <h2 className="mt-7 text-[clamp(2.4rem,3.45vw,4.05rem)] font-semibold leading-[1.02] tracking-[-0.055em] drop-shadow-[0_18px_58px_rgba(0,0,0,.78)] max-md:mt-5">
              <span className="bg-gradient-to-b from-white via-white to-[#c4cad6] bg-clip-text text-transparent">The </span>
              <span className="bg-gradient-to-b from-[#18BAFF] via-[#115FEB] to-[#0A4CE3] bg-clip-text text-transparent">Departmental Legacy</span>
              <span className="bg-gradient-to-b from-white via-white to-[#c4cad6] bg-clip-text text-transparent"> We Carry Forward</span>
            </h2>
          </div>

          <div className="relative mt-[4.2vw] px-20 max-2xl:px-16 max-xl:px-10 max-lg:px-0">
            <button aria-label="Previous legacy event" className="absolute left-0 top-1/2 z-20 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-[#f8f0d7]/75 bg-[#050a17]/70 text-6xl font-light leading-none text-white shadow-[0_0_28px_rgba(255,255,255,.18),0_0_38px_rgba(17,95,235,.35)] backdrop-blur-md transition hover:border-[#00D9FF] hover:text-[#00D9FF] max-xl:h-16 max-xl:w-16 max-xl:text-5xl max-lg:hidden">
              ‹
            </button>
            <button aria-label="Next legacy event" className="absolute right-0 top-1/2 z-20 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-[#f8f0d7]/75 bg-[#050a17]/70 text-6xl font-light leading-none text-white shadow-[0_0_28px_rgba(255,255,255,.18),0_0_38px_rgba(17,95,235,.35)] backdrop-blur-md transition hover:border-[#00D9FF] hover:text-[#00D9FF] max-xl:h-16 max-xl:w-16 max-xl:text-5xl max-lg:hidden">
              ›
            </button>

            <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
              {legacyCards.map((card, index) => (
                <article key={card._id ?? `${card.title}-${index}`} className="group relative overflow-hidden rounded-[14px] border border-[#5F79FF]/90 bg-[#030817]/92 p-[1px] shadow-[0_0_0_1px_rgba(0,217,255,.16),0_22px_58px_rgba(0,0,0,.64),0_0_28px_rgba(17,95,235,.34)] transition duration-500 hover:-translate-y-1.5 hover:border-[#00D9FF] hover:shadow-[0_0_0_1px_rgba(0,217,255,.42),0_28px_70px_rgba(0,0,0,.7),0_0_48px_rgba(0,217,255,.36)]">
                  <div className="pointer-events-none absolute left-[48%] top-[-5px] z-20 h-[6px] w-[6px] rounded-full bg-[#00F0FF] shadow-[0_0_14px_5px_rgba(0,217,255,.72)]" />
                  <div className={`relative h-[16rem] overflow-hidden rounded-[13px] bg-gradient-to-br ${card.accent ?? 'from-[#06123d] via-[#071b58] to-[#020817]'} max-2xl:h-[14.5rem] max-xl:h-[16rem]`}>
                    {card.mainImageUrl ? (
                      <img
                        src={card.mainImageUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-62 grayscale-[8%] saturate-[1.18] transition duration-700 group-hover:scale-105 group-hover:opacity-74"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_42%,rgba(0,217,255,.45),transparent_11%),radial-gradient(circle_at_68%_48%,rgba(17,95,235,.46),transparent_23%),linear-gradient(180deg,rgba(2,8,23,.08),rgba(2,8,23,.82))]" />
                    )}

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,.12)_0%,rgba(2,8,23,.22)_38%,rgba(2,8,23,.92)_100%)]" />
                    <div className="absolute inset-x-6 bottom-[4.5rem] h-px bg-gradient-to-r from-transparent via-white/26 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020817] via-[#020817]/88 to-transparent" />

                    <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d7bd70]/85 bg-[#05112d]/72 text-center text-[.43rem] font-black uppercase leading-[.86] tracking-[-.04em] text-white shadow-[0_0_20px_rgba(201,161,74,.20),0_0_16px_rgba(0,217,255,.18)] backdrop-blur-md whitespace-pre-line">
                        {card.eventLogoUrl ? (
                          <img src={card.eventLogoUrl} alt="" className="h-full w-full object-contain p-2" />
                        ) : (
                          card.badge
                        )}
                      </div>
                      <h3 className="min-w-0 text-[clamp(1rem,1vw,1.22rem)] font-medium leading-none tracking-[-0.045em] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,.95)]">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            {[0, 1, 2, 3].map((dot) => (
              <span key={dot} className={`h-4 w-4 rounded-full ${dot === 0 ? 'bg-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,.82)]' : 'bg-[#d7d7d7]/70 shadow-[0_0_10px_rgba(255,255,255,.22)]'}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
