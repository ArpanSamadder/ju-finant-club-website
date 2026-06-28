import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-[#020817] text-white">
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#020817]">
        <img
          src="/images/hero/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full select-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,.18)_0%,rgba(2,8,23,.08)_42%,rgba(2,8,23,.02)_100%)]" />

        <div className="absolute left-[6.55vw] top-[6.55vw] z-10 max-w-[600px] max-xl:left-[6.2vw] max-xl:top-[6.35vw] max-lg:left-8 max-lg:top-16">
          <h1 className="font-body font-extrabold tracking-[-0.048em] drop-shadow-[0_18px_58px_rgba(0,0,0,.74)]">
            <span className="block whitespace-nowrap text-[clamp(2.35rem,3.75vw,4.25rem)] leading-[1.02] max-xl:whitespace-normal max-md:text-[clamp(2.4rem,10vw,3.6rem)]">
              <span className="bg-gradient-to-b from-white via-white to-[#bbc2ce] bg-clip-text text-transparent">Building</span>{' '}
              <span className="bg-gradient-to-r from-[#42d4ff] via-[#168cff] to-[#075ef5] bg-clip-text text-transparent">Future-Ready</span>
            </span>
            <span className="mt-1 block text-[clamp(3rem,4.6vw,5.2rem)] font-extrabold leading-[0.94] tracking-[-0.052em] max-md:mt-2 max-md:text-[clamp(2.9rem,12vw,4.4rem)]">
              <span className="bg-gradient-to-b from-white via-white to-[#bbc2ce] bg-clip-text text-transparent">Professionals.</span>
            </span>
          </h1>

          <div className="mt-5 text-[clamp(1.2rem,1.55vw,1.75rem)] font-normal leading-[1.12] tracking-[-0.038em] drop-shadow-[0_12px_34px_rgba(0,0,0,.55)]">
            <p className="text-[#f7fbff]">Jahangirnagar University</p>
            <p className="mt-1 font-bold text-[#168cff]">FinAnt Club</p>
          </div>

          <p className="mt-4 max-w-[430px] text-[clamp(.82rem,.92vw,1rem)] font-light leading-[1.42] tracking-[-0.004em] text-white/82 drop-shadow-[0_10px_26px_rgba(0,0,0,.5)]">
            A student-led institution for business learning,<br />
            leadership, and industry-connected experiences.
          </p>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row">
            <Link href="#legacy-foundation" className="group inline-flex min-w-44 items-center justify-center gap-8 rounded-md border border-cyan-200/25 bg-gradient-to-r from-[#0067ee] to-[#1a8cff] px-6 py-3 text-sm font-light tracking-[-0.01em] text-white shadow-[0_20px_55px_rgba(0,105,255,.34)] transition hover:-translate-y-1 max-sm:min-w-0 max-sm:w-full">
              Explore FinAnt <span className="text-xl font-normal leading-none transition group-hover:translate-x-1">&gt;</span>
            </Link>
            <Link href="/biztigation" className="group inline-flex min-w-44 items-center justify-center gap-8 rounded-md border border-white/52 bg-[#030817]/32 px-6 py-3 text-sm font-light tracking-[-0.01em] text-white backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300 max-sm:min-w-0 max-sm:w-full">
              Biztigation 2.0 <span className="text-xl font-normal leading-none transition group-hover:translate-x-1">&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="legacy-foundation" className="relative overflow-hidden bg-[#020817] py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,123,255,.16),transparent_48%)]" />
        <div className="relative mx-auto max-w-[1180px] px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-[#53d6ff]">
            Legacy Foundation
          </p>
          <h2 className="text-[clamp(2rem,3.4vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.045em]">
            <span className="bg-gradient-to-b from-white via-white to-[#c6ced9] bg-clip-text text-transparent">The </span>
            <span className="bg-gradient-to-r from-[#42d4ff] via-[#168cff] to-[#075ef5] bg-clip-text text-transparent">Legacy</span>
            <span className="bg-gradient-to-b from-white via-white to-[#c6ced9] bg-clip-text text-transparent"> We Carry Forward</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/62">
            From Finance Fest, Biztigation, Crackademy, job fairs, panel discussions, and publications — FinAnt carries this departmental legacy into a permanent institutional platform.
          </p>
        </div>
      </section>
    </main>
  );
}
