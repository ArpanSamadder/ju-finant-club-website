'use client';

import type {KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent} from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './partners-section.module.css';

export type PartnerItem = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
};

type InteractionState = {
  hover: boolean;
  focus: boolean;
  drag: boolean;
};

function ArrowIcon({direction}: {direction: 'left' | 'right'}) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d={direction === 'left' ? 'M30 12 18 24l12 12M19 24h18' : 'm18 12 12 12-12 12m11-12H11'} />
    </svg>
  );
}

export function PartnersMarquee({items}: {items: PartnerItem[]}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{x: number; scrollLeft: number} | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const interaction = useRef<InteractionState>({hover: false, focus: false, drag: false});
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const repeatedItems = useMemo(() => [...items, ...items, ...items], [items]);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const hasActiveInteraction = useCallback(() => Object.values(interaction.current).some(Boolean), []);

  const pauseFor = useCallback((reason: keyof InteractionState) => {
    interaction.current[reason] = true;
    clearResumeTimer();
    setPaused(true);
  }, [clearResumeTimer]);

  const resumeAfterInteraction = useCallback((delay = 4000) => {
    clearResumeTimer();
    if (hasActiveInteraction()) return;
    setPaused(true);
    resumeTimer.current = window.setTimeout(() => {
      if (!hasActiveInteraction()) setPaused(false);
    }, delay);
  }, [clearResumeTimer, hasActiveInteraction]);

  const releaseReason = useCallback((reason: keyof InteractionState) => {
    interaction.current[reason] = false;
    resumeAfterInteraction(4000);
  }, [resumeAfterInteraction]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || items.length === 0) return;

    const initialise = () => {
      const segment = viewport.scrollWidth / 3;
      if (segment > 0) viewport.scrollLeft = segment;
    };

    const frame = window.requestAnimationFrame(initialise);
    return () => window.cancelAnimationFrame(frame);
  }, [items]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || items.length === 0 || reducedMotion || paused) return;

    let frame = 0;
    let previous = performance.now();

    const tick = (time: number) => {
      const segment = viewport.scrollWidth / 3;
      const elapsed = Math.min(48, time - previous);
      previous = time;
      const pixelsPerMillisecond = segment > 0 ? segment / 30000 : 0;
      viewport.scrollLeft += elapsed * pixelsPerMillisecond;

      if (segment > 0 && viewport.scrollLeft >= segment * 2) viewport.scrollLeft -= segment;
      if (segment > 0 && viewport.scrollLeft < segment * 0.5) viewport.scrollLeft += segment;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [items, paused, reducedMotion]);

  useEffect(() => () => clearResumeTimer(), [clearResumeTimer]);

  const scrollByCard = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    clearResumeTimer();
    setPaused(true);
    const card = viewport.querySelector<HTMLElement>('[data-partner-card]');
    const track = viewport.querySelector<HTMLElement>('[data-partner-track]');
    const gap = track ? Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') : 0;
    const step = (card?.getBoundingClientRect().width ?? 280) + gap;
    viewport.scrollBy({left: direction * step, behavior: reducedMotion ? 'auto' : 'smooth'});
    resumeAfterInteraction(4000);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollByCard(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollByCard(1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (target.closest('a, button')) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    pointerStart.current = {x: event.clientX, scrollLeft: viewport.scrollLeft};
    pauseFor('drag');
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const start = pointerStart.current;
    if (!viewport || !start) return;
    viewport.scrollLeft = start.scrollLeft - (event.clientX - start.x);
  };

  const finishPointer = () => {
    pointerStart.current = null;
    releaseReason('drag');
  };

  return (
    <section id="partners-collaborators" className={styles.section} aria-labelledby="partners-title">
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.header}>
        <p className={styles.eyebrow}>Partners &amp; Collaborators</p>
        <h2 id="partners-title" className={styles.supportingLine}>
          Building trusted relationships across industry, academia, media, and youth communities.
        </h2>
      </div>

      {items.length ? (
        <div
          className={styles.carousel}
          data-motion={reducedMotion ? 'reduced' : paused ? 'paused' : 'moving'}
          data-record-count={items.length}
          onMouseEnter={() => pauseFor('hover')}
          onMouseLeave={() => releaseReason('hover')}
          onFocusCapture={() => pauseFor('focus')}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) releaseReason('focus');
          }}
        >
          <div
            ref={viewportRef}
            className={styles.viewport}
            role="region"
            aria-label="Partner logos"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishPointer}
            onPointerCancel={finishPointer}
          >
            <div className={styles.track} data-partner-track>
              {repeatedItems.map((partner, index) => {
                const duplicate = index >= items.length;
                const content = (
                  <>
                    <div className={styles.logoFrame}>
                      <img src={partner.logoUrl} alt={`${partner.name} logo`} loading="lazy" decoding="async" draggable={false} />
                    </div>
                    <h3>{partner.name}</h3>
                  </>
                );

                if (partner.websiteUrl) {
                  return (
                    <a
                      key={`${partner.id}-${index}`}
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.card}
                      data-partner-card
                      aria-hidden={duplicate ? 'true' : undefined}
                      tabIndex={duplicate ? -1 : 0}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <article key={`${partner.id}-${index}`} className={styles.card} data-partner-card aria-hidden={duplicate ? 'true' : undefined}>
                    {content}
                  </article>
                );
              })}
            </div>
          </div>

          <div className={styles.controls} data-carousel-controls>
            <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Show previous partners" onClick={() => scrollByCard(-1)}>
              <ArrowIcon direction="left" />
            </button>
            <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Show next partners" onClick={() => scrollByCard(1)}>
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.emptyTrack} aria-hidden="true" />
      )}
    </section>
  );
}
