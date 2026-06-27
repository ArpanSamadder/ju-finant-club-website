export default function HomePage() {
  return (
    <main className="bg-[#020817] text-white">
      <section className="relative min-h-screen overflow-hidden bg-[#020817]">
        <img
          src="/images/hero/home-hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,.58)_0%,rgba(2,8,23,.34)_34%,rgba(2,8,23,.08)_66%,rgba(2,8,23,.02)_100%)]" />
      </section>
    </main>
  );
}
