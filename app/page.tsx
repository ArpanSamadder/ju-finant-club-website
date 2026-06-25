import Link from 'next/link';
import { BookOpen, BriefcaseBusiness, GraduationCap, Sparkles, Trophy, Users } from 'lucide-react';

const legacyCards = [
  { title: 'Biztigation', subtitle: 'Business Case Competition', image: '/images/brand/biztigation-logo-dark.png', Icon: Trophy },
  { title: 'Crackademy', subtitle: 'Case Solving Bootcamp', image: '/images/brand/finant-logo-dark.png', Icon: GraduationCap },
  { title: 'Finance Fest', subtitle: 'Flagship Departmental Festival', image: '/images/hero/hero-bg.png', Icon: Sparkles },
  { title: 'Job Fair', subtitle: 'Industry & Career Engagement', image: '/images/brand/department-logo.jpg', Icon: BriefcaseBusiness },
  { title: 'Panel Discussion', subtitle: 'Learning from Industry Leaders', image: '/images/brand/finant-logo.png', Icon: Users },
  { title: 'Publications', subtitle: 'Student Voices & Institutional Memory', image: '/images/brand/ju-logo.png', Icon: BookOpen },
];

export default function HomePage() {
  return (
    <main className="bg-[#020817] text-white">
      <section className="relative h-screen min-h-screen overflow-hidden bg-[#020817] max-md:h-[100svh] max-md:min-h-[100svh]">
        <img src="/images/hero/hero-bg-v2.png" alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#020817_0%,rgba(2,8,23,.88)_24%,rgba(2,8,23,.56)_44%,rgba(2,8,23,.16)_66%,rgba(2,8,23,.03)_84%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent" />

        <div className="relative z-10 flex h-full w-full items-start pl-[7.25vw] pt-[6.15rem] max-xl:pl-[6.2vw] max-xl:pt-[5.85rem] max-lg:px-8 max-lg:pt-24">
          <div className="max-w-[650px]">
            <h1 className="font-body font-extrabold tracking-[-0.048em] drop-shadow-[0_18px_58px_rgba(0,0,0,.74)]">
              <span className="block whitespace-nowrap text-[clamp(2.75rem,3.9vw,4.45rem)] leading-[1.03] max-xl:whitespace-normal max-md:text-[clamp(2.55rem,10.5vw,3.85rem)]">
                <span className="bg-gradient-to-b from-white via-white to-[#bbc2ce] bg-clip-text text-transparent">Building</span>{' '}
                <span className="bg-gradient-to-r from-[#42d4ff] via-[#168cff] to-[#075ef5] bg-clip-text text-transparent">Future-Ready</span>
              </span>
              <span className="mt-1 block text-[clamp(3.55rem,4.75vw,5.55rem)] font-extrabold leading-[0.94] tracking-[-0.052em] max-md:mt-2 max-md:text-[clamp(3rem,13vw,4.65rem)]">
                <span className="bg-gradient-to-b from-white via-white to-[#bbc2ce] bg-clip-text text-transparent">Professionals.</span>
              </span>
            </h1>

            <div className="mt-7 text-[clamp(1.45rem,1.72vw,2rem)] font-normal leading-[1.12] tracking-[-0.038em] drop-shadow-[0_12px_34px_rgba(0,0,0,.55)]">
              <p className="text-[#f7fbff]">Jahangirnagar University</p>
              <p className="mt-1 font-bold text-[#168cff]">FinAnt Club</p>
            </div>

            <p className="mt-4 max-w-[455px] text-[clamp(.92rem,.95vw,1.05rem)] font-light leading-[1.43] tracking-[-0.004em] text-white/78 drop-shadow-[0_10px_26px_rgba(0,0,0,.5)]">
              A student-led institution for business learning, leadership, and industry-connected experiences.
            </p>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row">
              <Link href="#legacy-foundation" className="group inline-flex min-w-56 items-center justify-center gap-8 rounded-lg border border-cyan-200/25 bg-gradient-to-r from-[#0067ee] to-[#1a8cff] px-7 py-3.5 text-base font-light tracking-[-0.01em] text-white shadow-[0_20px_55px_rgba(0,105,255,.34)] transition hover:-translate-y-1 max-sm:min-w-0 max-sm:w-full">
                Explore FinAnt <span className="text-2xl font-normal leading-none transition group-hover:translate-x-1">&gt;</span>
              </Link>
              <Link href="/biztigation" className="group inline-flex min-w-56 items-center justify-center gap-8 rounded-lg border border-white/52 bg-[#030817]/32 px-7 py-3.5 text-base font-light tracking-[-0.01em] text-white backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300 max-sm:min-w-0 max-sm:w-full">
                Biztigation 2.0 <span className="text-2xl font-normal leading-none transition group-hover:translate-x-1">&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="legacy-foundation" className="legacy-reveal relative -mt-px min-h-[calc(100svh-80px)] scroll-mt-20 overflow-hidden bg-[#020817] py-16">
        <div className="relative mx-auto flex min-h-[calc(100svh-12rem)] w-[min(1528px,calc(100%-72px))] flex-col justify-end max-lg:w-[min(100%-32px,900px)]">
          <div className="max-w-5xl pb-8">
            <p className="text-sm font-medium uppercase tracking-[0.58em] text-cyan-300/90 max-md:tracking-[0.34em]">Legacy Foundation</p>
            <h2 className="mt-5 max-w-5xl font-body text-[clamp(2.35rem,4.45vw,5.55rem)] font-extrabold leading-[0.96] tracking-[-0.062em] text-white drop-shadow-[0_20px_70px_rgba(0,0,0,.7)]">
              The <span className="bg-gradient-to-r from-[#54ddff] via-[#168cff] to-[#0866ff] bg-clip-text text-transparent">Departmental Legacy</span> We Carry Forward
            </h2>
            <p className="mt-5 max-w-3xl text-[clamp(.98rem,1.05vw,1.12rem)] font-light leading-7 text-white/76 drop-shadow-[0_10px_32px_rgba(0,0,0,.6)]">
              Before JU FinAnt Club became a formal institution, these flagship platforms were built through the student-led tradition of the Department of Finance and Banking.
            </p>
          </div>

          <div className="legacy-track grid grid-cols-6 gap-5 overflow-x-auto pb-4 text-left [scrollbar-width:none] max-xl:flex max-xl:[&>*]:min-w-[250px] [&::-webkit-scrollbar]:hidden">
            {legacyCards.map(({ title, subtitle, image, Icon }) => (
              <article key={title} className="group relative h-[205px] overflow-hidden rounded-xl border border-cyan-200/35 bg-[#061337]/80 p-5 shadow-[0_20px_75px_rgba(0,0,0,.45),inset_0_0_35px_rgba(0,120,255,.12)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200/80">
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[.18] grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-[.28]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#07133a]/75 to-[#05205d]/20" />
                <div className="relative flex h-full flex-col items-center justify-center text-center">
                  <Icon className="mb-5 h-14 w-14 text-cyan-300 drop-shadow-[0_0_22px_rgba(21,171,255,.65)]" strokeWidth={1.55} />
                  <h3 className="text-[1.35rem] font-extrabold tracking-[-0.035em] text-white">{title}</h3>
                  <p className="mt-2 max-w-[170px] text-sm font-medium leading-5 text-white/82">{subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
