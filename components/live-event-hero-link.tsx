'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LIVE_EVENT = {
  label: 'Decoding English',
  href: '/events/decoding-ielts',
};

export function LiveEventHeroLink() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const link = document.querySelector<HTMLAnchorElement>(
      'section:first-of-type a[href="/biztigation"]'
    );

    if (!link) return;

    link.href = LIVE_EVENT.href;
    link.setAttribute('aria-label', `Open ${LIVE_EVENT.label}`);

    const labelNode = Array.from(link.childNodes).find(
      (node) => node.nodeType === Node.TEXT_NODE
    );

    if (labelNode) {
      labelNode.textContent = `${LIVE_EVENT.label} `;
    }
  }, [pathname]);

  return null;
}
