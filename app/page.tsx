import {ClosingCtaSection} from '@/components/closing-cta-section';
import {HomepageHero} from '@/components/homepage-hero';
import {IdentitySection} from '@/components/identity-section';
import {LegacySection} from '@/components/legacy-section';
import {PartnersSection} from '@/components/partners-section';
import {VoicesSection} from '@/components/voices-section';
import {getCurrentEventNavItem} from '@/lib/current-event';

export const revalidate = 60;

export default async function HomePage() {
  const currentEvent = await getCurrentEventNavItem();

  return (
    <div className="bg-[#020817] text-white">
      <HomepageHero currentEvent={currentEvent} />
      <LegacySection />
      <IdentitySection />
      <VoicesSection />
      <PartnersSection />
      <ClosingCtaSection />
    </div>
  );
}
