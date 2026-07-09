'use client';

import {useEffect} from 'react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function HomeHeroRevealController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.home-hero-reveal-root');
    const hero = document.querySelector<HTMLElement>('#home-hero-section');
    const legacy = document.querySelector<HTMLElement>('#legacy-foundation');

    if (!root || !hero || !legacy) return;

    let frame = 0;

    const sync = () => {
      frame = 0;

      const revealDistance = Math.max(260, Math.min(window.innerHeight * 0.58, 620));
      const progress = clamp(window.scrollY / revealDistance);

      root.style.setProperty('--home-reveal-progress', progress.toFixed(4));
      root.classList.toggle('is-revealing', progress > 0.01);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', schedule);
      root.style.removeProperty('--home-reveal-progress');
      root.classList.remove('is-revealing');
    };
  }, []);

  return null;
}
