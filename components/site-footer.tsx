import Link from 'next/link';
import {client} from '@/sanity/lib/client';

type FooterContent = {
  logoUrl?: string;
  description: string;
  email: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  copyrightText?: string;
};

const footerNav = [
  {label: 'Home', href: '/'},
  {label: 'Decoding IELTS', href: '/decoding-ielts'},
  {label: 'Initiatives', href: '/initiatives'},
  {label: 'People', href: '/people'},
  {label: 'Join Us', href: '/join-us'},
  {label: 'Partner With Us', href: '/partner-with-us'},
];

const fallbackFooter: FooterContent = {
  description: 'An AI-first career development platform building future-ready professionals through leadership, learning, industry engagement, and practical experience.',
  email: 'ju.finantclub@gmail.com',
  copyrightText: '© {year} Jahangirnagar University FinAnt Club. All rights reserved.',
};

async function getFooterContent() {
  try {
    const content = await client.fetch<Partial<FooterContent> | null>(
      `*[_type == "footerSettings"][0] {
        "logoUrl": footerLogo.asset->url,
        description,
        email,
        facebookUrl,
        linkedinUrl,
        instagramUrl,
        copyrightText
      }`,
      {},
      {next: {revalidate: 60}}
    );

    return {...fallbackFooter, ...(content ?? {})};
  } catch {
    return fallbackFooter;
  }
}

function SocialIcon({name}: {name: 'Facebook' | 'LinkedIn' | 'Instagram'}) {
  if (name === 'Facebook') {
    return <path d="M14 8.2h3V4.4c-.5-.1-2.1-.2-4-.2-4 0-6.7 2.4-6.7 6.9V15H2v4.3h4.3V30h5.2V19.3h4.2l.7-4.3h-4.9v-3.5c0-1.3.4-2.2 2.5-2.2Z" />;
  }

  if (name === 'LinkedIn') {
    return <><path d="M4 10h5v16H4V10Zm2.5-8A2.9 2.9 0 1 1 6.5 7.8 2.9 2.9 0 0 1 6.5 2Z" /><path d="M12 10h4.8v2.2h.1c.7-1.3 2.3-2.8 4.8-2.8 5.1 0 6.1 3.4 6.1 7.8V26h-5v-7.8c0-1.9 0-4.3-2.6-4.3s-3 2-3 4.1v8h-5V10Z" /></>;
  }

  return <><rect x="4" y="4" width="24" height="24" rx="7" fill="none" stroke="currentColor" strokeWidth="2.4" /><circle cx="16" cy="16" r="5.5" fill="none" stroke="currentColor" strokeWidth="2.4" /><circle cx="24.2" cy="7.8" r="1.5" /></>;
}

export async function SiteFooter() {
  const footer = await getFooterContent();
  const currentYear = new Date().getFullYear();
  const copyright = (footer.copyrightText || fallbackFooter.copyrightText || '')
    .replaceAll('{year}', String(currentYear))
    .replaceAll('[year]', String(currentYear));

  const socials = [
    {name: 'Facebook' as const, href: footer.facebookUrl},
    {name: 'LinkedIn' as const, href: footer.linkedinUrl},
    {name: 'Instagram' as const, href: footer.instagramUrl},
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[#115FEB]/35 bg-[#010612] px-6 pb-7 pt-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(17,95,235,.18),transparent_28%),linear-gradient(90deg,rgba(0,217,255,.045)_1px,transparent_1px),linear-gradient(0deg,rgba(0,217,255,.035)_1px,transparent_1px)] bg-[size:auto,64px_64px,64px_64px]" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.35fr_.72fr_.72fr]">
          <div>
            <div className="flex items-center gap-4">
              <img src={footer.logoUrl || '/images/brand/finant-mark.png'} alt="FinAnt logo" className="h-16 w-auto object-contain" />
              <div>
                <p className="text-2xl font-semibold tracking-[-0.035em] text-white">Jahangirnagar University FinAnt Club</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.34em] text-[#1597ff]">Industry · Integrity · Legacy</p>
              </div>
            </div>
            <p className="mt-7 max-w-2xl text-[0.98rem] leading-7 text-white/62">{footer.description}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#00D9FF]">Navigation</p>
            <nav className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">
              {footerNav.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/62 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#00D9FF]">Contact</p>
            <a href={`mailto:${footer.email}`} className="mt-6 block break-all text-sm text-white/70 transition hover:text-white">
              {footer.email}
            </a>

            <div className="mt-7 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href || '#'}
                  target={social.href ? '_blank' : undefined}
                  rel={social.href ? 'noreferrer' : undefined}
                  aria-label={social.name}
                  aria-disabled={!social.href}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[#315fbf]/65 bg-[#06132d] text-[#8fdfff] transition ${social.href ? 'hover:-translate-y-0.5 hover:border-[#00F0FF] hover:text-white' : 'cursor-default opacity-45'}`}
                >
                  <svg viewBox="0 0 32 32" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                    <SocialIcon name={social.name} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="pt-7 text-center text-xs leading-6 text-white/42">{copyright}</p>
      </div>
    </footer>
  );
}
