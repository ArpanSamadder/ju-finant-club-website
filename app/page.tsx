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
  badge?: string;
  accent?: string;
};

const fallbackLegacyCards: LegacyCard[] = [
  {
    title: 'Biztigation 2024',
    badge: 'BIZ\nTIGATION\n2.0',
    accent: 'from-[#06123d] via-[#071b58] to-[#020817]',
  },
  {
    title: 'Crackademy 2025',
    badge: 'CRACK\nADEMY',
    accent: 'from-[#07152d] via-[#112033] to-[#020817]',
  },
  {
    title: 'Job Fair',
    badge: 'JOB\nFAIR\n2025',
    accent: 'from-[#071532] via-[#122a48] to-[#020817]',
  },
  {
    title: 'Panel Discussion',
    badge: 'PEOPLE',
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
  return words.slice(0, 3).join('\n').toUpperCase();
}

async function getLegacyCards() {
  try {
    const cards = await client.fetch<LegacyCard[]>(
      `*[_type == "legacyEvent" && isActive == true] | order(displayOrder asc, _createdAt desc) {
        _id,
        title,
        year,
        shortDescription,
        "mainImageUrl": mainImage.asset->url,
        "eventLogoUrl": eventLogo.asset->url
      }`,
      {},
      {next: {revalidate: 60}}
    );

    if (!cards.length) return fallbackLegacyCards;

    return cards.map((card, index) => ({
      ...card,
      badge: makeBadge(card.title),
      accent: legacyAccentFallbacks[index % legacyAccentFallbacks.length],
    }));
  } catch {
    return fallbackLegacyCards;
  }
}

export default async function HomePage() {
  const legacyCards = await getLegacyCards();

  return (
    <main className="bg-[#020817] text-white">
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#020817]">
        <img
          src="/images/hero/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full select-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,.18)_0%,rgba(2,8,23,.08)_42%,rgba(2,8,23,.02)_100%)]" />

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

      <section id="legacy-foundation" className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#020817] px-6 py-[6.5vw]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,95,235,.20),transparent_54%)]" />
        <div className="pointer-events-none absolute inset-x-[-8vw] top-[-28vw] h-[42vw] rounded-[50%] border-t-2 border-[#115FEB]/80 shadow-[0_0_42px_rgba(17,95,235,.55)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(17,95,235,.08)_100%),linear-gradient(90deg,rgba(17,95,235,.13)_1px,transparent_1px),linear-gradient(0deg,rgba(17,95,235,.13)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px] opacity-35" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#020817] to-transparent" />

        <div className="relative mx-auto max-w-[1760px]">
          <div className="text-center">
            <p className="text-[clamp(.82rem,1vw,1.05rem)] font-medium uppercase tracking-[0.55em] text-[#00D9FF] drop-shadow-[0_0_18px_rgba(0,217,255,.45)]">
              Legacy Foundation
            </p>
            <h2 className="mt-4 text-[clamp(2.2rem,3.35vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.045em] drop-shadow-[0_18px_58px_rgba(0,0,0,.68)]">
              <span className="bg-gradient-to-b from-white via-white to-[#b9c0cb] bg-clip-text text-transparent">The </span>
              <span className="text-[#115FEB]">Departmental Legacy</span>
              <span className="bg-gradient-to-b from-white via-white to-[#b9c0cb] bg-clip-text text-transparent"> We Carry Forward</span>
            </h2>
          </div>

          <div className="relative mt-7 px-20 max-xl:px-12 max-lg:px-0">
            <button aria-label="Previous legacy event" className="absolute left-0 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-[#7fb3ff]/40 bg-[#07122e]/70 text-5xl font-light text-white shadow-[0_0_34px_rgba(17,95,235,.38)] backdrop-blur-md transition hover:border-[#00D9FF] hover:text-[#00D9FF] max-lg:hidden">
              ‹
            </button>
            <button aria-label="Next legacy event" className="absolute right-0 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-[#7fb3ff]/40 bg-[#07122e]/70 text-5xl font-light text-white shadow-[0_0_34px_rgba(17,95,235,.38)] backdrop-blur-md transition hover:border-[#00D9FF] hover:text-[#00D9FF] max-lg:hidden">
              ›
            </button>

            <div className="grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
              {legacyCards.map((card) => (
                <article key={card._id ?? card.title} className="group relative overflow-hidden rounded-[20px] border border-[#2e7fff]/70 bg-[#04112d]/88 p-2 shadow-[0_0_0_1px_rgba(0,217,255,.12),0_24px_70px_rgba(0,0,0,.55),0_0_35px_rgba(17,95,235,.22)] transition duration-300 hover:-translate-y-2 hover:border-[#00D9FF]">
                  <div className={`relative min-h-[330px] overflow-hidden rounded-[15px] bg-gradient-to-br ${card.accent ?? 'from-[#06123d] via-[#071b58] to-[#020817]'} max-2xl:min-h-[290px]`}>
                    {card.mainImageUrl ? (
                      <img
                        src={card.mainImageUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(0,217,255,.28),transparent_20%),radial-gradient(circle_at_50%_70%,rgba(17,95,235,.35),transparent_34%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
                    <div className="absolute inset-x-8 top-6 h-28 rounded-full bg-[#115FEB]/20 blur-3xl" />

                    <div className="absolute bottom-24 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border border-[#00D9FF]/45 bg-[#06173d]/70 text-center text-[.75rem] font-black uppercase leading-[.95] tracking-[-.04em] text-white shadow-[0_0_34px_rgba(0,217,255,.45)] backdrop-blur-md whitespace-pre-line">
                      {card.eventLogoUrl ? (
                        <img src={card.eventLogoUrl} alt="" className="h-full w-full object-contain p-3" />
                      ) : (
                        card.badge
                      )}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020817] via-[#020817]/78 to-transparent" />
                    <h3 className="absolute bottom-6 left-4 right-4 text-center text-[clamp(1.65rem,1.7vw,2.25rem)] font-medium leading-none tracking-[-0.05em] text-white drop-shadow-[0_12px_28px_rgba(0,0,0,.85)]">
                      {card.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            {[0, 1, 2, 3, 4, 5, 6].map((dot) => (
              <span key={dot} className={`h-4 w-4 rounded-full ${dot === 0 ? 'border-2 border-[#00D9FF] bg-[#115FEB] shadow-[0_0_20px_rgba(0,217,255,.8)]' : 'bg-slate-400/55'}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
