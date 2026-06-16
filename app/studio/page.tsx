import { Reveal } from '@/components/reveal';

export default function StudioPage() {
  return (
    <section className="min-h-screen bg-navy py-24">
      <div className="section-shell">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">CMS Setup</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white md:text-7xl">Admin panel will be connected here.</h1>
          <p className="mt-6 max-w-3xl text-white/64">
            This route is reserved for the future JU FinAnt Club content management studio. The public demo is being deployed first, then the CMS will be connected safely with the required project credentials.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {['Events and Initiatives', 'People and Advisors', 'Partners and Publications'].map((item) => (
            <div key={item} className="card-border rounded-3xl p-6 text-white/72">
              <p className="font-display text-2xl font-bold text-white">{item}</p>
              <p className="mt-3 text-sm leading-6 text-white/52">Editable CMS collection planned for the admin panel.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
