import Link from 'next/link';
import { ArrowRight, BookOpen, BriefcaseBusiness, GraduationCap, Sparkles, Trophy, Users } from 'lucide-react';

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
      <section className="relative min-h-[calc(100svh-80px)] overflow-hidden bg-[#020817]">
        <img src="/images/hero/hero-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#020817_0%,rgba(2,8,23,.88)_24%,rgba(2,8,23,.56)_44%,rgba(2,8,23,.16)_66%,rgba(2,8,23,.03)_84%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100svh-80px)] w-[min(1528px,calc(100%-72px))] items-center max-lg:w-[min(100%-32px,900px)] max-lg:items-start max-lg:pt-24">
          <div className="max-w-[650px] pb-16 pt-8">
            <h1 className="font-body font-extrabold tracking-[-0.048em] drop-shadow-[0_18px_58px_rgba(0,0,0,.74)]">
              <span className="block whitespace-nowrap text-[clamp(2.75rem,3.9vw,4.45rem)] leading-[1.03] max-xl:whitespace-normal max-md:text-[clamp(2.55rem,10.5vw,3.85rem)]">
                <span className="bg-gradient-to-b from-white via-white to-[#bbc2ce] bg-clip-text text-transparent">Building</span>{' '}
                <span className="bg-gradient-to-r from-[#42d4ff] via-[#168cff] to-[#075ef5] bg-clip-text text-transparent">Future-Ready</span>
              </span>
              <span className="mt-1 block text-[clamp(3.55rem,4.75vw,5.55rem)] font-extrabold leading-[0.94] tracking-[-0.052em] max-md:mt-2 max-md:text-[clamp(3rem,13vw,4.65rem)]">
                <span className="bg-gradient-to-b from-white via-white to-[#bbc2ce] bg-clip-text text-transparent">Professionals.</span>
              </span>
            </h1>

            <div className="mt-8 text-[clamp(1.55rem,1.9vw,2.2rem)] font-normal leading-[1.12] tracking-[-0.038em] drop-shadow-[0_12px_34px_rgba(0,0,0,.55)]">
              <p className="text-[#f7fbff]">Jahangirnagar University</p>
              <p className="mt-1 font-semibold text-[#168cff]">FinAnt Club</p>
            </div>

            <p className="mt-5 max-w-[455px] text-[clamp(1rem,1.05vw,1.15rem)] font-normal leading-[1.45] tracking-[-0.01em] text-white/82 drop-shadow-[0_10px_26px_rgba(0,0,0,.5)]">
              A student-led institution for business learning, leadership, and industry-connected experiences.
            </p>

            <div className="mt-9 flex flex-col gap-5 sm:flex-row">
              <Link href="#legacy-foundation" className="group inline-flex min-w-64 items-center justify-center gap-9 rounded-lg border border-cyan-200/25 bg-gradient-to-r from-[#0067ee] to-[#1a8cff] px-8 py-4 text-lg font-extrabold text-white shadow-[0_20px_55px_rgba(0,105,255,.34)] transition hover:-translate-y-1 max-sm:min-w-0 max-sm:w-full">
                Explore FinAnt <ArrowRight size={26} strokeWidth={2.35} className="transition group-hover:translate-x-1" />
              </Link>
              <Link href="/biztigation" className="group inline-flex min-w-64 items-center justify-center gap-9 rounded-lg border border-white/52 bg-[#030817]/32 px-8 py-4 text-lg font-extrabold text-white backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300 max-sm:min-w-0 max-sm:w-full">
                Biztigation 2.0 <ArrowRight size={26} strokeWidth={2.35} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="legacy-foundation" className="legacy-reveal relative -mt-px overflow-hidden border-t border-cyan-300/15 bg-[#020817] pb-24 pt-8">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,.2),#020817_30%),radial-gradient(circle_at_50%_0%,rgba(0,132,255,.2),transparent_33%)]" />
        <div className="absolute left-1/2 top-0 h-20 w-[130vw] -translate-x-1/2 rounded-[0_0_100%_100%] border-b border-cyan-300/40 bg-[#031029]/40 shadow-[0_0_70px_rgba(0,132,255,.34)]" />

        <div className="relative mx-auto w-[min(1528px,calc(100%-72px))] text-center max-lg:w-[min(100%-32px,900px)]">
          <p className="mt-5 text-sm font-black uppercase tracking-[0.62em] text-cyan-300/90 max-md:tracking-[0.35em]">Legacy Foundation</p>
          <h2 className="mx-auto mt-3 max-w-5xl font-body text-[clamp(2.15rem,3.1vw,3.35rem)] font-black leading-[1.05] tracking-[-0.055em] text-white">
            The <span className="bg-gradient-to-r from-[#4bdcff] to-[#0876ff] bg-clip-text text-transparent">Departmental Legacy</span> We Carry Forward
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-[clamp(.95rem,1vw,1.08rem)] font-medium leading-6 text-white/78">
            Before the formation of JU FinAnt Club, these flagship platforms were built through the student-led tradition of the Department of Finance and Banking. FinAnt now carries this legacy forward through a formal, future-ready institutional structure.
          </p>

          <div className="legacy-track mt-10 grid grid-cols-6 gap-5 overflow-x-auto pb-6 text-left [scrollbar-width:none] max-xl:flex max-xl:[&>*]:min-w-[250px] [&::-webkit-scrollbar]:hidden">
            {legacyCards.map(({ title, subtitle, image, Icon }) => (
              <article key={title} className="group relative h-[205px] overflow-hidden rounded-xl border border-cyan-200/35 bg-[#061337]/88 p-5 shadow-[0_20px_75px_rgba(0,0,0,.45),inset_0_0_35px_rgba(0,120,255,.12)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/80">
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
