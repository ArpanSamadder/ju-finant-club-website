import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import './mobile.css';
import './mobile-cta-row.css';
import './mobile-legacy.css';
import './legacy-carousel-interactive.css';
import './identity-section.css';
import './identity-mobile-grid.css';
import './identity-card-compact.css';
import './identity-carousel-mobile.css';
import './voices-section.css';
import './voices-carousel-interactive.css';
import './partners-section.css';
import './performance-fixes.css';
import './no-glass-system.css';
import './carousel-arrows.css';
import { LegacyCarouselController } from '@/components/legacy-carousel-controller';
import { IdentityCarouselController } from '@/components/identity-carousel-controller';
import { VoicesCarouselController } from '@/components/voices-carousel-controller';
import { LiveEventHeroLink } from '@/components/live-event-hero-link';
import { SiteChrome } from '@/components/site-chrome';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700']
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'JU FinAnt Club',
  description: 'Official website of Jahangirnagar University FinAnt Club.',
  metadataBase: new URL('https://jufinantclub.org')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="noise" />
        <SiteChrome>{children}</SiteChrome>
        <LiveEventHeroLink />
        <LegacyCarouselController />
        <IdentityCarouselController />
        <VoicesCarouselController />
      </body>
    </html>
  );
}
