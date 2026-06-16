import { Reveal } from '@/components/reveal';

export default function JoinPage() {
  return (
    <section className="bg-navy py-24">
      <div className="section-shell">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Join Us</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white md:text-7xl">Build capability, not just a designation.</h1>
          <p className="mt-6 max-w-3xl text-white/64">JU FinAnt Club is for students who want to develop professional discipline, leadership, communication strength, AI-readiness, and execution capability.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {['Learn', 'Lead', 'Execute'].map((item, index) => (
            <Reveal key={item} delay={index * 0.08}>
              <div className="card-border rounded-3xl p-7">
                <p className="font-display text-5xl font-bold text-gold/35">0{index + 1}</p>
                <h2 className="mt-5 font-display text-3xl font-bold text-white">{item}</h2>
                <p className="mt-4 leading-7 text-white/62">Application form will be embedded here after the final Join Us form is created.</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
