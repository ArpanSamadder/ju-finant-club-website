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
import './voices-section.css';
import './voices-carousel-interactive.css';
import './partners-section.css';
import './performance-fixes.css';
import './no-glass-system.css';
import { LegacyCarouselController } from '@/components/legacy-carousel-controller';
import { VoicesCarouselController } from '@/components/voices-carousel-controller';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

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
  metadataBase: new URL('https://ju-finant-club.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="noise" />
        <SiteHeader />
        <main>{children}</main>
        <LegacyCarouselController />
        <VoicesCarouselController />
        <SiteFooter />
      </body>
    </html>
  );
}
