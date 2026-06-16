import { Mail } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { samplePeople } from '@/lib/data';

export default function PeoplePage() {
  return (
    <section className="bg-navy py-24">
      <div className="section-shell">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">People</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white md:text-7xl">Student-led. Advisor-supported.</h1>
          <p className="mt-6 max-w-3xl text-white/64">This page will be connected to the CMS so the club can update executive committee members, advisors, faculty advisors, and alumni profiles without touching code.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {samplePeople.map((person, index) => (
            <Reveal key={person.name} delay={index * 0.08}>
              <article className="card-border rounded-3xl p-7">
                <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gold/15 text-gold">
                  <span className="font-display text-4xl font-bold">{person.name.charAt(0)}</span>
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-gold">{person.group}</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-white">{person.name}</h2>
                <p className="mt-1 text-white/62">{person.role}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm text-white/50"><Mail size={16} /> {person.email}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
