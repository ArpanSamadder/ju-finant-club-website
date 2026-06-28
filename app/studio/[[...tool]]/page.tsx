export default function StudioSetupPage() {
  return (
    <section className="min-h-[calc(100svh-72px)] bg-[#020817] px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#115FEB]/45 bg-[#06122d]/80 p-8 shadow-[0_0_42px_rgba(17,95,235,.22)]">
        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#00D9FF]">CMS Setup</p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em]">JU FinAnt Club Admin Panel</h1>
        <p className="mt-4 text-white/72">
          The Legacy Event CMS schema has been added to the codebase. The live editing studio will be connected after the Sanity project ID is added to Vercel environment variables.
        </p>
        <div className="mt-8 rounded-xl border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/72">
          <p><span className="font-semibold text-white">Ready schema:</span> Legacy Event</p>
          <p><span className="font-semibold text-white">Fields:</span> title, year, image, logo, order, active status, featured status, event link</p>
          <p><span className="font-semibold text-white">Next:</span> connect real Sanity project ID and enable Studio UI</p>
        </div>
      </div>
    </section>
  );
}
