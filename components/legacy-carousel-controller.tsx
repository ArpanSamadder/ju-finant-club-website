'use client';

import {useEffect} from 'react';

export function LegacyCarouselController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('#legacy-foundation');
    if (!section) return;

    const viewport = window.matchMedia('(max-width: 767px)');
    const track = section.querySelector<HTMLElement>('.grid');
    const cards = Array.from(section.querySelectorAll<HTMLElement>('article.legacy-card'));
    const prevButton = section.querySelector<HTMLButtonElement>('button[aria-label="Previous legacy event"]');
    const nextButton = section.querySelector<HTMLButtonElement>('button[aria-label="Next legacy event"]');

    if (!track || cards.length < 4) return;

    const originalCount = Math.max(1, Math.floor(cards.length / 2));
    let index = 0;
    let timer: number | undefined;
    let isTransitioning = false;

    const getStepSize = () => {
      const firstCard = cards[0];
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const setPosition = (nextIndex: number, animate = true) => {
      if (!viewport.matches) {
        track.style.transition = '';
        track.style.transform = '';
        track.style.animation = '';
        return;
      }

      const step = getStepSize();
      track.style.animation = 'none';
      track.style.transition = animate ? 'transform 560ms cubic-bezier(.45,0,.2,1)' : 'none';
      track.style.transform = `translate3d(${-nextIndex * step}px, 0, 0)`;
    };

    const resetIfClonePosition = () => {
      if (index !== originalCount) return;
      index = 0;
      setPosition(index, false);
      track.getBoundingClientRect();
      track.style.transition = 'transform 560ms cubic-bezier(.45,0,.2,1)';
    };

    const goNext = () => {
      if (!viewport.matches || isTransitioning) return;
      isTransitioning = true;
      index += 1;
      setPosition(index, true);
    };

    const goPrev = () => {
      if (!viewport.matches || isTransitioning) return;
      isTransitioning = true;

      if (index === 0) {
        index = originalCount;
        setPosition(index, false);
        track.getBoundingClientRect();
      }

      index -= 1;
      setPosition(index, true);
    };

    const startAuto = () => {
      window.clearInterval(timer);
      if (!viewport.matches) return;
      timer = window.setInterval(goNext, 2000);
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== track || event.propertyName !== 'transform') return;
      resetIfClonePosition();
      isTransitioning = false;
    };

    const handleNextClick = () => {
      goNext();
      startAuto();
    };

    const handlePrevClick = () => {
      goPrev();
      startAuto();
    };

    const handleResize = () => {
      setPosition(index, false);
      startAuto();
    };

    nextButton?.addEventListener('click', handleNextClick);
    prevButton?.addEventListener('click', handlePrevClick);
    track.addEventListener('transitionend', handleTransitionEnd);
    window.addEventListener('resize', handleResize);

    setPosition(0, false);
    startAuto();

    return () => {
      window.clearInterval(timer);
      nextButton?.removeEventListener('click', handleNextClick);
      prevButton?.removeEventListener('click', handlePrevClick);
      track.removeEventListener('transitionend', handleTransitionEnd);
      window.removeEventListener('resize', handleResize);
      track.style.transition = '';
      track.style.transform = '';
      track.style.animation = '';
    };
  }, []);

  return null;
}
