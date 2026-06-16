import { eventCards } from '@/lib/data';

export default function InitiativesPage() {
  return (
    <section className="bg-navy py-24">
      <div className="section-shell">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Initiatives</p>
        <h1 className="mt-3 font-display text-5xl font-bold text-white md:text-7xl">Programs that prove execution.</h1>
        <p className="mt-6 max-w-3xl text-white/64">
          This page will become the dynamic archive for flagship competitions, workshops, training programs, roadshows, publications, and institutional initiatives.
        </p>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {eventCards.map((event) => (
            <article key={event.title} className="card-border h-full rounded-3xl p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{event.category}</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-white">{event.title}</h2>
              <p className="mt-4 leading-7 text-white/62">{event.description}</p>
              <p className="mt-6 text-sm text-white/42">{event.stats}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
