'use client';

import {usePathname} from 'next/navigation';
import {SiteHeader} from './site-header';

export function SiteChrome({children, footer}: {children: React.ReactNode; footer: React.ReactNode}) {
  const pathname = usePathname();
  const registrationRoute =
    pathname === '/events/decoding-ielts/register' ||
    pathname === '/decoding-ielts/register';

  if (registrationRoute) return <main>{children}</main>;

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      {footer}
    </>
  );
}
