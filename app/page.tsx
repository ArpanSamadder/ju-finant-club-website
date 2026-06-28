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
