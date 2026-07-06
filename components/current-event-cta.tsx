import Link from 'next/link';

export function CurrentEventCta() {
  return (
    <Link href="/events/decoding-ielts" className="group inline-flex min-w-[245px] items-center justify-center gap-12 rounded-md border border-white/62 bg-[#030817]/32 px-8 py-4 text-[1.08rem] font-medium tracking-[-0.01em] text-white backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300 max-sm:min-w-0 max-sm:w-full">
      Decoding IELTS <span className="text-3xl font-light leading-none transition group-hover:translate-x-1">&gt;</span>
    </Link>
  );
}
