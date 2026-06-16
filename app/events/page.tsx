import { Reveal } from '@/components/reveal';
import { eventCards } from '@/lib/data';

export default function EventsPage() {
  return (
    <section className="bg-navy py-24">
      <div className="section-shell">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Events</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white md:text-7xl">Programs that prove execution.</h1>
          <p className="mt-6 max-w-3xl text-white/64">This page will become the dynamic archive for flagship events, workshops, competitions, roadshows, and institutional programs.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {eventCards.map((event, index) => (
            <Reveal key={event.title} delay={index * 0.08}>
              <article className="card-border h-full rounded-3xl p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{event.category}</p>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">{event.title}</h2>
                <p className="mt-4 leading-7 text-white/62">{event.description}</p>
                <p className="mt-6 text-sm text-white/42">{event.stats}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
