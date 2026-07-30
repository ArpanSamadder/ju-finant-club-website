'use client';

import {usePathname} from 'next/navigation';
import type {CurrentEventLink} from '@/lib/homepage-settings';
import {SiteHeader} from './site-header';

export function SiteChrome({
  children,
  footer,
  currentEvent,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
  currentEvent: CurrentEventLink | null;
}) {
  const pathname = usePathname();
  const registrationRoute =
    pathname === '/events/decoding-ielts/register' ||
    pathname === '/decoding-ielts/register';

  if (registrationRoute) return <main>{children}</main>;

  return (
    <>
      <SiteHeader currentEvent={currentEvent} />
      <main>{children}</main>
      {footer}
    </>
  );
}
