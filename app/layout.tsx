import type {Metadata} from 'next';
import {Cormorant_Garamond, Inter} from 'next/font/google';
import './globals.css';
import './mobile.css';
import './mobile-cta-row.css';
import './voices-section.css';
import './performance-fixes.css';
import './carousel-arrows.css';
import './hero-locked-overrides.css';
import {LiveEventHeroLink} from '@/components/live-event-hero-link';
import {SiteChrome} from '@/components/site-chrome';
import {SiteFooter} from '@/components/site-footer';
import {getCurrentEventNavItem} from '@/lib/current-event';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'JU FinAnt Club',
  description: 'Official website of Jahangirnagar University FinAnt Club.',
  metadataBase: new URL('https://jufinantclub.org'),
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const currentEvent = await getCurrentEventNavItem();

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="noise" />
        <SiteChrome footer={<SiteFooter />} currentEvent={currentEvent}>
          {children}
        </SiteChrome>
        <LiveEventHeroLink />
      </body>
    </html>
  );
}
