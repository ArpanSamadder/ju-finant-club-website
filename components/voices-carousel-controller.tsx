'use client';

import {useEffect} from 'react';

export function VoicesCarouselController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('#voices-of-finant');
    const track = section?.querySelector<HTMLElement>('.voices-card-grid');
    const viewport = section?.querySelector<HTMLElement>('.voices-track-viewport');
    const cards = Array.from(section?.querySelectorAll<HTMLElement>('article.voice-card') ?? []);
    const prev = section?.querySelector<HTMLButtonElement>('button[aria-label="Previous voice"]');
    const next = section?.querySelector<HTMLButtonElement>('button[aria-label="Next voice"]');
    const mobile = window.matchMedia('(max-width: 767px)');

    if (!section || !track || !viewport || cards.length < 2) return;

    const count = Math.max(1, Math.floor(cards.length / 2));
    let index = 0;
    let timer: number | undefined;
    let busy = false;
    let startX = 0;
    let startY = 0;

    const step = () => {
      const gap = parseFloat(window.getComputedStyle(track).gap || '0') || 0;
      return cards[0].getBoundingClientRect().width + gap;
    };

    const move = (nextIndex: number, animate = true) => {
      if (!mobile.matches) return;
      track.style.animation = 'none';
      track.style.transition = animate ? 'transform 560ms cubic-bezier(.45,0,.2,1)' : 'none';
      track.style.transform = `translate3d(${-nextIndex * step()}px,0,0)`;
    };

    const forward = () => {
      if (!mobile.matches || busy) return;
      busy = true;
      index += 1;
      move(index);
    };

    const backward = () => {
      if (!mobile.matches || busy) return;
      busy = true;
      if (index === 0) {
        index = count;
        move(index, false);
        track.getBoundingClientRect();
      }
      index -= 1;
      move(index);
    };

    const restart = () => {
      window.clearInterval(timer);
      if (mobile.matches) timer = window.setInterval(forward, 2000);
    };

    const done = (event: TransitionEvent) => {
      if (event.target !== track || event.propertyName !== 'transform') return;
      if (index === count) {
        index = 0;
        move(0, false);
        track.getBoundingClientRect();
      }
      busy = false;
    };

    const onStart = (event: TouchEvent) => {
      if (!mobile.matches || event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };

    const onEnd = (event: TouchEvent) => {
      if (!mobile.matches || !startX) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      startX = 0;
      startY = 0;
      if (Math.abs(dx) < 34 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
      dx < 0 ? forward() : backward();
      restart();
    };

    const onNext = () => { forward(); restart(); };
    const onPrev = () => { backward(); restart(); };
    const onResize = () => { move(index, false); restart(); };

    next?.addEventListener('click', onNext);
    prev?.addEventListener('click', onPrev);
    viewport.addEventListener('touchstart', onStart, {passive: true});
    viewport.addEventListener('touchend', onEnd, {passive: true});
    track.addEventListener('transitionend', done);
    window.addEventListener('resize', onResize);

    move(0, false);
    restart();

    return () => {
      window.clearInterval(timer);
      next?.removeEventListener('click', onNext);
      prev?.removeEventListener('click', onPrev);
      viewport.removeEventListener('touchstart', onStart);
      viewport.removeEventListener('touchend', onEnd);
      track.removeEventListener('transitionend', done);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return null;
}
