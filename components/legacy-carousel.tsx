'use client';

import type {CSSProperties, PointerEvent as ReactPointerEvent} from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './legacy-section.module.css';

export type LegacyItem = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  logoUrl?: string;
  icon: 'trophy' | 'academy' | 'festival' | 'people' | 'briefcase';
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

function LegacyIcon({icon}: {icon: LegacyItem['icon']}) {
  if (icon === 'academy') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="m8 24 24-12 24 12-24 12L8 24Z" />
        <path d="M17 29v16c9 7 21 7 30 0V29M56 24v17" />
      </svg>
    );
  }

  if (icon === 'festival') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 7v12M32 45v12M7 32h12M45 32h12M14 14l9 9M41 41l9 9M50 14l-9 9M23 41l-9 9" />
        <circle cx="32" cy="32" r="8" />
      </svg>
    );
  }

  if (icon === 'people') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="24" cy="23" r="7" />
        <circle cx="43" cy="25" r="6" />
        <path d="M9 51c1-11 7-17 15-17s14 6 15 17M36 39c3-4 7-6 11-6 7 0 12 6 13 16" />
      </svg>
    );
  }

  if (icon === 'briefcase') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M22 20v-6h20v6M10 21h44v31H10z" />
        <path d="M10 33h44M28 33v7h8v-7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M19 11h26v8c0 13-5 23-13 27-8-4-13-14-13-27v-8Z" />
      <path d="M19 17H9c0 12 5 18 14 19M45 17h10c0 12-5 18-14 19M32 46v8M22 56h20" />
      <path d="m32 19 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" />
    </svg>
  );
}

function relativeSlot(index: number, active: number, length: number) {
  let difference = index - active;
  const midpoint = Math.floor(length / 2);
  if (difference > midpoint) difference -= length;
  if (difference < -midpoint) difference += length;
  return difference;
}

export function LegacyCarousel({items}: {items: LegacyItem[]}) {
  const initialIndex = Math.max(0, items.findIndex((item) => item.title === 'Finance Fest'));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerStart = useRef<{x: number; y: number} | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const interaction = useRef<InteractionState>({hover: false, focus: false, drag: false});
  const reducedMotionRef = useRef(false);
  const activeItem = items[activeIndex] ?? items[0];
  const controlsDisabled = items.length <= 1;

  const slots = useMemo(
    () => items.map((_, index) => relativeSlot(index, activeIndex, items.length)),
    [activeIndex, items]
  );

  const clearResumeTimer = useCallback(() => {
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const move = useCallback((direction: -1 | 1) => {
    if (items.length <= 1) return;
    setActiveIndex((current) => (current + direction + items.length) % items.length);
  }, [items.length]);

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
      if (hasActiveInteraction()) return;
      setPaused(false);
      if (!reducedMotionRef.current && items.length > 1) move(1);
    }, delay);
  }, [clearResumeTimer, hasActiveInteraction, items.length, move]);

  const releaseReason = useCallback((reason: keyof InteractionState) => {
    interaction.current[reason] = false;
    resumeAfterInteraction(4000);
  }, [resumeAfterInteraction]);

  const manualMove = useCallback((direction: -1 | 1) => {
    clearResumeTimer();
    setPaused(true);
    move(direction);
    resumeAfterInteraction(4000);
  }, [clearResumeTimer, move, resumeAfterInteraction]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);
    };
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (controlsDisabled || reducedMotion || paused) return;
    const timer = window.setTimeout(() => move(1), 4000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, controlsDisabled, move, paused, reducedMotion]);

  useEffect(() => () => clearResumeTimer(), [clearResumeTimer]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (target.closest('button, a')) {
      pointerStart.current = null;
      return;
    }

    pointerStart.current = {x: event.clientX, y: event.clientY};
    pauseFor('drag');
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const finishPointer = (event?: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;

    if (start && event) {
      const deltaX = event.clientX - start.x;
      const deltaY = event.clientY - start.y;
      if (Math.abs(deltaX) >= 42 && Math.abs(deltaX) >= Math.abs(deltaY) * 1.15) {
        move(deltaX < 0 ? 1 : -1);
      }
    }

    releaseReason('drag');
  };

  if (!items.length) return null;

  return (
    <section id="legacy-foundation" className={styles.section} aria-labelledby="legacy-foundation-title">
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Legacy Foundation</p>
        <h2 id="legacy-foundation-title" className={styles.title}>
          The <span>Departmental Legacy</span> We Carry Forward
        </h2>
        <p className={styles.description}>
          Before the formation of JU FinAnt Club, these flagship platforms were built through the student-led tradition of the Department of Finance and Banking, Jahangirnagar University. FinAnt carries this legacy forward through a formal, future-ready institutional structure.
        </p>

        <div
          className={styles.carousel}
          role="region"
          aria-roledescription="carousel"
          aria-label="Departmental legacy platforms"
          tabIndex={0}
          data-active-index={activeIndex}
          data-record-count={items.length}
          data-autoplay={reducedMotion ? 'reduced' : paused ? 'paused' : 'running'}
          onMouseEnter={() => pauseFor('hover')}
          onMouseLeave={() => releaseReason('hover')}
          onFocusCapture={() => pauseFor('focus')}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) releaseReason('focus');
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              manualMove(-1);
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              manualMove(1);
            }
          }}
          onPointerDown={onPointerDown}
          onPointerUp={finishPointer}
          onPointerCancel={() => finishPointer()}
        >
          <div className={styles.stage}>
            {items.map((item, index) => {
              const slot = slots[index];
              const distance = Math.abs(slot);
              const direction = slot === 0 ? 0 : slot > 0 ? 1 : -1;
              const isActive = index === activeIndex;
              return (
                <article
                  key={item.id}
                  className={`${styles.card} ${isActive ? styles.activeCard : ''} ${distance > 2 ? styles.hiddenCard : ''}`}
                  style={{'--slot': slot, '--distance': distance, '--direction': direction} as CSSProperties}
                  aria-hidden={!isActive}
                  data-active={isActive ? 'true' : 'false'}
                  data-legacy-id={item.id}
                >
                  <div className={styles.imageFrame}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={`${item.title} event`} loading="lazy" decoding="async" />
                    ) : (
                      <div className={styles.imageFallback} aria-hidden="true">
                        <LegacyIcon icon={item.icon} />
                      </div>
                    )}
                    <div className={styles.imageShade} aria-hidden="true" />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardIcon} aria-hidden="true">
                      {item.logoUrl ? <img src={item.logoUrl} alt="" loading="lazy" decoding="async" /> : <LegacyIcon icon={item.icon} />}
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.controls} data-carousel-controls>
            <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Previous legacy event" onClick={() => manualMove(-1)} disabled={controlsDisabled}>
              <ArrowIcon direction="left" />
            </button>

            <div className={styles.pagination} aria-label="Select a legacy platform" data-pagination-count={items.length}>
              {items.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  aria-label={`Show ${item.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={index === activeIndex ? styles.activeDot : ''}
                  onClick={() => {
                    clearResumeTimer();
                    setPaused(true);
                    setActiveIndex(index);
                    resumeAfterInteraction(4000);
                  }}
                />
              ))}
            </div>

            <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Next legacy event" onClick={() => manualMove(1)} disabled={controlsDisabled}>
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <p className={styles.liveStatus} aria-live="polite">{activeItem?.title}</p>
      </div>
    </section>
  );
}
