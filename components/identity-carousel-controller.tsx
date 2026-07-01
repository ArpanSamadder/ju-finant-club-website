'use client';

import {useEffect} from 'react';

export function IdentityCarouselController() {
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    if (!mobile.matches) return;

    const section = document.querySelector<HTMLElement>('#our-identity');
    const stack = section?.querySelector<HTMLElement>('.identity-feature-stack');
    const dots = stack?.querySelector<HTMLElement>('.identity-mobile-dots');

    if (!section || !stack || !dots) return;
    if (stack.querySelector('.identity-card-track-viewport')) return;

    const originals = Array.from(stack.querySelectorAll<HTMLElement>(':scope > article.identity-feature-card'));
    if (originals.length < 2) return;

    const viewport = document.createElement('div');
    viewport.className = 'identity-card-track-viewport';
    const track = document.createElement('div');
    track.className = 'identity-card-track';

    stack.insertBefore(viewport, dots);
    viewport.appendChild(track);
    originals.forEach((card) => track.appendChild(card));
    originals.forEach((card) => {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.classList.add('identity-clone');
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    const cards = Array.from(track.querySelectorAll<HTMLElement>('article.identity-feature-card'));
    const count = originals.length;
    let index = 0;
    let timer: number | undefined;
    let busy = false;
    let startX = 0;
    let startY = 0;

    const syncDots = () => {
      const spans = Array.from(dots.querySelectorAll('span'));
      while (spans.length < count) {
        const span = document.createElement('span');
        dots.appendChild(span);
        spans.push(span);
      }
      spans.forEach((span, dotIndex) => {
        span.classList.toggle('identity-dot-active', dotIndex === index % count);
      });
    };

    const step = () => {
      const gap = parseFloat(window.getComputedStyle(track).gap || '0') || 0;
      return cards[0].getBoundingClientRect().width + gap;
    };

    const move = (nextIndex: number, animate = true) => {
      track.style.transition = animate ? 'transform 560ms cubic-bezier(.45,0,.2,1)' : 'none';
      track.style.transform = `translate3d(${-nextIndex * step()}px,0,0)`;
      syncDots();
    };

    const forward = () => {
      if (busy) return;
      busy = true;
      index += 1;
      move(index);
    };

    const backward = () => {
      if (busy) return;
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
      timer = window.setInterval(forward, 2000);
    };

    const done = (event: TransitionEvent) => {
      if (event.target !== track || event.propertyName !== 'transform') return;
      if (index === count) {
        index = 0;
        move(0, false);
        track.getBoundingClientRect();
      }
      busy = false;
      syncDots();
    };

    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };

    const onEnd = (event: TouchEvent) => {
      if (!startX) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      startX = 0;
      startY = 0;
      if (Math.abs(dx) < 34 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
      dx < 0 ? forward() : backward();
      restart();
    };

    const onResize = () => {
      if (!mobile.matches) return;
      move(index, false);
      restart();
    };

    viewport.addEventListener('touchstart', onStart, {passive: true});
    viewport.addEventListener('touchend', onEnd, {passive: true});
    track.addEventListener('transitionend', done);
    window.addEventListener('resize', onResize);

    move(0, false);
    syncDots();
    restart();

    return () => {
      window.clearInterval(timer);
      viewport.removeEventListener('touchstart', onStart);
      viewport.removeEventListener('touchend', onEnd);
      track.removeEventListener('transitionend', done);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return null;
}
